# GDPR Consent Management System

This documentation covers the complete GDPR compliant consent management system implemented for the Canonical Marketing Page.

## Overview

The system provides:
- ✅ **GDPR Compliant**: Granular consent with clear legal basis
- ✅ **User-Friendly**: Easy accept/reject with detailed customization
- ✅ **Persistent Storage**: localStorage + Firebase sync for authenticated users
- ✅ **Real-time Updates**: Automatically applies consent to third-party services
- ✅ **Account Management**: Users can change preferences anytime

## Components

### 1. ConsentModal.vue
**Location**: `src/components/ConsentModal.vue`

**Features**:
- Quick Accept All / Reject All actions
- Detailed consent categories with GDPR-compliant information
- Expansion panels showing purpose, legal basis, data types, retention
- Mobile responsive design matching your glassmorphism theme

**Consent Categories**:
- **Essential**: Always active (Legitimate Interest)
- **Analytics**: Google Analytics, Firebase Analytics (Consent)
- **Marketing**: Social media, advertising networks (Consent)  
- **Functional**: Preferences, enhanced features (Consent)

### 2. useConsent Composable
**Location**: `src/composables/useConsent.js`

**Features**:
- Global consent state management
- localStorage persistence for immediate loading
- Firebase sync for authenticated users
- Automatic consent application to third-party services
- Version management for consent updates

**Key Methods**:
```javascript
const {
  showConsentModal,      // Boolean ref for modal visibility
  consentState,          // Reactive consent state (readonly)
  updateConsent,         // Function to update consent
  resetConsent,          // Function to reset to defaults
  hasConsent,           // Function to check specific consent
  getConsentState       // Function to get current state
} = useConsent()
```

### 3. Integration Points

#### App.vue
- Automatic modal display on first visit
- Global consent modal management
- Integrated with existing authentication flow

#### ManageAccountPage.vue
- Privacy preferences card with consent summary
- Quick access to modify consent settings
- Reset consent functionality

## Firebase Setup

### Firestore Security Rules

Add these rules to your `firestore.rules` file:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User consent documents
    match /userConsent/{userId} {
      // Users can only read/write their own consent
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Validate consent data structure
      allow write: if request.auth != null 
        && request.auth.uid == userId
        && validateConsentData(request.resource.data);
    }
    
    function validateConsentData(data) {
      return data.keys().hasAll(['essential', 'analytics', 'marketing', 'functional', 'timestamp', 'version', 'userId', 'updatedAt'])
        && data.essential == true  // Essential must always be true
        && data.analytics is bool
        && data.marketing is bool  
        && data.functional is bool
        && data.timestamp is string
        && data.version is string
        && data.userId == request.auth.uid;
    }
  }
}
```

### Firestore Data Structure

Consent documents are stored at `/userConsent/{userId}`:

```javascript
{
  essential: true,     // Always true
  analytics: false,    // User preference  
  marketing: false,    // User preference
  functional: true,    // User preference
  timestamp: "2024-01-15T10:30:00.000Z",
  version: "1.0",
  userId: "user_uid_here",
  updatedAt: "2024-01-15T10:30:00.000Z"
}
```

## Third-Party Service Integration

The system automatically applies consent to:

### Google Analytics
```javascript
gtag('consent', 'update', {
  analytics_storage: consentState.analytics ? 'granted' : 'denied',
  ad_storage: consentState.marketing ? 'granted' : 'denied',
  ad_user_data: consentState.marketing ? 'granted' : 'denied',
  ad_personalization: consentState.marketing ? 'granted' : 'denied'
})
```

### Firebase Analytics
```javascript
analytics.setConsent({
  analytics_storage: consentState.analytics ? 'granted' : 'denied',
  ad_storage: consentState.marketing ? 'granted' : 'denied'
})
```

### Custom Events
Listen for consent changes in your code:
```javascript
window.addEventListener('consent-updated', (event) => {
  const { analytics, marketing, functional } = event.detail
  // Apply consent to your custom services
})
```

## Usage Examples

### Check Consent Before Loading Services
```javascript
import { useConsent } from '@/composables/useConsent'

const { hasConsent } = useConsent()

// Only load analytics if user consented
if (hasConsent('analytics')) {
  // Initialize Google Analytics
}

// Only load marketing pixels if user consented  
if (hasConsent('marketing')) {
  // Initialize Facebook Pixel, etc.
}
```

### Programmatically Show Consent Modal
```javascript
import { useConsent } from '@/composables/useConsent'

const { showConsentModal } = useConsent()

// Show modal (e.g., from settings menu)
showConsentModal.value = true
```

### Update Consent Programmatically
```javascript
import { useConsent } from '@/composables/useConsent'

const { updateConsent } = useConsent()

// Update specific consent
await updateConsent({
  essential: true,
  analytics: true,
  marketing: false,
  functional: true,
  timestamp: new Date().toISOString(),
  version: '1.0'
})
```

## GDPR Compliance Checklist

✅ **Legal Basis Specified**: Each category clearly states legal basis  
✅ **Granular Consent**: Users can opt-in/out of specific categories  
✅ **Easy Withdrawal**: One-click access to change consent  
✅ **Clear Information**: Purpose, data types, retention explained  
✅ **User Rights**: Access, rectification, erasure mentioned  
✅ **Consent Logging**: Timestamp and version tracked  
✅ **No Pre-ticked Boxes**: All optional consent starts as false  
✅ **Separate Consent**: Each purpose requires separate consent  

## Testing

### Local Development
1. Start Firebase emulators: `npm run emulators`
2. Run dev server: `npm run dev`
3. Consent data will be stored in Firestore emulator

### Production Testing
1. Clear localStorage: `localStorage.clear()`
2. Refresh page - consent modal should appear
3. Test different consent combinations
4. Verify data in Firebase Console

## Troubleshooting

### Modal Not Appearing
- Check `hasShownModal` in localStorage
- Verify `isConsentRequired` computed property
- Check for JavaScript errors in console

### Firebase Sync Issues
- Verify Firestore rules are deployed
- Check user authentication status
- Verify Firebase configuration

### Consent Not Applied
- Check `applyConsentSettings()` is called after updates
- Verify third-party service integration
- Listen for 'consent-updated' events

## Privacy Policy Requirements

Ensure your privacy policy includes:

1. **Data Controller Information**
2. **Legal Basis for Processing** (per category)
3. **Data Retention Periods** (specified in modal)
4. **Third-Party Services** (Google Analytics, etc.)
5. **User Rights** (access, rectification, erasure, etc.)
6. **Contact Information** (privacy@canonical.com)

## Updates and Versioning

When updating consent requirements:

1. Update `version` in consent composable
2. Add new categories if needed
3. Update modal content with new information
4. Consider showing modal again for version changes

---

**Note**: This implementation provides a solid foundation for GDPR compliance, but you should consult with legal experts to ensure full compliance with your specific use case and jurisdiction requirements. 