<template>
  <v-app>
    <!-- WebGL Background -->
    <div ref="backgroundContainer" class="background-container">
      <img ref="backgroundImage" src="/login-background.avif" alt="" class="background-image-hidden" />
    </div>
    
    <!-- Transition container for hover effect -->
    <div ref="transitionContainer" class="transition-container"></div>
    
    <!-- App Bar -->
    <v-app-bar
      :elevation="0"
      class="surface-app-bar"
      color="transparent"
      theme="dark"
      density="compact"
    >
      <template v-slot:prepend>
        <div class="logo-section" @click="router.push('/')">
          <img src="/favicon.ico" alt="Canonical" class="logo-icon" />
          <span class="logo-text">Canonical</span>
        </div>
      </template>

      <template v-slot:append>
        <div class="flex items-center gap-2 md:gap-3">
          <v-btn
            v-if="$route.name === 'Home'"
            variant="text"
            @click="scrollToSection('features')"
            class="btn-nav"
          >
            Features
          </v-btn>
          <v-btn
            v-if="$route.name !== 'ManageAccount'"
            variant="text"
            :to="{ name: 'About' }"
            class="btn-nav"
          >
            About
          </v-btn>
          <v-btn
            v-if="$route.name !== 'ManageAccount'"
            variant="text"
            href="https://canonical-prod.web.app/document/7Smjq3YGDK2YW2ULrbMv?v=1.0.0"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-nav"
          >
            <v-icon start>mdi-play</v-icon>
            Demo
          </v-btn>
          
          <!-- Authenticated User Menu -->
          <template v-if="user">
            <v-menu offset-y>
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  variant="text"
                  class="user-avatar-btn"
                  min-width="0"
                >
                  <v-avatar
                    variant="tonal"
                    size="32"
                  >
                    <span class="text-white font-weight-bold">
                      {{ getInitial(user?.email) }}
                    </span>
                  </v-avatar>
                </v-btn>
              </template>
              <v-list class="user-menu">
                <v-list-item :to="{ name: 'ManageAccount' }" class="menu-item">
                  <template v-slot:prepend>
                    <v-icon>mdi-account</v-icon>
                  </template>
                  <v-list-item-title>Account</v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleSignOut" class="menu-item">
                  <template v-slot:prepend>
                    <v-icon>mdi-logout</v-icon>
                  </template>
                  <v-list-item-title>Sign Out</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          
          <!-- Unauthenticated User Buttons -->
          <template v-else>
            <v-btn
              variant="text"
              @click="handleSignIn"
              class="btn-signin"
            >
              Sign In
            </v-btn>
            <v-btn
              variant="elevated"
              color="warning"
              :to="{ name: 'Signup' }"
              class="text-sm font-semibold"
            >
              Sign Up
            </v-btn>
          </template>


          <v-btn 
            color="warning" 
            variant="elevated"
            @click="handleLaunchApp"
            :loading="launchAppLoading"
          > 
            Launch App
          </v-btn>
        </div>
      </template>
    </v-app-bar>
    
    <v-main>
      <router-view />
    </v-main>

    <!-- Sign In Modal -->
    <v-dialog v-model="showSignInModal" max-width="500px" persistent>
      <v-card class="surface-modal">
        <v-card-title class="modal-header">
          <span class="modal-title">Sign In</span>
          <v-btn icon variant="text" @click="closeSignInModal" class="close-btn">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        
        <v-card-text class="modal-content">
          <div v-if="signInError" class="error-alert">{{ signInError }}</div>
          
          <!-- Social Sign In Buttons -->
          <div class="flex flex-col gap-3 mb-6">
            <v-btn
              @click="handleSocialSignIn('google')"
              :loading="signInLoading"
              block
              variant="outlined"
              class="btn-social google"
            >
              <v-icon start>mdi-google</v-icon>
              Continue with Google
            </v-btn>
            
            <v-btn
              @click="handleSocialSignIn('github')"
              :loading="signInLoading"
              block
              variant="outlined"
              class="btn-social github"
            >
              <v-icon start>mdi-github</v-icon>
              Continue with GitHub
            </v-btn>
          </div>

          <!-- Divider -->
          <div class="divider">
            <div class="divider-line"></div>
            <span class="divider-text">or continue with email</span>
            <div class="divider-line"></div>
          </div>

          <!-- Email Sign In Form -->
          <v-form @submit.prevent="handleEmailSignIn" class="form-field">
            <v-text-field
              v-model="signInEmail"
              label="Email"
              type="email"
              required
              variant="outlined"
              class="mb-3"
            ></v-text-field>
            
            <v-text-field
              v-model="signInPassword"
              label="Password"
              type="password"
              required
              variant="outlined"
              class="mb-4"
            ></v-text-field>
            
            <v-btn
              type="submit"
              :loading="signInLoading"
              block
              color="warning"
              variant="elevated"
              class="font-semibold mb-6"
            >
              Sign In
            </v-btn>
          </v-form>

          <!-- Footer -->
          <div class="footer-text">
            Don't have an account? 
            <a @click="closeSignInModal(); $router.push('/signup')" class="footer-link">Sign up</a>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { 
  Scene, 
  OrthographicCamera, 
  WebGLRenderer, 
  PlaneGeometry, 
  ShaderMaterial, 
  Mesh, 
  TextureLoader,
  Vector2 
} from 'three';
import { onAuthStateChange, signOutUser, signInWithEmail, signInWithSocial, googleProvider, githubProvider, handleLaunchApp as launchApp } from './firebase.js';

