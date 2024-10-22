<template>
  <div class="p-0 m-0 app-root">
    <!-- App Bar -->

    <header class="sticky top-0 bg-surface bg-opacity-40 backdrop-blur-sm shadow-sm z-10">
      <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
        
        <div class="text-2xl font-bold text-on-surface-variant flex items-center space-x-2"> 
          <img src="/favicon.ico" alt="Canonical" class="logo w-10 h-10" />
          Canonical
        </div>
        <div class="space-x-4">
          <a href="#pricing" class="text-on-surface-variant hover:text-primary transition-colors">Pricing</a>
          <a href="#features" class="text-on-surface-variant hover:text-primary transition-colors">Features</a>
          <a href="#contact" class="text-on-surface-variant hover:text-primary transition-colors">About</a>
          <a href="#cta" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Get Started</a>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    
    <div class="hero">
      <div class="hero-gradient"></div>
      <div class="gradient-blob-1"></div>
      <div class="gradient-blob-2"></div>
      <div class="gradient-blob-3"></div>
      <div class="gradient-blob-4"></div>
      <div class="hero-content">
        <div class="typing">>{{ currentPhrase }}</div>
        <button href="#cta" class="mx-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-darken-1 transition-colors">Launch</button>
      </div>
    </div>

    <!-- Static Paragraph -->
    <section id="overview">
      <p style="text-align: center; padding: 20px;">
          For <strong>product teams</strong>, who need to **organize their product artifacts**  to keep stakeholders coordinated, developers building the right thing, and product on track. Canonical, enables **seemless artifact creation**, **curation** and **collaboration.** *Unlike* Jira, or Microsoft Office, *Canonical* is specifically tailored to product team built off the best thought leaders practices and bootstrapped by hundreds of product manager, *canonical* leverages specialised trained AI models that unlock product management productivity

      </p>
    </section>

    <!-- Pricing Cards -->
    <section id="pricing">
      <div class="pricing">
        <div class="card border border-gray-300 p-5 w-1/3 text-center m-1 rounded-lg z-10" v-for="(plan, index) in plans" :key="index">
          <h2 class="text-2xl font-bold">{{ plan.name }}</h2>
          <h3 class="text-lg font-semibold">{{ plan.price }}</h3>
          <h4 class="font-semibold text-left">Includes</h4>
          <ul class="list-disc list-inside text-left">
            <li v-for="feature in plan.includes" :key="feature">{{ feature }}</li>
          </ul>
          <button class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-darken-1 transition-colors">Get Started</button>
        </div>
      </div>
    </section>


    <!-- Feature Explainer -->
    <section id="features" class="bg-white py-16">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="text-center p-6 rounded-lg transition-all duration-300 hover:shadow-md">
            <svg class="h-12 w-12 text-blue-500 mx-auto mb-4" viewBox="0 0 24 24">
            <path :d="feature.icon" />
          </svg>
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>


        <!-- Call to Action Section -->
        <section id="cta" class="bg-success text-white py-16">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-xl mb-8">Join thousands of satisfied customers and transform your business today.</p>
        <a href="#" class="bg-white text-blue-500 px-8 py-3 rounded-md text-lg hover:bg-gray-100 transition-colors inline-flex items-center">
          Start Your Free Trial
          <svg class="ml-2 h-5 w-5" viewBox="0 0 24 24">
            <path :d="mdiArrowRight" />
          </svg>
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-6 text-center">
        <p>&copy; 2077 Canonical. All rights reserved.</p>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { mdiArrowRight, mdiChartBar, mdiClockOutline, mdiAccountGroup } from '@mdi/js';


const phrases = ref([
  'Build your artifacts...',
  'Craft your product canon...',
  'Unbound your development...',
  'Embrace your #founder-mode...',
  'Co-pilot for product peeps...',
]);

const features = ref([
  {
    icon: mdiChartBar,
    title: 'Advanced Analytics',
    description: 'Gain valuable insights with our powerful analytics tools.'
  },
  {
    icon: mdiClockOutline,
    title: 'Time-Saving Automation',
    description: 'Automate repetitive tasks and focus on what matters most.'
  },
  {
    icon: mdiAccountGroup,
    title: 'Team Collaboration',
    description: 'Seamlessly work together with your team in real-time.'
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
     opacity: 0.04; /* Adjust opacity as needed */
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
  height: 300px;
  color: white;
  height: 90vh;
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

/* Pricing Cards */
.pricing {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.card {
  background-color: var(--background);
  filter: invert(1);
}

/* Feature Explainer */
.features {
  padding: 20px;
  background-color: #f9f9f9;
}
</style>

