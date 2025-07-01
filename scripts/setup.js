#!/usr/bin/env node

/**
 * Setup script for Canonical Marketing Page
 * Helps configure Firebase environment variables
 * Consistent with main app setup at https://github.com/Canonical-AI/canonical
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const ENV_TEMPLATE = `# Firebase Configuration
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
`;

function main() {
  console.log('🚀 Setting up Canonical Marketing Page...\n');

  const envPath = path.join(projectRoot, '.env');
  const envExamplePath = path.join(projectRoot, '.env.example');

  // Create .env.example if it doesn't exist
  if (!fs.existsSync(envExamplePath)) {
    fs.writeFileSync(envExamplePath, ENV_TEMPLATE);
    console.log('✅ Created .env.example');
  }

  // Create .env if it doesn't exist
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, ENV_TEMPLATE);
    console.log('✅ Created .env file');
    console.log('⚠️  Please update .env with your Firebase configuration values');
  } else {
    console.log('ℹ️  .env file already exists');
  }

  console.log('\n📋 Next steps:');
  console.log('1. Go to Firebase Console: https://console.firebase.google.com');
  console.log('2. Select your project (canonical-dev-b6afd for development)');
  console.log('3. Go to Project Settings > General > Your apps');
  console.log('4. Copy the config values to your .env file');
  console.log('5. Run: npm run dev');
  
  console.log('\n🧪 For development with emulators:');
  console.log('1. Run: npm run emulators (in one terminal)');
  console.log('2. Run: npm run dev:test (in another terminal)');
  
  console.log('\n📚 Need help? Check the README.md file');
}

main(); 