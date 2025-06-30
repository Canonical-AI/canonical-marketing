<template>
  <div class="app-root h-screen w-full overflow-clip flex flex-col">
    <!-- App Bar -->

    <header class="sticky top-0 z-50 bg-transparent" :class="{ 'bg-surface': openFAQ }">
      <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
        
        <div class="md:text-xl lg:text-2xl  text-on-surface-variant flex items-center space-x-2"> 
          <img src="/favicon.ico" alt="Canonical" class="logo w-10 h-10 mx-2" />
          Canonical 
        </div>
        <div class="space-x-4">
          <a class="text-on-surface-variant hover:text-primary transition-colors" @click="toggleFAQ">About</a>
          <a href="https://canonical-prod.web.app/document/7Smjq3YGDK2YW2ULrbMv?v=1.0.0" target="_blank" rel="noopener noreferrer" class="bg-warning text-white px-4 py-2 rounded-md hover:bg-primary-darken-1 transition-colors">try</a>
        </div>
      </nav>
    </header>

    <div v-if="openFAQ" class="faq p-8 px-24 bg-surface z-50 overflow-auto">
      <h1 class="text-left text-2xl mb-5 font-light">Frequently Asked Questions</h1>
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item text-left mb-5">
        <h2 class="text-lg mb-2.5 font-semibold">{{ faq.question }}</h2>
        <p class="text-md">{{ faq.answer }}</p>
      </div>
      <div class="flex justify-end">
        <a href="https://github.com/Canonical-AI" target="_blank" rel="noopener noreferrer" class="text-on-surface-variant hover:text-primary transition-colors mx-2">GitHub</a>
        <a href="https://www.linkedin.com/in/john-azzinaro-mba-6a1a6b59/" target="_blank" rel="noopener noreferrer" class="text-on-surface-variant hover:text-primary transition-colors mx-2">LinkedIn</a>
      </div>
    </div>

    <!-- Hero Section -->
    
    <div class="hero ">
      <!-- WebGL Background -->
      <div ref="backgroundContainer" class="background-container">
        <img ref="backgroundImage" src="/login-background.avif" alt="" class="background-image-hidden" />
      </div>
      
      <div class="z-10">
        <div class="md:text-xl lg:text-5xl typing my-16">> {{ currentPhrase }}</div>
        <a href="https://canonical-prod.web.app/document/7Smjq3YGDK2YW2ULrbMv?v=1.0.0" target="_blank" rel="noopener noreferrer" class="mx-2 my-6 bg-warning md:text-lg lg:text-xl text-white px-8 py-2 rounded-full hover:bg-primary-darken-1 transition-colors z-50">Launch &#128640;</a>
      </div>
    </div>

    <div class="hero-footer fixed bottom-0 left-0 right-0 flex justify-center items-center p-2 space-x-4">
      <a href="https://github.com/Canonical-AI/.github/blob/main/Privacy.md" target="_blank" rel="noopener noreferrer" class="text-on-surface-variant hover:text-primary transition-colors">privacy</a>
      <a href="https://github.com/Canonical-AI/.github/blob/main/Terms.md" target="_blank" rel="noopener noreferrer" class="text-on-surface-variant hover:text-primary transition-colors">terms</a>
      <p> &copy; 2025 Canonic-ai.com </p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
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

const openFAQ = ref(false);
const toggleFAQ = () => {
  openFAQ.value = !openFAQ.value;
};

const faqs = ref([

{ question: 'What is Canonical?', answer: 'Canonical is a platform for artifact creation, curation, and collaboration. Designed for product people by a proudct person. Why should devs get all the cool tools?. My vision is to blur the lines between engineering and product work and enable more people to build great products.' },
{ question: 'Who built Canonical?', answer: 'My name is John Azzinaro, Ex-AWS Technical Product Manager, with over five years of product management experience, and 10 years working in engineering.' },
{ question: 'Why did you build Canonical?', answer: 'Ive been coding for over a decade, and I wanted to build a tool that would make it easier for the people doing all the "soft stuff" to do their jobs like how engineers do their coding. in engineering we have concepts like commits, versioning, referencing and reviewing. This is the first step in that direction.' },
{ question: 'Whats next?', answer: 'Visit Github to see the public roadmap, or visit the demo site to see all of the product artifacts for Canonical live!' },
// Add more FAQs as needed
]);

const phrases = ref([
    'The AI for Product.',  
  'Build Artifacts.',
  'Craft your Canon.',
  'Unbound Development.',
  'Embrace #founder-mode.',
  'Co-pilot for Product.',

]);

const currentPhrase = ref('');
let i = 0;
let isDeleting = false;
let typingSpeed = 120; // Normal typing speed
let deletingSpeed = 48; // Faster deleting speed
let pauseDuration = 1080; // Pause duration after typing a full phrase

