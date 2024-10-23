<template>
    <div class="faq p-8 px-24 bg-surface z-50">
      <h1 class="text-left text-2xl mb-5 font-light">Frequently Asked Questions</h1>
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item text-left mb-5">
        <h2 class="text-lg mb-2.5 font-semibold">{{ faq.question }}</h2>
        <p class="text-md">{{ faq.answer }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const faqs = ref([

    { question: 'What is Canonical?', answer: 'Canonical is a platform for artifact creation, curation, and collaboration. Designed for product people by a proudct person. Why should devs get all the cool tools?. My vision is to blur the lines between engineering and product work and enable more people to build great products.' },
    { question: 'Who Built Canonical?', answer: 'My name is John Azzinaro, Ex-AWS Technical Product Manager, with over five years of product management experience, and 10 years working in engineering.' },
    { question: 'Why Did you build it?', answer: 'Ive been coding for over a decade, and I wanted to build a tool that would make it easier for the people doing all the "soft stuff" to do their jobs like engineers do. in engineering we have concepts like commits, versioning, referencing and reviewing. This is the first step in that direction.' },
    { question: 'Whats next?', answer: 'Visit Github to see the public roadmap, or visit the demo site to see all of the product artifacts for Canonical live!' },
    // Add more FAQs as needed
  ]);
  </script>
  
  <style scoped>

  </style>
