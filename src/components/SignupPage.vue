<template>
  <div class="signup-screen-container">
    <!-- Signup Content -->
    <div class="signup-content">
      <div class="signup-card">
        <div class="card-grid">
          <!-- Left Side - Form -->
          <div class="form-panel">
            <div class="form-content">
              <!-- Header -->
              <div class="form-header">
                <div class="logo-section">
                  <img src="/favicon.ico" alt="Canonical" class="logo-icon" />
                  <span class="logo-text">Canonical</span>
                </div>
                <h1 class="form-title">Create your account</h1>
                <p class="form-subtitle">Start building your product artifacts</p>
              </div>

              <div v-if="error" class="error-alert">{{ error }}</div>
              
              <!-- Social auth buttons -->
              <div class="social-buttons">
                <button
                  @click="handleSocialSignUp('google')"
                  :disabled="socialLoading === 'google'"
                  class="social-btn"
                >
                  <svg v-if="socialLoading === 'google'" class="loading-spinner" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"/>
                    <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <svg v-else class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
                
                <button
                  @click="handleSocialSignUp('github')"
                  :disabled="socialLoading === 'github'"
                  class="social-btn"
                >
                  <svg v-if="socialLoading === 'github'" class="loading-spinner" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"/>
                    <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <svg v-else class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Continue with GitHub
                </button>
              </div>

              <!-- Divider -->
              <div class="divider">
                <div class="divider-line"></div>
                <span class="divider-text">or continue with email</span>
                <div class="divider-line"></div>
              </div>

              <!-- Email signup form -->
              <form @submit.prevent="handleEmailSignUp" class="signup-form">
                <input
                  v-model="signupEmail"
                  type="email"
                  required
                  class="form-input"
                  placeholder="Enter your email"
                  @blur="validateEmail"
                />
                <div v-if="emailError" class="field-error">{{ emailError }}</div>
                
                <input
                  v-model="signupPassword"
                  type="password"
                  required
                  class="form-input"
                  placeholder="Create a password"
                  @blur="validatePassword"
                />
                <div v-if="passwordError" class="field-error">{{ passwordError }}</div>

                <input
                  v-model="confirmPassword"
                  type="password"
                  required
                  class="form-input"
                  placeholder="Confirm your password"
                  @blur="validateConfirmPassword"
                />
                <div v-if="confirmPasswordError" class="field-error">{{ confirmPasswordError }}</div>
                
                <button 
                  type="submit"
                  :disabled="emailLoading || !isFormValid"
                  class="submit-btn"
                  ref="submitButton"
                >
                  <svg v-if="emailLoading" class="loading-spinner" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"/>
                    <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span v-if="emailLoading">Creating account...</span>
                  <span v-else>Create Account</span>
                </button>
              </form>

              <!-- Footer -->
              <div class="form-footer">
                <p class="footer-text">
                  Already have an account? 
                  <a href="https://canonical-prod.web.app" class="footer-link">Sign in</a>
                </p>
              </div>
            </div>
          </div>

          <!-- Right Side - Info -->
          <div class="info-panel">
            <div class="info-content">
              <h2 class="info-title">Why teams choose Canonical</h2>
              
              <div class="features-list">
                <div class="feature-item">
                  <svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Lightning-fast document creation</span>
                </div>
                <div class="feature-item">
                  <svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                  </svg>
                  <span>Real-time collaboration</span>
                </div>
                <div class="feature-item">
                  <svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Enterprise-grade security</span>
                </div>
                <div class="feature-item">
                  <svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Version control for product artifacts</span>
                </div>
                <div class="feature-item">
                  <svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                  </svg>
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="bottom-footer">
      <div class="footer-links">
        <a href="https://github.com/Canonical-AI/.github/blob/main/Privacy.md" target="_blank" rel="noopener noreferrer" class="footer-link">Privacy</a>
        <a href="https://github.com/Canonical-AI/.github/blob/main/Terms.md" target="_blank" rel="noopener noreferrer" class="footer-link">Terms</a>
        <span class="footer-copyright">&copy; 2025 Canonical-ai.com</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import hoverEffect from 'hover-effect';