const typePhrase = () => {
  const fullText = phrases.value[i];
  if (!isDeleting) {
    currentPhrase.value = fullText.substring(0, currentPhrase.value.length + 1);
    if (currentPhrase.value === fullText) {
      setTimeout(() => {
        isDeleting = true;
        typePhrase();
      }, pauseDuration); // Pause before starting to delete
      return;
    }
  } else {
    currentPhrase.value = fullText.substring(0, currentPhrase.value.length - 1);
    if (currentPhrase.value === '') {
      isDeleting = false;
      i = (i + 1) % phrases.value.length;
    }
  }
  setTimeout(typePhrase, isDeleting ? deletingSpeed : typingSpeed);
};

// WebGL Background Setup
const backgroundContainer = ref(null);
const backgroundImage = ref(null);

// Three.js scene variables
let scene, camera, renderer, planeMesh;
let animationId = null;

// Animation state
let animationTime = 0;

const ANIMATION_CONFIG = {
  waveIntensity: 0.060,
  timeSpeed: 0.008
};

// Shaders
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
  
  // Ensure container has dimensions
  const width = container.offsetWidth || window.innerWidth;
  const height = container.offsetHeight || window.innerHeight;
  
  if (width === 0 || height === 0) {
    console.warn('Container has no dimensions, retrying...');
    setTimeout(() => initializeScene(texture), 100);
    return;
  }
  
  // Camera setup - use orthographic camera for full coverage
  camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;
  
  // Scene creation
  scene = new Scene();
  
  // Uniforms
  const shaderUniforms = {
    u_time: { type: "f", value: 1.0 },
    u_mouse: { type: "v2", value: new Vector2(0.5, 0.5) },
    u_intensity: { type: "f", value: ANIMATION_CONFIG.waveIntensity },
    u_texture: { type: "t", value: texture }
  };
  
  // Create a plane mesh that covers the full viewport
  planeMesh = new Mesh(
    new PlaneGeometry(2, 2),
    new ShaderMaterial({
      uniforms: shaderUniforms,
      vertexShader,
      fragmentShader
    })
  );
  
  // Add mesh to the scene
  scene.add(planeMesh);
  
  // Renderer
  renderer = new WebGLRenderer({ 
    alpha: false, 
    antialias: true,
    preserveDrawingBuffer: false,
    powerPreference: "high-performance"
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Clear any existing canvas
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  // Create canvas
  container.appendChild(renderer.domElement);
  
  // Start animation
  animateScene();
  
};

const animateScene = () => {
  if (!planeMesh || !renderer) return;
  
  animationId = requestAnimationFrame(animateScene);
  
  // Update animation time
  animationTime += ANIMATION_CONFIG.timeSpeed;
  
  // Create gentle looping movement for the wave center
  const loopX = 0.5 + Math.sin(animationTime * 0.3) * 1.6;
  const loopY = 0.5 + Math.cos(animationTime * 0.2) * 1.2;
  
  // Update uniforms
  const uniforms = planeMesh.material.uniforms;
  uniforms.u_intensity.value = ANIMATION_CONFIG.waveIntensity;
  uniforms.u_time.value = animationTime;
  uniforms.u_mouse.value.set(loopX, loopY);
  
  // Render
  renderer.render(scene, camera);
};

const handleResize = () => {
  if (!camera || !renderer || !backgroundContainer.value) return;
  
  const container = backgroundContainer.value;
  // For orthographic camera, we don't need to update aspect ratio
  // The camera already covers the full viewport with -1 to 1 coordinates
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

onMounted(() => {
  typePhrase();
  
  // Add resize listener
  window.addEventListener('resize', handleResize);
  
  // Wait for next tick to ensure DOM is fully rendered
  nextTick(() => {
    // Small delay to ensure container has proper dimensions
    setTimeout(() => {
      const textureLoader = new TextureLoader();
      textureLoader.load('/login-background.avif', (texture) => {
        initializeScene(texture);
        // Force a resize after initialization to ensure proper sizing
        setTimeout(() => {
          handleResize();
        }, 100);
      });
    }, 50);
  });
});

onUnmounted(() => {
  // Cleanup
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  if (renderer) {
    renderer.dispose();
  }
  
  window.removeEventListener('resize', handleResize);
});

</script>

<style scoped>
/* App Bar Styles */

.app-root::before {
     content: '';
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background: url('/grain.png') repeat;
     opacity: 0.06; /* Adjust opacity as needed */
     pointer-events: none;
     z-index: 1; /* Ensure it overlays the content */
   }

.app-root {
  position: relative; /* Ensure it is positioned relative to the viewport */
  overflow-x: hidden; /* Prevent horizontal overflow */
}

/* Hero Section Styles */
.hero {
  position: absolute; /* Establish a positioning context for absolute children */
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center; /* Center children vertically */
  justify-content: center; /* Center children horizontally */
  color: white;
  height: 100vh;
  width: 100vw;
}

/* WebGL Background */
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  filter: blur(15px);
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

/* Typing Animation */
.typing {
  position: relative; /* Ensure it is positioned relative to the background */
  z-index: 1; /* Ensure it is above the background */
  border-right: .1em solid white;
  white-space: nowrap;
  overflow: hidden;
  animation: blink-caret .75s step-end infinite;
  font-weight: 600;
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: white; }
}

</style>









