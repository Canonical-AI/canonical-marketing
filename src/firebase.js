// Firebase configuration for Canonical Marketing Site
// Consistent with main app setup at https://github.com/Canonical-AI/canonical

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  connectAuthEmulator
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Environment detection
const isDevelopment = import.meta.env.DEV;
const useEmulator = import.meta.env.VITE_USE_EMULATOR === 'true';

// Firebase config - matching main app environment variable pattern
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};



// Validation
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your_api_key_here') {
  console.error('❌ Firebase API key not configured. Please check your .env file.');
  console.log('📋 Required environment variables:');
  console.log('   VITE_FIREBASE_API_KEY');
  console.log('   VITE_FIREBASE_AUTH_DOMAIN');
  console.log('   VITE_FIREBASE_PROJECT_ID');
  console.log('   VITE_FIREBASE_STORAGE_BUCKET');
  console.log('   VITE_FIREBASE_MESSAGING_SENDER_ID');
  console.log('   VITE_FIREBASE_APP_ID');
  console.log('   VITE_FIREBASE_MEASUREMENT_ID');
  console.log('');
  console.log('🔧 Get these from Firebase Console > Project Settings > General > Your apps');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Connect to Auth emulator if in development
if (useEmulator && !auth._delegate._config.emulator) {
  console.log('🔧 Connecting to Firebase Auth emulator on localhost:9099');
  connectAuthEmulator(auth, 'http://localhost:9099');
}

// Initialize Analytics (optional, not in emulator mode)
export const analytics = !useEmulator ? getAnalytics(app) : null;

// Auth providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Auth functions
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const signInWithSocial = async (provider) => {
  try {
    const result = await signInWithPopup(auth, provider);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Authentication handoff functions for receiving tokens from other apps
export const signInWithCustomToken = async (customToken) => {
  try {
    const { signInWithCustomToken } = await import('firebase/auth');
    const userCredential = await signInWithCustomToken(auth, customToken);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Function to handle auth handoff from URL parameters
export const handleAuthHandoff = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const authToken = urlParams.get('authToken');
    
    if (authToken) {
      // Clear the URL parameter for security
      const url = new URL(window.location);
      url.searchParams.delete('authToken');
      window.history.replaceState({}, document.title, url.pathname);
      
      // Sign in with the provided token
      const result = await signInWithCustomToken(authToken);
      return result;
    }
    
    return { user: null, error: null };
  } catch (error) {
    console.error('Auth handoff error:', error);
    return { user: null, error: error.message };
  }
};

// Launch App with Authentication Handoff - shared function
export const handleLaunchApp = async (currentUser = null) => {
  try {
    // Configuration from environment variables
    const MAIN_APP_URL = `https://${import.meta.env.VITE_FIREBASE_PROJECT_ID}.web.app`;
    const USE_SAME_PROJECT = true;
    
    // Get current user if not provided
    const user = currentUser || auth.currentUser;
    
    if (!user) {
      // If not signed in, redirect to main app without auth
      window.open(MAIN_APP_URL, '_blank');
      return { success: true };
    }
    
    if (USE_SAME_PROJECT) {
      // Option 1: Same Firebase Project - Auth is automatically shared
      window.open(MAIN_APP_URL, '_blank');
    } else {
      // Option 2: Different Firebase Projects - Use ID Token
      const idToken = await user.getIdToken();
      const authHandoffUrl = `${MAIN_APP_URL}?authToken=${encodeURIComponent(idToken)}`;
      window.open(authHandoffUrl, '_blank');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error launching app:', error);
    // Fallback: Open app without auth handoff
    const MAIN_APP_URL = `https://${import.meta.env.VITE_FIREBASE_PROJECT_ID}.web.app`;
    window.open(MAIN_APP_URL, '_blank');
    return { success: false, error: error.message };
  }
};

export default app; 