import { ref, reactive } from 'vue'
import { useConsent } from './useConsent.js'

// Analytics state
const isAnalyticsReady = ref(false)
const { hasConsent } = useConsent()

// Check if gtag is available
const checkAnalyticsReady = () => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    isAnalyticsReady.value = true
    return true
  }
  return false
}

// Initialize analytics readiness check with retries
let retryCount = 0
const maxRetries = 10
const checkWithRetry = () => {
  if (checkAnalyticsReady() || retryCount >= maxRetries) {
    return
  }
  retryCount++
  setTimeout(checkWithRetry, 100) // Check every 100ms for up to 1 second
}

// Start checking immediately and with retries
checkWithRetry()

export function useAnalytics() {
  /**
   * Track a custom event with Google Analytics
   * @param {string} eventName - Name of the event
   * @param {Object} parameters - Event parameters
   */
  const trackEvent = (eventName, parameters = {}) => {
    // Only track if user has consented to analytics
    if (!hasConsent('analytics')) {
      console.log('📊 Analytics tracking skipped - no consent')
      return
    }

    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return
    }

    // Check if gtag is available, with a fallback for immediate calls
    if (typeof window.gtag !== 'function') {
      console.log('📊 Analytics tracking skipped - gtag not ready')
      return
    }

    try {
      // Add default parameters
      const eventParams = {
        page_title: document.title,
        page_location: window.location.href,
        timestamp: new Date().toISOString(),
        ...parameters
      }

      window.gtag('event', eventName, eventParams)
      console.log('📊 Analytics Event:', eventName, eventParams)
    } catch (error) {
      console.error('📊 Analytics tracking error:', error)
    }
  }

  /**
   * Track page views
   * @param {string} pageName - Name of the page
   * @param {Object} additionalParams - Additional parameters
   */
  const trackPageView = (pageName, additionalParams = {}) => {
    trackEvent('page_view', {
      event_category: 'engagement',
      event_label: pageName,
      page_name: pageName,
      ...additionalParams
    })
  }

  // ==========================================
  // CONVERSION TRACKING EVENTS
  // ==========================================

  /**
   * Track demo button clicks (PRIMARY CONVERSION)
   */
  const trackDemoClick = (source = 'unknown', demoType = 'external') => {
    trackEvent('demo_click', {
      event_category: 'conversion',
      event_label: `demo_${source}`,
      source: source,
      demo_type: demoType,
      conversion_type: 'demo_interest'
    })
  }

  /**
   * Track signup button clicks (PRIMARY CONVERSION)
   */
  const trackSignupClick = (source = 'unknown') => {
    trackEvent('signup_click', {
      event_category: 'conversion', 
      event_label: `signup_${source}`,
      source: source,
      conversion_type: 'signup_interest'
    })
  }

  /**
   * Track actual signup completion (CONVERSION)
   */
  const trackSignupComplete = (method = 'email', source = 'unknown') => {
    trackEvent('signup_complete', {
      event_category: 'conversion',
      event_label: `signup_${method}`,
      signup_method: method,
      source: source,
      conversion_type: 'signup_conversion'
    })
  }

  /**
   * Track app launch (POST-CONVERSION)
   */
  const trackAppLaunch = (source = 'unknown', userType = 'unknown') => {
    trackEvent('app_launch', {
      event_category: 'engagement',
      event_label: `launch_${source}`,
      source: source,
      user_type: userType,
      conversion_type: 'app_engagement'
    })
  }

  // ==========================================
  // NAVIGATION TRACKING EVENTS
  // ==========================================

  /**
   * Track navigation clicks
   */
  const trackNavigation = (destination, source = 'nav') => {
    trackEvent('navigation_click', {
      event_category: 'navigation',
      event_label: `nav_${destination}`,
      destination: destination,
      source: source
    })
  }

  /**
   * Track features section scroll
   */
  const trackFeaturesView = () => {
    trackEvent('features_view', {
      event_category: 'engagement',
      event_label: 'features_section',
      engagement_type: 'scroll_to_features'
    })
  }

  // ==========================================
  // AUTHENTICATION TRACKING EVENTS  
  // ==========================================

  /**
   * Track sign in attempts
   */
  const trackSignInAttempt = (method = 'email') => {
    trackEvent('sign_in_attempt', {
      event_category: 'auth',
      event_label: `signin_${method}`,
      auth_method: method
    })
  }

  /**
   * Track successful sign in
   */
  const trackSignInSuccess = (method = 'email') => {
    trackEvent('sign_in_success', {
      event_category: 'auth',
      event_label: `signin_success_${method}`,
      auth_method: method
    })
  }

  /**
   * Track sign out
   */
  const trackSignOut = () => {
    trackEvent('sign_out', {
      event_category: 'auth',
      event_label: 'user_signout'
    })
  }

  // ==========================================
  // ACCOUNT MANAGEMENT EVENTS
  // ==========================================

  /**
   * Track upgrade plan interest
   */
  const trackUpgradeClick = (source = 'account_page') => {
    trackEvent('upgrade_click', {
      event_category: 'conversion',
      event_label: `upgrade_${source}`,
      source: source,
      conversion_type: 'upgrade_interest'
    })
  }

  /**
   * Track project creation interest
   */
  const trackProjectClick = (source = 'account_page') => {
    trackEvent('project_click', {
      event_category: 'engagement',
      event_label: `project_${source}`,
      source: source,
      engagement_type: 'project_interest'
    })
  }

  // ==========================================
  // CONSENT & PRIVACY EVENTS
  // ==========================================

  /**
   * Track consent modal interactions
   */
  const trackConsentAction = (action = 'unknown', consentGiven = false) => {
    trackEvent('consent_action', {
      event_category: 'privacy',
      event_label: `consent_${action}`,
      action: action,
      consent_given: consentGiven
    })
  }

  /**
   * Track privacy page visits
   */
  const trackPrivacyPageView = (pageType = 'privacy') => {
    trackEvent('privacy_page_view', {
      event_category: 'legal',
      event_label: `${pageType}_page`,
      page_type: pageType
    })
  }

  // ==========================================
  // ERROR TRACKING
  // ==========================================

  /**
   * Track errors
   */
  const trackError = (errorType, errorMessage, context = 'unknown') => {
    trackEvent('error_occurred', {
      event_category: 'error',
      event_label: errorType,
      error_type: errorType,
      error_message: errorMessage,
      context: context
    })
  }

  // ==========================================
  // FUNNEL ANALYSIS EVENTS
  // ==========================================

  /**
   * Track funnel step completion
   */
  const trackFunnelStep = (step, stepName, additionalData = {}) => {
    trackEvent('funnel_step', {
      event_category: 'funnel',
      event_label: stepName,
      funnel_step: step,
      step_name: stepName,
      ...additionalData
    })
  }

  /**
   * Track conversion funnel: Homepage View
   */
  const trackHomepageView = () => {
    trackFunnelStep(1, 'homepage_view', {
      funnel_name: 'signup_conversion'
    })
  }

  /**
   * Track conversion funnel: Demo Interest
   */
  const trackDemoInterest = (source) => {
    trackFunnelStep(2, 'demo_interest', {
      funnel_name: 'demo_conversion',
      source: source
    })
  }

  /**
   * Track conversion funnel: Signup Interest
   */
  const trackSignupInterest = (source) => {
    trackFunnelStep(2, 'signup_interest', {
      funnel_name: 'signup_conversion',
      source: source
    })
  }

  /**
   * Track conversion funnel: Account Created
   */
  const trackAccountCreated = (method) => {
    trackFunnelStep(3, 'account_created', {
      funnel_name: 'signup_conversion',
      signup_method: method
    })
  }

  /**
   * Track conversion funnel: App Launched
   */
  const trackAppLaunched = () => {
    trackFunnelStep(4, 'app_launched', {
      funnel_name: 'signup_conversion'
    })
  }

  return {
    // Core tracking functions
    trackEvent,
    trackPageView,
    
    // Conversion tracking
    trackDemoClick,
    trackSignupClick,
    trackSignupComplete,
    trackAppLaunch,
    
    // Navigation tracking
    trackNavigation,
    trackFeaturesView,
    
    // Auth tracking
    trackSignInAttempt,
    trackSignInSuccess,
    trackSignOut,
    
    // Account management
    trackUpgradeClick,
    trackProjectClick,
    
    // Privacy & consent
    trackConsentAction,
    trackPrivacyPageView,
    
    // Error tracking
    trackError,
    
    // Funnel tracking
    trackFunnelStep,
    trackHomepageView,
    trackDemoInterest,
    trackSignupInterest,
    trackAccountCreated,
    trackAppLaunched,
    
    // Utility
    isAnalyticsReady
  }
} 