export default {
  name: 'SignupPage',
  setup() {
    const router = useRouter();
    
    const error = ref('');
    const emailLoading = ref(false);
    const socialLoading = ref('');
    const submitButton = ref(null);
    
    // Form data
    const signupEmail = ref('');
    const signupPassword = ref('');
    const confirmPassword = ref('');
    
    // Form validation
    const emailError = ref('');
    const passwordError = ref('');
    const confirmPasswordError = ref('');
    
    // Hover effect instance
    let hoverEffectInstance = null;
    
    // Computed validation
    const isFormValid = computed(() => {
      return signupEmail.value && 
             signupPassword.value && 
             confirmPassword.value &&
             !emailError.value &&
             !passwordError.value &&
             !confirmPasswordError.value;
    });
    
    const validateEmail = () => {
      const emailRegex = /.+@.+\..+/;
      if (!signupEmail.value) {
        emailError.value = 'Email is required';
      } else if (!emailRegex.test(signupEmail.value)) {
        emailError.value = 'Email must be valid';
      } else {
        emailError.value = '';
      }
    };
    
    const validatePassword = () => {
      if (!signupPassword.value) {
        passwordError.value = 'Password is required';
      } else if (signupPassword.value.length < 6) {
        passwordError.value = 'Password must be at least 6 characters';
      } else {
        passwordError.value = '';
      }
      validateConfirmPassword(); // Re-validate confirm password when password changes
    };
    
    const validateConfirmPassword = () => {
      if (!confirmPassword.value) {
        confirmPasswordError.value = 'Please confirm your password';
      } else if (confirmPassword.value !== signupPassword.value) {
        confirmPasswordError.value = 'Passwords do not match';  
      } else {
        confirmPasswordError.value = '';
      }
    };
  
    const createTransitionEffect = () => {
      if (hoverEffectInstance && window.appTransitionContainer) {
        const container = window.appTransitionContainer.value;
        container.classList.add('active');
        
        // Trigger the effect
        hoverEffectInstance.next();
        
        // Hide after animation
        setTimeout(() => {
          container.classList.remove('active');
        }, 1200);
      }
    };
    
    const handleEmailSignUp = async () => {
      // Validate all fields
      validateEmail();
      validatePassword();
      validateConfirmPassword();
      
      if (!isFormValid.value) return;
      
      error.value = '';
      emailLoading.value = true;
      
      // Trigger transition effect
      createTransitionEffect();
      
      try {
        // TODO: Implement Firebase Auth signup
        console.log('Email signup attempt:', signupEmail.value);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Redirect to main app with signup indication
        window.location.href = `https://canonical-prod.web.app?signup=true&email=${encodeURIComponent(signupEmail.value)}`;
        
      } catch (err) {
        console.error('Signup error:', err);
        error.value = 'Failed to create account. Please try again.';
      } finally {
        emailLoading.value = false;
      }
    };
    
    const handleSocialSignUp = async (provider) => {
      error.value = '';
      socialLoading.value = provider;
      
      // Trigger transition effect
      createTransitionEffect();
      
      try {
        // TODO: Implement social auth
        console.log(`${provider} signup clicked`);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Redirect to main app
        window.location.href = `https://canonical-prod.web.app?signup=true&provider=${provider}`;
        
      } catch (err) {
        console.error('Social signup error:', err);
        error.value = `Failed to sign up with ${provider}. Please try again.`;
      } finally {
        socialLoading.value = '';
      }
    };
    
    onMounted(() => {
      // Initialize hover effect after component mounts
      setTimeout(() => {
        initializeHoverEffect();
      }, 500);
    });
    
    onUnmounted(() => {
      // Clean up hover effect
      if (hoverEffectInstance) {
        try {
          hoverEffectInstance = null;
        } catch (err) {
          console.warn('Error cleaning up hover effect:', err);
        }
      }
    });
    
    return {
      error,
      emailLoading,
      socialLoading,
      signupEmail,
      signupPassword,
      confirmPassword,
      emailError,
      passwordError,
      confirmPasswordError,
      isFormValid,
      submitButton,
      handleEmailSignUp,
      handleSocialSignUp,
      validateEmail,
      validatePassword,
      validateConfirmPassword
    };
  }
};
</script>

<style scoped>
.signup-screen-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background: transparent;
}

/* Main content */
.signup-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1rem 1rem;
  position: relative;
  z-index: 3;
}

.signup-card {
  width: 100%;
  max-width: 800px;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.0);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 400px;
}

/* Form Panel */
.form-panel {
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(15px);
}

.form-content {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-header {
  text-align: center;
  margin-bottom: 1.25rem;
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.logo-icon {
  width: 2rem;
  height: 2rem;
}

.logo-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
}

.form-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
}

.form-subtitle {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Error Alert */
.error-alert {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.8rem;
  text-align: center;
}

/* Social Buttons */
.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.social-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.social-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.social-icon {
  width: 0.9rem;
  height: 0.9rem;
}

.loading-spinner {
  width: 0.9rem;
  height: 0.9rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  margin: 0.75rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.divider-text {
  padding: 0 0.75rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

/* Form */
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-input {
  padding: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #60a5fa;
  background: rgba(255, 255, 255, 0.08);
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.field-error {
  font-size: 0.7rem;
  color: #fca5a5;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem;
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background: #d97706;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Form Footer */
.form-footer {
  text-align: center;
  margin-top: 1rem;
}

.footer-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.footer-link {
  color: #60a5fa;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #93c5fd;
}

/* Info Panel */
.info-panel {
  background: rgba(255, 255, 255, 0.05);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
}

.info-content {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1.25rem;
  text-align: center;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.feature-icon {
  width: 1rem;
  height: 1rem;
  color: #60a5fa;
  flex-shrink: 0;
}

.feature-item span {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Bottom Footer */
.bottom-footer {
  position: relative;
  z-index: 3;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 0.75rem;
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
}

.footer-copyright {
  color: rgba(255, 255, 255, 0.4);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .signup-content {
    padding: 6rem 0.5rem 1rem;
  }
  
  .signup-card {
    max-width: 100%;
    background: rgba(255, 255, 255, 0.01);
  }
  
  .card-grid {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  
  .info-panel {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.08);
  }
  
  .form-content,
  .info-content {
    padding: 1.5rem;
  }
  
  .form-title {
    font-size: 1.1rem;
  }
  
  .bottom-footer {
    padding: 0.75rem 0.5rem;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .signup-content {
    padding: 5rem 0.25rem 0.5rem;
  }
  
  .form-content,
  .info-content {
    padding: 1.25rem;
  }
}
</style> 