# Canonical Marketing Page

This is the marketing website for [Canonical](https://github.com/Canonical-AI/canonical), a platform for artifact creation, curation, and collaboration. This site is hosted as a sister app alongside the main Canonical application using Firebase Hosting.

## 🏗️ Architecture

This marketing page is deployed as a **multiple site** setup within the same Firebase project as the main Canonical app:

**Development Environment:**
- **Main App**: `canonical-dev.web.app`
- **Marketing**: `marketing-canonical-dev.web.app`

**Production Environment:**
- **Main App**: `canonical-prod.web.app`
- **Marketing**: `marketing-canonical-prod.web.app` (or custom domain)

This approach allows for:
- Shared Firebase project resources
- Unified analytics and monitoring
- Cost efficiency
- Easy cross-referencing between sites

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Firebase CLI
- Access to the `canonical-dev` Firebase project

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd canonical-marketing-page

# Install dependencies
npm install

# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Select the project
firebase use canonical-dev
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

#### Option 1: Manual Deployment
```bash
# Deploy to Firebase Hosting
npm run deploy

# Deploy hosting only (faster)
npm run deploy:hosting
```

#### Option 2: Automatic Deployment
Push to the `main` branch to trigger automatic deployment via GitHub Actions.

## 🔧 Firebase Setup Options

### Option A: Multiple Sites (Recommended)

Set this up as an additional site in your existing Firebase project:

```bash
# Create a new site in your existing project
firebase hosting:sites:create marketing-canonical-dev

# Update firebase.json to target the new site
```

**Benefits:**
- Shared project resources
- Same analytics
- Cost efficient
- Easy to manage

### Option B: Custom Domains

Configure custom domains for a professional setup:

```bash
# Add custom domain in Firebase Console
# Main app: app.canonical.ai
# Marketing: canonical.ai (root domain)
```

## 📁 Project Structure

```
├── src/
│   ├── App.vue           # Main Vue component
│   ├── FAQ.vue          # FAQ component
│   └── style.css        # Global styles with CSS variables
├── public/
│   ├── favicon.ico      # Site icon
│   ├── canonical-logo.svg
│   └── grain.png        # Background texture
├── firebase.json        # Firebase hosting configuration
├── .firebaserc         # Firebase project configuration
└── package.json        # Dependencies and scripts
```

## 🎨 Design System

The site uses a custom design system with CSS variables:

- **Color Scheme**: Dark eggplant-based theme
- **Typography**: Inter font family
- **Animations**: Typing effect, gradient blobs
- **Framework**: Tailwind CSS with custom extensions

### Key Features

- **Responsive Design**: Mobile-first approach
- **Typing Animation**: Dynamic phrase rotation
- **Gradient Animations**: Moving background elements
- **FAQ Section**: Expandable about section
- **Modern UI**: Glass morphism effects

## 🔗 Integration with Main App

The marketing page integrates seamlessly with the main Canonical application:

- **CTA Links**: Direct users to the main app at `canonical-prod.web.app`
- **Consistent Branding**: Shared design language and assets
- **Cross-referencing**: Links to GitHub, documentation, and main app

## 🚀 Deployment Options

### GitHub Actions (Current)

Automatic deployment on push to `main` branch using Firebase GitHub Actions.

### Firebase CLI

Manual deployment using Firebase CLI commands.

### Multiple Environments

You can set up different environments:

```bash
# Development
firebase use canonical-dev
firebase deploy

# Production
firebase use canonical-prod
firebase deploy
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root with your Firebase configuration:

```env
# Firebase Configuration
# Get these values from Firebase Console > Project Settings > General > Your apps
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Development Mode (set to 'true' to use Firebase emulators)
VITE_USE_EMULATOR=false

# Optional: reCAPTCHA (from App Check setup)
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### Firebase Authentication Setup

1. **Get Firebase Configuration:**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project (`canonical-dev-b6afd` for development)
   - Go to Project Settings > General > Your apps
   - Copy the config values and add them to your `.env` file

2. **Enable Authentication:**
   - In Firebase Console, go to Authentication > Sign-in method
   - Enable Email/Password, Google, and GitHub providers
   - For Google: Add your support email
   - For GitHub: Configure OAuth app credentials

3. **Development with Emulators (Recommended):**
   ```bash
   # Terminal 1: Start Firebase emulators
   npm run emulators:fresh
   
   # Terminal 2: Start app in emulator mode
   npm run dev:test
   ```

4. **Production Development:**
   ```bash
   # Uses real Firebase services
   npm run dev
   ```

### Firebase Configuration

The `firebase.json` configures:
- Public directory (`dist`)
- Single Page Application routing
- Asset caching rules

## 📊 Analytics & Monitoring

Since this shares the Firebase project with the main app, you can:
- Track user journeys from marketing → app
- Monitor conversion rates
- Use Firebase Analytics for insights
- Set up performance monitoring

## 🛠️ Development Workflow

1. **Feature Development**: Work on feature branches
2. **Testing**: Test locally with `npm run dev`
3. **Review**: Create pull requests for review
4. **Deploy**: Merge to `main` for automatic deployment

## 🔄 Maintenance

### Updates

- Keep dependencies updated
- Monitor Firebase hosting limits
- Update content as needed
- Maintain consistency with main app branding

### Performance

- Optimize images and assets
- Monitor Core Web Vitals
- Use Firebase Performance Monitoring
- Implement caching strategies

## 📝 Content Management

To update content:

1. **FAQs**: Edit `src/App.vue` or `src/FAQ.vue`
2. **Hero Text**: Modify the `phrases` array in `src/App.vue`
3. **Links**: Update URLs to point to correct app versions
4. **Styling**: Modify CSS variables in `src/style.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Create a pull request

## 🔗 Links

- **Main App**: [Canonical](https://github.com/Canonical-AI/canonical)
- **Live Demo (Dev)**: [canonical-dev.web.app](https://canonical-dev.web.app)
- **Marketing Site (Dev)**: [marketing-canonical-dev.web.app](https://marketing-canonical-dev.web.app)
- **Live Demo (Prod)**: [canonical-prod.web.app](https://canonical-prod.web.app)
- **Marketing Site (Prod)**: [marketing-canonical-prod.web.app](https://marketing-canonical-prod.web.app)
- **GitHub**: [Canonical-AI](https://github.com/Canonical-AI)

---

Built with ❤️ for the Canonical ecosystem 