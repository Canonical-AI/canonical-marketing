// Google Analytics Initialization
// This file initializes Google Analytics with proper environment variable support

// Get measurement ID from Vite environment variables
const MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

// Initialize Google Analytics if measurement ID is configured
export const initializeAnalytics = () => {
  if (MEASUREMENT_ID && MEASUREMENT_ID.startsWith('G-')) {
    console.log('📊 Initializing Google Analytics with ID:', MEASUREMENT_ID);
    
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    
    // Initialize with denied consent until user agrees (GDPR compliance)
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied'
    });
    
    // Configure Google Analytics
    gtag('config', MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
      // Additional privacy-friendly settings
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    
    // Make gtag globally available
    window.gtag = gtag;
    
    console.log('✅ Google Analytics initialized successfully');
    return true;
  } else {
    console.log('📊 Google Analytics: VITE_FIREBASE_MEASUREMENT_ID not configured or invalid');
    
    // Create a no-op gtag function for development
    window.gtag = function() {
      console.log('📊 GA Event (no measurement ID):', ...arguments);
    };
    
    return false;
  }
};

// Auto-initialize when this module is imported
initializeAnalytics(); 