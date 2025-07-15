import { ref, reactive, computed, watch } from 'vue'
import { auth, db } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

// Global consent state
const consentState = reactive({
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
  timestamp: null,
  version: '1.0',
  hasShownModal: false,
  isInitialized: false
})

const showConsentModal = ref(false)
const currentUser = ref(null)

// Listen to auth state changes
onAuthStateChanged(auth, (user) => {
  currentUser.value = user
})

export function useConsent() {

  // Storage keys
  const CONSENT_STORAGE_KEY = 'canonical_consent_preferences'
  const MODAL_SHOWN_KEY = 'canonical_consent_modal_shown'

  /**
   * Initialize consent from localStorage or Firebase
   */
  const initializeConsent = async () => {
    if (consentState.isInitialized) return

    try {
      // First check localStorage for immediate loading
      const localConsent = localStorage.getItem(CONSENT_STORAGE_KEY)
      const hasShownModal = localStorage.getItem(MODAL_SHOWN_KEY) === 'true'
      
      if (localConsent) {
        const parsed = JSON.parse(localConsent)
        Object.assign(consentState, {
          ...parsed,
          hasShownModal,
          isInitialized: true
        })
      }

      // If user is authenticated, sync with Firebase
      if (currentUser.value && db) {
        await syncConsentWithFirebase()
      }

      // If no consent found and modal hasn't been shown, show it
      if (!hasShownModal && !localConsent) {
        setTimeout(() => {
          showConsentModal.value = true
        }, 1000) // Small delay for better UX
      }

      consentState.isInitialized = true
    } catch (error) {
      console.error('Error initializing consent:', error)
      consentState.isInitialized = true
    }
  }

  /**
   * Save consent preferences
   */
  const updateConsent = async (newConsent) => {
    try {
      // Update local state
      Object.assign(consentState, {
        ...newConsent,
        hasShownModal: true,
        timestamp: newConsent.timestamp || new Date().toISOString()
      })

      // Save to localStorage
      const consentToStore = {
        essential: consentState.essential,
        analytics: consentState.analytics,
        marketing: consentState.marketing,
        functional: consentState.functional,
        timestamp: consentState.timestamp,
        version: consentState.version
      }
      
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentToStore))
      localStorage.setItem(MODAL_SHOWN_KEY, 'true')

      // Sync with Firebase if user is authenticated
      if (currentUser.value && db) {
        await saveConsentToFirebase(consentToStore)
      }

      // Apply consent immediately
      applyConsentSettings()

      console.log('Consent preferences updated:', consentToStore)
    } catch (error) {
      console.error('Error updating consent:', error)
    }
  }

  /**
   * Sync consent with Firebase
   */
  const syncConsentWithFirebase = async () => {
    if (!currentUser.value || !db) return

    try {
      const { doc, getDoc, setDoc } = await import('firebase/firestore')
      const userConsentDoc = doc(db, 'userConsent', currentUser.value.uid)
      const docSnap = await getDoc(userConsentDoc)

      if (docSnap.exists()) {
        const firebaseConsent = docSnap.data()
        const localConsentString = localStorage.getItem(CONSENT_STORAGE_KEY)
        
        if (localConsentString) {
          const localConsent = JSON.parse(localConsentString)
          
          // Use the most recent consent (compare timestamps)
          const firebaseTime = new Date(firebaseConsent.timestamp || 0)
          const localTime = new Date(localConsent.timestamp || 0)
          
          if (firebaseTime > localTime) {
            // Firebase is more recent, update local
            Object.assign(consentState, firebaseConsent)
            localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(firebaseConsent))
          } else if (localTime > firebaseTime) {
            // Local is more recent, update Firebase
            await saveConsentToFirebase(localConsent)
          }
        } else {
          // No local consent, use Firebase
          Object.assign(consentState, firebaseConsent)
          localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(firebaseConsent))
        }
      } else {
        // No Firebase consent, create from local if exists
        const localConsentString = localStorage.getItem(CONSENT_STORAGE_KEY)
        if (localConsentString) {
          const localConsent = JSON.parse(localConsentString)
          await saveConsentToFirebase(localConsent)
        }
      }
    } catch (error) {
      console.error('Error syncing consent with Firebase:', error)
    }
  }

  /**
   * Save consent to Firebase
   */
  const saveConsentToFirebase = async (consent) => {
    if (!currentUser.value || !db) return

    try {
      const { doc, setDoc } = await import('firebase/firestore')
      const userConsentDoc = doc(db, 'userConsent', currentUser.value.uid)
      
      await setDoc(userConsentDoc, {
        ...consent,
        userId: currentUser.value.uid,
        updatedAt: new Date().toISOString()
      }, { merge: true })
      
      console.log('Consent saved to Firebase')
    } catch (error) {
      console.error('Error saving consent to Firebase:', error)
    }
  }

  /**
   * Apply consent settings to third-party services
   */
  const applyConsentSettings = () => {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        analytics_storage: consentState.analytics ? 'granted' : 'denied',
        ad_storage: consentState.marketing ? 'granted' : 'denied',
        ad_user_data: consentState.marketing ? 'granted' : 'denied',
        ad_personalization: consentState.marketing ? 'granted' : 'denied'
      })
    }

    // Firebase Analytics
    if (window.firebase && window.firebase.analytics) {
      try {
        const analytics = window.firebase.analytics()
        analytics.setConsent({
          analytics_storage: consentState.analytics ? 'granted' : 'denied',
          ad_storage: consentState.marketing ? 'granted' : 'denied'
        })
      } catch (error) {
        console.warn('Firebase Analytics consent update failed:', error)
      }
    }

    // Custom event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('consent-updated', {
      detail: {
        analytics: consentState.analytics,
        marketing: consentState.marketing,
        functional: consentState.functional,
        essential: consentState.essential
      }
    }))
  }

  /**
   * Reset consent (for testing or user request)
   */
  const resetConsent = async () => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY)
      localStorage.removeItem(MODAL_SHOWN_KEY)
      
      Object.assign(consentState, {
        essential: true,
        analytics: false,
        marketing: false,
        functional: false,
        timestamp: null,
        version: '1.0',
        hasShownModal: false
      })

      if (currentUser.value && db) {
        const { doc, deleteDoc } = await import('firebase/firestore')
        const userConsentDoc = doc(db, 'userConsent', currentUser.value.uid)
        await deleteDoc(userConsentDoc)
      }

      showConsentModal.value = true
    } catch (error) {
      console.error('Error resetting consent:', error)
    }
  }

  /**
   * Check if specific consent is granted
   */
  const hasConsent = (type) => {
    return consentState[type] === true
  }

  /**
   * Get current consent state
   */
  const getConsentState = () => {
    return {
      essential: consentState.essential,
      analytics: consentState.analytics,
      marketing: consentState.marketing,
      functional: consentState.functional,
      timestamp: consentState.timestamp,
      version: consentState.version
    }
  }

  /**
   * Check if consent is required (first visit or outdated version)
   */
  const isConsentRequired = computed(() => {
    if (!consentState.isInitialized) return false
    
    // Show if never shown before
    if (!consentState.hasShownModal) return true
    
    // Show if consent version is outdated
    if (consentState.version !== '1.0') return true
    
    // Show if no timestamp (legacy consent)
    if (!consentState.timestamp) return true
    
    return false
  })

  // Watch for user authentication changes
  watch(currentUser, async (newUser) => {
    if (newUser && db) {
      await syncConsentWithFirebase()
    }
  })

  // Auto-initialize when composable is used
  if (!consentState.isInitialized) {
    initializeConsent()
  }

  return {
    // State
    consentState: readonly(consentState),
    showConsentModal,
    isConsentRequired,
    
    // Methods
    updateConsent,
    resetConsent,
    hasConsent,
    getConsentState,
    initializeConsent,
    
    // Utilities
    applyConsentSettings
  }
}

// Helper function to create readonly proxy
function readonly(obj) {
  return new Proxy(obj, {
    set() {
      console.warn('Cannot modify consent state directly. Use updateConsent() instead.')
      return false
    },
    deleteProperty() {
      console.warn('Cannot delete consent state properties.')
      return false
    }
  })
} 