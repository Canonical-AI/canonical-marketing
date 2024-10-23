<template>
  <div class="app-root h-screen w-full overflow-clip flex flex-col">
    <!-- App Bar -->

    <header class="sticky top-0 z-50 bg-transparent">
      <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
        
        <div class="md:text-xl lg:text-2xl font-bold text-on-surface-variant flex items-center space-x-2"> 
          <img src="/favicon.ico" alt="Canonical" class="logo w-10 h-10" />
          Canonical <strong>[BETA]</strong>
        </div>
        <div class="space-x-4">
          <a class="text-on-surface-variant hover:text-primary transition-colors" @click="toggleFAQ">About</a>
          <a href="https://canonical-dev-b6afd.firebaseapp.com" class="bg-warning text-white px-4 py-2 rounded-md hover:bg-primary-darken-1 transition-colors">try</a>
        </div>
      </nav>
    </header>

    <FAQ v-if="openFAQ" />

    <!-- Hero Section -->
    
    <div class="hero ">
      <div class="hero-gradient"></div>
      <div class="gradient-blob-1"></div>
      <div class="gradient-blob-2"></div>
      <div class="gradient-blob-3"></div>
      <div class="gradient-blob-4"></div>
      <div class="z-10">
        <div class="md:text-xl lg:text-5xl typing my-16">> {{ currentPhrase }}</div>
        <h2 class="md:text-xl lg:text-2xl font-light my-4">coming soon...</h2>
        <a href="https://canonical-dev-b6afd.firebaseapp.com" class="mx-2 my-4 bg-warning md:text-xl lg:text-2xl text-white px-8 py-2 rounded-full hover:bg-primary-darken-1 transition-colors z-50">Launch Beta &#128640;</a>
      </div>
    </div>

    <div class="hero-footer fixed bottom-0 left-0 right-0 flex justify-center items-center p-2 space-x-4">
      <a class="text-on-surface-variant hover:text-primary transition-colors" @click="toggleFAQ">privacy</a>
      <a class="text-on-surface-variant hover:text-primary transition-colors" @click="toggleFAQ">terms</a>
      <p> &copy; 2024 Canonical </p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import FAQ from './FAQ.vue';

const openFAQ = ref(false);
const toggleFAQ = () => {
  openFAQ.value = !openFAQ.value;
};

const phrases = ref([
  'Build your artifacts...',
  'Craft your product canon...',
  'Unbound your development...',
  'Embrace your #founder-mode...',
  'Co-pilot for product peeps...',
]);

const features = ref([
  {
    title: 'Know your Product',
    description: 'Leverage specialized AI models to streamline the creation and management of your product artifacts.'
  },
  {
    title: 'Keep organized, keep track',
    description: 'Organize everything in one place to ensure nothing falls through the cracks—whether it’s user stories, roadmaps, or feature requests.'
  },
  {
    title: 'Collaborate with your virtual-peers',
    description: 'Canonical lets you bounce ideas off your virtual-peers, and get feedback from a virtual-community of product managers.'
  }
])

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

onMounted(() => {
  typePhrase();
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

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(42deg, 
              var(--background) 0%, 
              var(--success) 45%, 
              var(--secondary-darken-1) 56%, 
              var(--primary) 78%, 
              var(--surface) 100%);
  z-index: 0; /* Ensure this is behind the typing class */
  filter: url(#goo) blur(50px) ;
  opacity: 0.7;

}

.gradient-blob-1 {
    position: absolute;
    background: radial-gradient(circle at center, rgba(var(--warning-rgb), 0.8) 0, rgba(var(--primary-rgb), 0) 50%);
    /* background: radial-gradient(circle at center, red 0, black 50%) no-repeat; */

    mix-blend-mode: var(--blending);

    width: var(--circle-size);
    height: var(--circle-size);
    top: calc(50% - var(--circle-size) / 2);
    left: calc(50% - var(--circle-size) / 2);
    filter: url(#goo) blur(20px) ;

    transform-origin: center center;
    animation: yellow 20s ease infinite;

    opacity: .8;
  }

.gradient-blob-2 {
    position: absolute;
    background: radial-gradient(circle at center, rgba( var(--success-rgb), 1) 0, rgba( var(--secondary-rgb), 0) 50%) no-repeat;
    mix-blend-mode: var(--blending);

    width: var(--circle-size);
    height: var(--circle-size);
    top: calc(50% - var(--circle-size) / 2);
    left: calc(50% - var(--circle-size) / 2);

    transform-origin: calc(50% - 400px);
    animation: green 20s reverse infinite;
    filter: url(#goo) blur(20px) ;

    opacity: 1;
  }

.gradient-blob-3 {
    position: absolute;
    background: radial-gradient(circle at center, rgba(var(--primary-rgb), 0.8) 0, rgba(var(--warning-rgb), 0) 50%) no-repeat;
    mix-blend-mode: var(--blending);

    width: var(--circle-size);
    height: var(--circle-size);
    top: calc(50% - var(--circle-size));
    left: calc(50% - var(--circle-size) / 2);

    transform-origin: calc(50% + 400px);
    animation: red 40s linear infinite;
    filter: url(#goo) blur(20px) ;

    opacity: 1;
  }

.gradient-blob-4 {
    position: absolute;
    background: radial-gradient(circle at center, rgba(194, 70, 152, 0.8) 0, rgba(var(--warning-rgb), 0) 50%) no-repeat;
    mix-blend-mode: var(--blending);

    width: var(--circle-size);
    height: var(--circle-size);
    top: calc(50% - var(--circle-size));
    left: calc(50% - var(--circle-size) / 2);

    transform-origin: calc(50% + 400px);
    animation: purple 30s linear infinite;
    filter: url(#goo) blur(20px) ;

    opacity: 1;
  }

  @keyframes yellow {
  0% {top: 66.67%; left: 33.33%; transform: scale(1);}
  30% {top: 90%; left: 50%; transform: scale(1.2);}
  60% {top: 0%; left: 66.67%; transform: scale(1.3);}
  100% {top: 66.67%; left: 33.33%; transform: scale(1);}
}

@keyframes green {
  0% {top: 26.67%; right: -5%; transform: scale(1.2);}
  30% {top: 90%; right: -5%;transform: scale(1);}
  60% {top: 66.67%; right: 33.33%;transform: scale(1);}
  100% {top: 0%; right: -5%; transform: scale(1.2);}
}

@keyframes red {
  0% {top: 83.33%; right: 0%; transform: scale(1);}
  30% {top: 0%; right: 50%;transform: scale(1.4);}
  60% {top: 83.33%; right: 33.33%;transform: scale(1);}
  100% {top: 83.33%; right: 0%; transform: scale(1);}
}

@keyframes purple {
  0% {top: 83.33%; right: 0%; transform: scale(1.3);}
  30% {top: 0%; right: 50%;transform: scale(1.4);}
  60% {top: 83.33%; right: 33.33%;transform: scale(1.6);}
  100% {top: 83.33%; right: 0%; transform: scale(1);}
}


/* Typing Animation */
.typing {
  position: relative; /* Ensure it is positioned relative to the hero-gradient */
  z-index: 1; /* Ensure it is above the hero-gradient */
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