const router = useRouter();

// Authentication state
const user = ref(null);
const showSignInModal = ref(false);
const signInLoading = ref(false);
const signInError = ref('');
const signInEmail = ref('');
const signInPassword = ref('');
const launchAppLoading = ref(false);

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const getInitial = (email) => {
  // Get the first letter from the email
  return email ? email.charAt(0).toUpperCase() : 'U';
};

// Auth functions
const handleSignIn = () => {
  showSignInModal.value = true;
  signInError.value = '';
};

const handleEmailSignIn = async () => {
  if (!signInEmail.value || !signInPassword.value) {
    signInError.value = 'Please enter both email and password';
    return;
  }

  signInLoading.value = true;
  signInError.value = '';

  try {
    const { user: authUser, error } = await signInWithEmail(signInEmail.value, signInPassword.value);
    
    if (error) {
      signInError.value = error;
      return;
    }

    // Successfully signed in
    showSignInModal.value = false;
    signInEmail.value = '';
    signInPassword.value = '';
    router.push('/manage-account');
  } catch (err) {
    signInError.value = 'Failed to sign in. Please try again.';
  } finally {
    signInLoading.value = false;
  }
};

const handleSocialSignIn = async (provider) => {
  signInLoading.value = true;
  signInError.value = '';

  try {
    const authProvider = provider === 'google' ? googleProvider : githubProvider;
    const { user: authUser, error } = await signInWithSocial(authProvider);
    
    if (error) {
      signInError.value = error;
      return;
    }

    // Successfully signed in
    showSignInModal.value = false;
    router.push('/manage-account');
  } catch (err) {
    signInError.value = `Failed to sign in with ${provider}. Please try again.`;
  } finally {
    signInLoading.value = false;
  }
};

const handleSignOut = async () => {
  try {
    await signOutUser();
    router.push('/');
  } catch (err) {
    console.error('Sign out error:', err);
  }
};

const closeSignInModal = () => {
  showSignInModal.value = false;
  signInEmail.value = '';
  signInPassword.value = '';
  signInError.value = '';
};

// Launch App with Authentication Handoff
const handleLaunchApp = async () => {
  launchAppLoading.value = true;
  
  try {
    await launchApp(user.value);
  } finally {
    launchAppLoading.value = false;
  }
};

// WebGL background variables
const backgroundContainer = ref(null);
const backgroundImage = ref(null);
const transitionContainer = ref(null);

let scene, camera, renderer, planeMesh;
let animationId = null;
let animationTime = 0;

const ANIMATION_CONFIG = {
  waveIntensity: 0.060,
  timeSpeed: 0.002
};

// Shaders for background animation
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_intensity;
  uniform sampler2D u_texture;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float wave1 = sin(uv.x * 10.0 + u_time * 0.5 + u_mouse.x * 5.0) * u_intensity;
    float wave2 = sin(uv.y * 12.0 + u_time * 0.8 + u_mouse.y * 4.0) * u_intensity;
    float wave3 = cos(uv.x * 8.0 + u_time * 0.5 + u_mouse.x * 3.0) * u_intensity;
    float wave4 = cos(uv.y * 9.0 + u_time * 0.7 + u_mouse.y * 3.5) * u_intensity;

    uv.y += wave1 + wave2;
    uv.x += wave3 + wave4;
    
    gl_FragColor = texture2D(u_texture, uv);
  }
