<template>
  <v-dialog 
    v-model="localShow" 
    persistent 
    no-click-animation
    :class="['consent-dialog', showDetails ? 'fullscreen-modal' : 'bottom-modal']"
    attach
    :content-class="showDetails ? 'fullscreen-dialog-content' : 'bottom-dialog-content'"
  >
          <v-card :class="['surface-modal', 'consent-modal', showDetails ? 'fullscreen-card' : 'compact-card']">
      <!-- Header -->
      <v-card-title class="modal-header compact-header">
        <div class="flex items-center gap-2">
          <v-icon color="primary" size="small">mdi-shield-account</v-icon>
          <span class="text-sm font-medium">Privacy & Cookies</span>
        </div>
        <v-btn 
          v-if="!isRequired"
          icon 
          variant="text" 
          @click="handleClose" 
          size="small"
          class="close-btn"
        >
          <v-icon size="small">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="modal-content compact-content">
        <!-- Main Description -->
        <div class="mb-3">
          <p class="text-xs text-white-80 mb-2">
            We use cookies to improve your experience. You can customize your preferences below.
          </p>
        </div>

        <!-- Quick Actions (when not in settings mode) -->
        <div v-if="!showDetails" class="quick-actions mb-3">
          <div class="flex gap-2">
            <v-btn
              @click="handleAcceptAll"
              color="success"
              variant="elevated"
              size="small"
              class="text-xs font-medium flex-1"
            >
              Accept All
            </v-btn>
            <v-btn
              @click="handleRejectAll"
              variant="outlined"
              size="small"
              class="text-xs font-medium flex-1"
            >
              Reject All
            </v-btn>
            <v-btn
              @click="showDetails = true"
              variant="text"
              size="small"
              class="text-xs text-primary"
            >
              Customize
            </v-btn>
          </div>
        </div>

        <!-- Detailed Settings -->
        <div v-else class="consent-settings">
          <div class="space-y-2 mb-3">
            <!-- Essential Cookies -->
            <div class="consent-category">
              <div class="p-3 bg-white/5 rounded">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <v-icon color="success" size="small">mdi-check-circle</v-icon>
                    <span class="text-sm font-medium">Essential</span>
                  </div>
                  <span class="text-xs text-white-70 px-2 py-1 bg-success/20 rounded">Always On</span>
                </div>
                <p class="text-xs text-white-70">
                  Required for basic site functionality, security, and user authentication.
                </p>
              </div>
            </div>

            <!-- Analytics -->
            <div class="consent-category">
              <div class="p-3 bg-white/5 rounded">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <v-icon color="info" size="small">mdi-chart-line</v-icon>
                    <span class="text-sm font-medium">Analytics</span>
                  </div>
                  <v-switch
                    v-model="localConsent.analytics"
                    density="compact"
                    hide-details
                    color="primary"
                    size="small"
                  ></v-switch>
                </div>
                <p class="text-xs text-white-70">
                  Help us understand how you use our site to improve performance and user experience.
                </p>
              </div>
            </div>

            <!-- Marketing -->
            <div class="consent-category">
              <div class="p-3 bg-white/5 rounded">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <v-icon color="warning" size="small">mdi-bullhorn</v-icon>
                    <span class="text-sm font-medium">Marketing</span>
                  </div>
                  <v-switch
                    v-model="localConsent.marketing"
                    density="compact"
                    hide-details
                    color="primary"
                    size="small"
                  ></v-switch>
                </div>
                <p class="text-xs text-white-70">
                  Show you relevant content and measure campaign effectiveness across our platforms.
                </p>
              </div>
            </div>

            <!-- Functional -->
            <div class="consent-category">
              <div class="p-3 bg-white/5 rounded">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <v-icon color="secondary" size="small">mdi-cog</v-icon>
                    <span class="text-sm font-medium">Functional</span>
                  </div>
                  <v-switch
                    v-model="localConsent.functional"
                    density="compact"
                    hide-details
                    color="primary"
                    size="small"
                  ></v-switch>
                </div>
                <p class="text-xs text-white-70">
                  Remember your preferences and provide enhanced features like themes and settings.
                </p>
              </div>
            </div>
          </div>

          <!-- User Rights (fullscreen only) -->
          <v-alert
            type="info"
            variant="tonal"
            class="mb-4 text-xs"
            density="compact"
          >
            <template v-slot:title>Your Privacy Rights</template>
            Under GDPR, you can access, modify, or delete your data at any time. Contact us at privacy@canonical.com for assistance.
          </v-alert>

          <!-- Action Buttons for Settings -->
          <div class="flex gap-2">
            <v-btn
              @click="handleSavePreferences"
              color="primary"
              variant="elevated"
              size="small"
              class="text-xs font-medium flex-1"
            >
              Save Preferences
            </v-btn>
            <v-btn
              @click="showDetails = false"
              variant="outlined"
              size="small"
              class="text-xs font-medium flex-1"
            >
              Back
            </v-btn>
          </div>
        </div>

        <!-- Footer Links -->
        <div class="mt-3 pt-2 border-t border-white/10">
          <div class="flex justify-center gap-3 text-xs">
            <router-link to="/privacy" class="text-white-60 hover:text-primary">Privacy</router-link>
            <router-link to="/security" class="text-white-60 hover:text-primary">Security</router-link>
            <router-link to="/terms" class="text-white-60 hover:text-primary">Terms</router-link>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'ConsentModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    initialConsent: {
      type: Object,
      default: () => ({
        essential: true,
        analytics: false,
        marketing: false,
        functional: false
      })
    },
    isRequired: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:show', 'consent-updated'],
  setup(props, { emit }) {
    const showDetails = ref(false)
    
    const localConsent = ref({
      essential: true, // Always true
      analytics: props.initialConsent.analytics,
      marketing: props.initialConsent.marketing,
      functional: props.initialConsent.functional
    })

    const localShow = computed({
      get: () => props.show,
      set: (value) => emit('update:show', value)
    })

    // Watch for changes in initial consent
    watch(() => props.initialConsent, (newConsent) => {
      localConsent.value = {
        essential: true,
        analytics: newConsent.analytics,
        marketing: newConsent.marketing,
        functional: newConsent.functional
      }
    }, { deep: true })

    const handleAcceptAll = () => {
      const consent = {
        essential: true,
        analytics: true,
        marketing: true,
        functional: true,
        timestamp: new Date().toISOString(),
        version: '1.0'
      }
      
      emit('consent-updated', consent)
      localShow.value = false
    }

    const handleRejectAll = () => {
      const consent = {
        essential: true,
        analytics: false,
        marketing: false,
        functional: false,
        timestamp: new Date().toISOString(),
        version: '1.0'
      }
      
      emit('consent-updated', consent)
      localShow.value = false
    }

    const handleSavePreferences = () => {
      const consent = {
        ...localConsent.value,
        timestamp: new Date().toISOString(),
        version: '1.0'
      }
      
      emit('consent-updated', consent)
      localShow.value = false
    }

    const handleClose = () => {
      if (!props.isRequired) {
        localShow.value = false
      }
    }

    return {
      showDetails,
      localConsent,
      localShow,
      handleAcceptAll,
      handleRejectAll,
      handleSavePreferences,
      handleClose
    }
  }
}
</script>

