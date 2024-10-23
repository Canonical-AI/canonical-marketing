<template>
  <div class="p-0 m-0 app-root">
    <!-- App Bar -->

    <header :class="{'transparent-header': isTransparent}" class="sticky top-0 bg-surface z-50 transition-background">
      <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
        
        <div class="text-2xl font-bold text-on-surface-variant flex items-center space-x-2"> 
          <img src="/favicon.ico" alt="Canonical" class="logo w-10 h-10" />
          Canonical <strong>[BETA]</strong>
        </div>
        <div class="space-x-4">
          <!-- <a href="#pricing" class="text-on-surface-variant hover:text-primary transition-colors">Pricing</a> -->
          <!-- <a href="#features" class="text-on-surface-variant hover:text-primary transition-colors">Features</a> -->
          <a class="text-on-surface-variant hover:text-primary transition-colors" @click="toggleFAQ">About</a>
          <a href="https://canonical-dev-b6afd.firebaseapp.com" class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-darken-1 transition-colors">beta access</a>
        </div>
      </nav>
    </header>

    <FAQ v-if="openFAQ" />

    <!-- Hero Section -->
    
    <div class="hero">
      <div class="hero-gradient"></div>
      <div class="gradient-blob-1"></div>
      <div class="gradient-blob-2"></div>
      <div class="gradient-blob-3"></div>
      <div class="gradient-blob-4"></div>
      <div class="hero-content">
        <div class="typing my-10">>{{ currentPhrase }}</div>
        <a href="https://canonical-dev-b6afd.firebaseapp.com" class="mx-2 my-5 bg-primary text-2xl text-white px-4 py-2 rounded-md hover:bg-primary-darken-1 transition-colors z-50">Launch Beta &#128640;</a>
      </div>
    </div>

    <!-- Static Paragraph -->
    <section id="overview" class="overview flex items-center justify-center">
      <p style="text-align: center; padding: 20px;" class="text-2xl">
        Stay on course with <strong> effortless</strong> artifact creation, curation, and collaboration.  Built on insights from leading product managers, it streamlines your processes, ensuring that stakeholders remain in sync and developers focus on the right priorities.
      </p>
    </section>

    <section id="cta1" class="flex items-center justify-right">
      <p style="text-align: left; padding: 20px;" class="text-xl">
        Canonical is currently in beta. 
        Visit Canonical.dev to get started. 
        Or Signup for updates below.
      </p>
    </section>

    <!-- Pricing Cards -->
    <!-- <section id="pricing">
      <div class="pricing">
        <div class="card border border-surface-variant p-5 w-1/3 text-center m-1 rounded-lg z-10" v-for="(plan, index) in plans" :key="index">
          <h2 class="text-2xl font-bold">{{ plan.name }}</h2>
          <h3 class="text-lg font-semibold">{{ plan.price }}</h3>
          <h4 class="font-semibold text-left">Includes</h4>
          <ul class="list-disc list-inside text-left">
            <li v-for="feature in plan.includes" :key="feature">{{ feature }}</li>
          </ul>
          <button class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-darken-1 transition-colors">Get Started</button>
        </div>
      </div>
    </section> -->


        <!-- Call to Action Section -->
      <section id="cta2" class="bg-success text-white py-8">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold mb-4">Signup for updates</h2>
        <form>
          <input type="email" placeholder="Email" class="px-4 py-2 rounded-md">
          <button class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-darken-1 transition-colors">Signup</button>
        </form>
        <!-- <p class="text-xl mb-8">Join thousands of satisfied customers and transform your business today.</p> -->
        <!-- <a href="#" class="bg-white text-blue-500 px-8 py-3 rounded-md text-lg hover:bg-gray-100 transition-colors inline-flex items-center">
          Start Your Free Trial
          <svg class="ml-2 h-5 w-5" viewBox="0 0 24 24">
            <path :d="mdiArrowRight" />
          </svg>
        </a> -->
      </div>
    </section>


    <!-- Footer -->
    <footer class="bg-surface text-white py-8">
      <div class="container mx-auto px-6 text-center">
        <p>&copy; 2077 Canonical. All rights reserved.</p>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { mdiArrowRight, mdiChartBar, mdiClockOutline, mdiAccountGroup } from '@mdi/js';
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
let typingSpeed = 100; // Normal typing speed
let deletingSpeed = 50; // Faster deleting speed
let pauseDuration = 1000; // Pause duration after typing a full phrase

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

const plans = ref([
  { name: 'Hobby', price: 'Free' , includes: ['1000 Artifacts', '100 Users', '10000 Views'] },
  { name: 'Pro', price: '$20/month' , includes: ['1000 Artifacts', '100 Users', '10000 Views'] },
  { name: 'Enterprise', price: 'Email for pricing' , includes: ['1000 Artifacts', '100 Users', '10000 Views'] }
]);

const isTransparent = ref(true);

const handleScroll = () => {
  const heroHeight = document.querySelector('.hero').offsetHeight;
  isTransparent.value = window.scrollY < heroHeight;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Add this function to handle the faster parallax effect
const handleParallax = () => {
  const overviewSection = document.querySelector('.overview');
  const scrollPosition = window.scrollY;
  const parallaxSpeed = 0.7; // Increase this value to make it scroll up faster

  // Calculate the new position
  const offset = scrollPosition * parallaxSpeed;
  overviewSection.style.transform = `translateY(-${offset}px)`; // Use negative to move up
};

onMounted(() => {
  window.addEventListener('scroll', handleParallax);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleParallax);
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
     position: relative;
     z-index: 2; /* Ensure content is above the grain overlay */
   }

.app-bar {
  background-color: var(--surface);
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-around;
}

/* Hero Section Styles */
.hero {
  position: relative; /* Establish a positioning context for absolute children */
  display: flex;
  align-items: center; /* Center children vertically */
  justify-content: center; /* Center children horizontally */
  overflow-x: hidden;
  color: white;
  height: 80vh;
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
    overflow: hidden;

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
    overflow: hidden;

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

.hero-content{
  z-index: 1;
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
  font-size: 3em;
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: white; }
}


.overview {
  position: relative;
  overflow: hidden;
  z-index: 10;
  height: 60vh;
  padding: 60px;
  background: radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
  border-radius: 15px;
  opacity: 0.9;
  transform: translateY(0); /* Initial position */
  transition: transform 0.1s ease-out; /* Smooth transition */
}

.overview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
  z-index: -10;
  filter: blur(30px);
}

/* .overview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 50px 50px;
  background-image: 
    linear-gradient(135deg, rgba(var(--primary-rgb), 0.5) 25%, transparent 25%),
    linear-gradient(225deg, rgba(var(--secondary-rgb), 0.5) 25%, transparent 25%),
    linear-gradient(45deg, rgba(var(--primary-rgb), 0.5) 25%, transparent 25%),
    linear-gradient(315deg, rgba(var(--primary-rgb), 0.5) 25%, transparent 25%);
  background-blend-mode: multiply;
  background-position: 0 0, 50px 0, 0 50px, 50px 50px;
  opacity: 0.2;
  z-index: -1;
} */

/* Pricing Cards */
.pricing {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.card {
  background-color: var(--surface);
  border-color: var(--on-surface-variant);

}

/* Feature Explainer */
.features {
  padding: 20px;
  background-color: #f9f9f9;
}

.transparent-header {
  background-color: transparent !important;
}

.transition-background {
  transition: background-color 0.3s ease;
}
</style>