`;

const initializeScene = (texture) => {
  const container = backgroundContainer.value;
  if (!container) {
    console.warn('Container not available for Three.js initialization');
    return;
  }
  
  const width = container.offsetWidth || window.innerWidth;
  const height = container.offsetHeight || window.innerHeight;
  
  if (width === 0 || height === 0) {
    console.warn('Container has no dimensions, retrying...');
    setTimeout(() => initializeScene(texture), 100);
    return;
  }
  
  camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;
  
  scene = new Scene();
  
  const shaderUniforms = {
    u_time: { type: "f", value: 1.0 },
    u_mouse: { type: "v2", value: new Vector2(0.5, 0.5) },
    u_intensity: { type: "f", value: ANIMATION_CONFIG.waveIntensity },
    u_texture: { type: "t", value: texture }
  };
  
  planeMesh = new Mesh(
    new PlaneGeometry(2, 2),
    new ShaderMaterial({
      uniforms: shaderUniforms,
      vertexShader,
      fragmentShader
    })
  );
  
  scene.add(planeMesh);
  
  renderer = new WebGLRenderer({ 
    alpha: false, 
    antialias: true,
    preserveDrawingBuffer: false,
    powerPreference: "high-performance"
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  container.appendChild(renderer.domElement);
  
  animateScene();
};

const animateScene = () => {
  if (!planeMesh || !renderer) return;
  
  animationId = requestAnimationFrame(animateScene);
  
  animationTime += ANIMATION_CONFIG.timeSpeed;
  
  const loopX = 0.5 + Math.sin(animationTime * 0.3) * 1.6;
  const loopY = 0.5 + Math.cos(animationTime * 0.2) * 1.2;
  
  const uniforms = planeMesh.material.uniforms;
  uniforms.u_intensity.value = ANIMATION_CONFIG.waveIntensity;
  uniforms.u_time.value = animationTime;
  uniforms.u_mouse.value.set(loopX, loopY);
  
  renderer.render(scene, camera);
};

const handleResize = () => {
  if (!camera || !renderer || !backgroundContainer.value) return;
  
  const container = backgroundContainer.value;
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

// Add parallax scroll handler
const handleParallaxScroll = () => {
  if (!backgroundContainer.value) return;
  
  const scrollY = window.scrollY;
  const parallaxSpeed = 0.2; // Reduced for more subtle effect
  
  // Apply parallax transform to the WebGL background
  backgroundContainer.value.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleParallaxScroll);
  
  // Listen for auth state changes
  const unsubscribe = onAuthStateChange((authUser) => {
    user.value = authUser;
  });
  
  // Store unsubscribe function for cleanup
  window.authUnsubscribe = unsubscribe;
  
  nextTick(() => {
    setTimeout(() => {
      const textureLoader = new TextureLoader();
      textureLoader.load('/login-background.avif', (texture) => {
        initializeScene(texture);
        setTimeout(() => {
          handleResize();
        }, 100);
      });
    }, 50);
  });
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  if (renderer) {
    renderer.dispose();
  }
  
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleParallaxScroll);
  
  // Clean up auth listener
  if (window.authUnsubscribe) {
    window.authUnsubscribe();
  }
});

// Export transition container ref for child components to use
window.appTransitionContainer = transitionContainer;
</script>

<style>
/* Component-specific styles that can't be replaced */

/* WebGL Background - unique to this component */
.background-container {
  position: fixed;
  top: -20%;
  left: 0;
  width: 100%;
  height: 150%;
  z-index: 0;
  overflow: hidden;
  filter: blur(15px);
  will-change: transform;
}

.background-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  filter: saturate(80%);
}

.background-image-hidden {
  display: none;
}

/* Transition container for hover effects - unique to this component */
.transition-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.transition-container.active {
  opacity: 1;
  pointer-events: all;
}

/* App specific overrides */
#app {
  position: relative;
  min-height: 100vh;
}

/* Mobile responsive adjustments for Vuetify buttons */
@media (max-width: 768px) {
  .v-btn.btn-nav {
    font-size: 0.75rem !important;
    min-width: auto !important;
    padding: 0.25rem 0.5rem !important;
  }
}

@media (max-width: 480px) {
  .v-btn.btn-nav {
    font-size: 0.7rem !important;
    padding: 0.2rem 0.4rem !important;
  }
}

/* User Avatar Button */
.user-avatar-btn {
  padding: 0.25rem !important;
  min-width: auto !important;
}

.user-avatar-small {
  border: 2px solid rgba(255, 255, 255, 0.2);
}

/* User Menu */
.user-menu {
  background: rgba(30, 30, 30, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  min-width: 150px;
}

.user-menu .menu-item {
  color: white !important;
  transition: background-color 0.2s ease;
}

.user-menu .menu-item:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.user-menu .v-list-item-title {
  color: white !important;
}

.user-menu .v-icon {
  color: rgba(255, 255, 255, 0.7) !important;
}

@media (max-width: 768px) {
  .user-avatar-small {
    width: 32px !important;
    height: 32px !important;
    font-size: 0.875rem;
  }
}
</style>