<style scoped>
.consent-modal {
  margin: 0;
  transition: all 0.3s ease;
}

.compact-card {
  max-height: 25vh;
  border-radius: 16px 16px 0 0 !important;
}

.fullscreen-card {
  max-height: 95vh;
  height: auto;
  max-width: 600px;
  border-radius: 16px !important;
  overflow-y: auto;
}

.fullscreen-card .compact-content {
  padding: 16px 24px 24px 24px !important;
}

.compact-header {
  padding: 12px 16px !important;
  min-height: auto !important;
}

.compact-content {
  padding: 0 16px 16px 16px !important;
}

.quick-actions {
  border-radius: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.consent-category {
  transition: all 0.2s ease;
  margin-bottom: 8px;
}

.consent-category:hover {
  background: rgba(255, 255, 255, 0.05);
}

.consent-dialog {
  z-index: 2000;
}

/* Compact switch styling */
:deep(.v-switch) {
  flex: none !important;
}

/* Switch styling */
:deep(.v-switch .v-selection-control__input) {
  color: var(--primary) !important;
}

/* Bottom modal positioning */
:deep(.bottom-dialog-content) {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  top: auto !important;
  margin: 0 !important;
  max-width: none !important;
  width: 100% !important;
  transform: none !important;
  align-items: flex-end !important;
  justify-content: center !important;
}

:deep(.bottom-modal .v-overlay__content) {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  margin: 0 !important;
  max-width: none !important;
  width: 100% !important;
  align-items: flex-end !important;
}

/* Fullscreen modal positioning */
:deep(.fullscreen-dialog-content) {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  right: auto !important;
  bottom: auto !important;
  transform: translate(-50%, -50%) !important;
  margin: 0 !important;
  max-width: 600px !important;
  width: 90% !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.fullscreen-modal .v-overlay__content) {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  margin: 0 !important;
  max-width: 600px !important;
  width: 90% !important;
  align-items: center !important;
  justify-content: center !important;
}
</style> 