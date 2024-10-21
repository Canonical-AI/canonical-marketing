<template>
  <div>
    <!-- App Bar -->
    <div class="app-bar">
      <a href="#home">Home</a>
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#contact">Contact</a>
    </div>

    <!-- Hero Section -->
    <div class="hero">
      <div class="typing">{{ currentPhrase }}</div>
    </div>

    <!-- Static Paragraph -->
    <p style="text-align: center; padding: 20px;">
        For <strong>product teams</strong>, who need to **organize their product artifacts**  to keep stakeholders coordinated, developers building the right thing, and product on track. Canonical, enables **seemless artifact creation**, **curation** and **collaboration.** *Unlike* Jira, or Microsoft Office, *Canonical* is specifically tailored to product team built off the best thought leaders practices and bootstrapped by hundreds of product manager, *canonical* leverages specialised trained AI models that unlock product management productivity

    </p>

    <!-- Pricing Cards -->
    <div class="pricing">
      <div class="card" v-for="(plan, index) in plans" :key="index">
        <h3>{{ plan.name }}</h3>
        <p>{{ plan.price }}</p>
      </div>
    </div>

    <!-- Feature Explainer -->
    <div class="features">
      <h2>Features</h2>
      <p>Our product includes a variety of features designed to help you succeed.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const phrases = ref([
  'Build your artifacts...',
  'Craft your product canon...',
  'Unbound your development...',
  'Embrace your #founder-mode...',
  'Co-pilot for product peeps...',
]);

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
  { name: 'Basic Plan', price: '$10/month' },
  { name: 'Standard Plan', price: '$20/month' },
  { name: 'Premium Plan', price: '$30/month' }
]);
</script>

<style scoped>
/* App Bar Styles */
.app-bar {
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-around;
}

/* Hero Section Styles */
.hero {
  height: 300px;
  background: linear-gradient(45deg, #ff6b6b, #f06595, #6a4c93);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2em;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Typing Animation */
.typing {
  border-right: .1em solid white;
  white-space: nowrap;
  overflow: hidden;
  animation: blink-caret .75s step-end infinite;
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
  border: 1px solid #ccc;
  padding: 20px;
  width: 30%;
  text-align: center;
}

/* Feature Explainer */
.features {
  padding: 20px;
  background-color: #f9f9f9;
}
</style>
