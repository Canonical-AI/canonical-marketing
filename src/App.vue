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
      class="app-bar"
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
        <v-btn
          v-if="$route.name === 'Home'"
          variant="text"
          @click="scrollToSection('features')"
          class="reactive-btn nav-btn"
        >
          Features
        </v-btn>
        <v-btn
          variant="text"
          :to="{ name: 'About' }"
          class="reactive-btn nav-btn"
        >
          About
        </v-btn>
        <v-btn
          variant="text"
          href="https://canonical-prod.web.app/document/7Smjq3YGDK2YW2ULrbMv?v=1.0.0"
          target="_blank"
          rel="noopener noreferrer"
          class="reactive-btn nav-btn"
        >
          <v-icon start>mdi-play</v-icon>
          Demo
        </v-btn>
        <v-btn
          variant="elevated"
          color="warning"
          :to="{ name: 'Signup' }"
          class="signup-btn"
        >
          Sign Up
        </v-btn>
      </template>
    </v-app-bar>
    
    <v-main>
      <router-view />
    </v-main>
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

const router = useRouter();

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
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
});

// Export transition container ref for child components to use
window.appTransitionContainer = transitionContainer;
</script>

<style>
/* App Bar Styles */
.app-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.app-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 100%;
  padding: 0 1.5rem;
}

.app-bar-left {
  display: flex;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.logo-section:hover {
  opacity: 0.8;
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
}

.app-bar-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-btn {
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 0.9rem;
}

.nav-btn:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

.signup-btn {
  font-size: 0.9rem;
  font-weight: 600;
}

/* Mobile app bar */
@media (max-width: 768px) {


  .reactive-btn {
    font-size: 0.5rem !important;
    margin: 0.0rem !important;
    padding: 0.0rem !important;
  }


  .app-bar-content {
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
  }
  
  .app-bar-right {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-btn {
    font-size: 0.8rem;
  }
  
  .signup-btn {
    font-size: 0.8rem;
  }
  
  .logo-text {
    font-size: 1.1rem;
  }
  
  .logo-icon {
    width: 2rem;
    height: 2rem;
  }
}

@media (max-width: 480px) {
  .app-bar-content {
    padding: 0.5rem 0.75rem;
  }
  
  .app-bar-right {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Global styles that apply to all pages */
#app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/grain.png') repeat;
  opacity: 0.07;
  pointer-events: none;
  z-index: 1;
}

#app {
  position: relative;
  min-height: 100vh;
}

/* WebGL Background */
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

/* Transition container for hover effects */
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
</style>









