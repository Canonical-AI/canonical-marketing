<template>
  <div class="p-8 px-6 md:px-24 surface-glass z-50 rounded-2xl">
    <h1 class="text-left text-2xl mb-5 font-light text-white">Frequently Asked Questions</h1>
    <div v-for="(faq, index) in faqs" :key="index" class="text-left mb-5 pb-4 border-b border-white/10 last:border-b-0">
      <h2 class="text-lg mb-2.5 font-semibold text-white">{{ faq.question }}</h2>
      <p class="text-base text-white/80">{{ faq.answer }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const faqs = ref([
  { 
    question: 'What is Canonical?', 
    answer: 'Canonical is a platform for artifact creation, curation, and collaboration. Designed for product people by a product person. Why should devs get all the cool tools? My vision is to blur the lines between engineering and product work and enable more people to build great products.' 
  },
  { 
    question: 'Who Built Canonical?', 
    answer: 'My name is John Azzinaro, Ex-AWS Technical Product Manager, with over five years of product management experience, and 10 years working in engineering.' 
  },
  { 
    question: 'Why Did you build it?', 
    answer: 'I\'ve been coding for over a decade, and I wanted to build a tool that would make it easier for the people doing all the "soft stuff" to do their jobs like engineers do. In engineering we have concepts like commits, versioning, referencing and reviewing. This is the first step in that direction.' 
  },
  { 
    question: 'What\'s next?', 
    answer: 'Visit Github to see the public roadmap, or visit the demo site to see all of the product artifacts for Canonical live!' 
  },
]);
</script>

<style scoped>
/* No custom styles needed - using Tailwind and shared classes */
</style>
