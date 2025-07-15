# Google Analytics Setup Guide

This document explains how to complete the Google Analytics setup for the Canonical Marketing Page with comprehensive conversion tracking.

## 🎯 Overview

The analytics system is designed to track the conversion funnel:
**Homepage Views** → **Demo/Signup Interest** → **Account Creation** → **App Launch**

## 📊 Events Being Tracked

### **Primary Conversion Events**
1. **Demo Clicks** - Track interest in product demo
   - `demo_click` - All demo button clicks
   - Sources: `homepage_hero`, `homepage_middle`, `homepage_cta`

2. **Signup Clicks** - Track signup interest  
   - `signup_click` - All signup button clicks
   - Sources: `homepage_hero`, `homepage_cta`

3. **Signup Completion** - Track actual conversions
   - `signup_complete` - Successful account creation
   - Methods: `email`, `google`, `github`

4. **App Launch** - Track post-conversion engagement
   - `app_launch` - User opens main application
   - Sources: `header_button`, `account_page`

### **Supporting Events**
- Page views (`page_view`)
- Navigation clicks (`navigation_click`)
- Authentication events (`sign_in_attempt`, `sign_in_success`, `sign_out`)
- Account management (`upgrade_click`, `project_click`)
- Privacy/consent (`consent_action`, `privacy_page_view`)
- Error tracking (`error_occurred`)

### **Funnel Analysis Events**
- `funnel_step` - Track conversion funnel progression
- Funnel names: `signup_conversion`, `demo_conversion`

## 🔧 Setup Instructions

### 1. Create Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your website
3. Set up a **GA4 (Google Analytics 4)** property
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Add Measurement ID to Environment

Add your Google Analytics measurement ID to your `.env` file:

```env
# Your existing Firebase config...
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

The system automatically uses `VITE_FIREBASE_MEASUREMENT_ID` from your environment variables. Google Analytics is initialized early in the application lifecycle via `src/utils/analytics-init.js`.

**What happens:**
- **With valid measurement ID**: Full Google Analytics tracking
- **Without measurement ID**: Graceful fallback with console logging for development
- **GDPR compliant**: Analytics disabled by default until user consents

### 3. GDPR Compliance

The analytics system automatically respects GDPR consent:

- **Default State**: Analytics disabled until user consents
- **Consent Modal**: Users can opt-in to analytics tracking
- **Dynamic Consent**: Tracking starts/stops based on user preferences
- **Persistent Consent**: Preferences saved across sessions

## 📈 Key Metrics to Monitor

### **Conversion Funnel**
1. **Homepage Views** (page_view: homepage)
2. **Demo Interest** (demo_click)  
3. **Signup Interest** (signup_click)
4. **Account Created** (signup_complete)
5. **App Launched** (app_launch)

### **Conversion Rates**
- **Demo Conversion**: demo_click / homepage_view
- **Signup Conversion**: signup_complete / signup_click  
- **App Engagement**: app_launch / signup_complete

### **Traffic Sources**
- Track which signup sources perform best
- Monitor demo vs signup conversion paths
- Analyze user journey from marketing → app

## 🔍 Custom Dimensions & Events

### **Event Parameters**
All events include standard parameters:
- `page_title` - Current page title
- `page_location` - Current URL
- `timestamp` - Event timestamp
- Custom parameters per event type

### **Useful Custom Reports**

**Conversion Funnel Report:**
```
Events: page_view → demo_click/signup_click → signup_complete → app_launch
Dimensions: source, method, user_type
Metrics: event_count, conversion_rate
```

**Source Performance:**
```
Events: signup_complete, demo_click
Dimensions: source (homepage_hero, homepage_cta, etc.)
Metrics: conversions, conversion_rate
```

**Authentication Method Analysis:**
```
Events: signup_complete
Dimensions: signup_method (email, google, github)
Metrics: conversions, success_rate
```

## 🛠️ Testing

### **Development Testing**
1. Open browser console
2. Look for analytics events: `📊 Analytics Event:` logs
3. Verify events only fire when analytics consent is granted

### **Production Verification**  
1. Use [Google Analytics DebugView](https://support.google.com/analytics/answer/7201382)
2. Enable in GA4: Configure → DebugView
3. Test with `gtag('config', 'GA_MEASUREMENT_ID', { debug_mode: true })`

### **Event Testing Checklist**
- [ ] Homepage view tracked on load
- [ ] Demo clicks tracked from all buttons
- [ ] Signup clicks tracked from all buttons  
- [ ] Account creation tracked (email, Google, GitHub)
- [ ] App launch tracked from different sources
- [ ] Navigation and auth events working
- [ ] GDPR consent properly controls tracking

## 🎨 Enhanced Analytics (Optional)

### **Enhanced Ecommerce** 
Track "purchases" when users upgrade plans:

```javascript
gtag('event', 'purchase', {
  transaction_id: 'upgrade_' + Date.now(),
  value: 29.99,
  currency: 'USD',
  items: [{
    item_id: 'pro_plan',
    item_name: 'Canonical Pro Plan',
    category: 'subscription',
    quantity: 1,
    price: 29.99
  }]
});
```

### **Custom Audiences**
Create audiences in GA4:
- **Demo Interested**: Users who clicked demo
- **Signup Interested**: Users who clicked signup  
- **Converted Users**: Users who completed signup
- **App Users**: Users who launched the app

### **Goal Tracking**
Set up conversions in GA4:
1. Go to Configure → Events
2. Mark key events as conversions:
   - `signup_complete` (Primary goal)
   - `demo_click` (Micro-conversion)
   - `app_launch` (Engagement goal)

## 🔄 Maintenance

### **Regular Monitoring**
- Check conversion rates weekly
- Monitor for tracking errors  
- Review user journey paths
- Update tracking as features change

### **Privacy Compliance**
- Respect user consent choices
- Regularly audit data collection
- Update privacy policy as needed
- Monitor consent acceptance rates

## 📞 Support

If you need help with the analytics setup:
1. Check browser console for error messages
2. Verify Google Analytics property configuration
3. Test with DebugView for real-time validation
4. Review GDPR consent modal functionality

---

**Next Steps:**
1. Add `VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX` to your `.env` file
2. Deploy to production
3. Test conversion tracking end-to-end
4. Set up custom reports and dashboards in GA4 