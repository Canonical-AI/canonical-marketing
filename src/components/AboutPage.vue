<template>
  <div class="app-root min-h-screen text-white p-4 pb-8 pt-8" style="position: relative; z-index: 10;">
    <div class="max-w-6xl mx-auto px-6 surface">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-white mb-4">About Canonical</h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Frequently asked questions about the platform and our mission
        </p>
      </div>

      <div class="mb-4">
        <div class="max-w-4xl mx-auto">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class=" border-t border-white/10 overflow-hidden transition-all duration-300 cursor-pointer mb-4 hover:bg-white/8 hover:border-white/20"
            @click="toggleFAQ(index)"
          >
            <div class="p-2 flex justify-between">
              <h3 class="text-lg font-semibold text-white flex-1 text-left">{{ faq.question }}</h3>
              <div class="text-2xl text-amber-400 font-bold ml-4 transition-transform duration-300 text-right">
                {{ openFAQ === index ? '−' : '+' }}
              </div>
            </div>
            <div 
              v-if="openFAQ === index" 
              class="px-6 pb-6 text-gray-300 leading-relaxed animate-slideDown text-left"
              v-html="faq.answer"
            ></div>
          </div>
        </div>
      </div>

      <div class="text-center py-8">
        <h2 class="text-3xl font-bold text-white mb-8">Connect with Us</h2>
        <div class="flex justify-center gap-8 flex-wrap">
          <a 
            href="https://github.com/Canonical-AI" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 hover:text-amber-400"
            aria-label="GitHub"
          >
            <span class="text-2xl">🐙</span>
            <span>GitHub</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/john-azzinaro-6a1a6b59/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 hover:text-amber-400"
            aria-label="LinkedIn"
          >
            <span class="text-2xl">💼</span>
            <span>LinkedIn</span>
          </a>
          <a 
            href="mailto:team@canonic-ai.com" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-8 py-4  rounded-full text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 hover:text-amber-400"
            aria-label="Email"
          >
            <span class="text-2xl">📧</span>
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const openFAQ = ref(null);

const faqs = ref([
  {
    question: "What is Canonical?",
    answer: `
      <p class="mb-4">Canonical is a platform that brings software engineering discipline to product work. We provide version control, collaboration tools, and structured workflows for product artifacts like PRDs, specifications, wireframes, and other product documentation.</p>
      <p>Think of it as "Git for Product Teams" - bringing the same collaborative and versioning capabilities that engineers use for code to product managers and their artifacts.</p>
    `
  },
  {
    question: "Who built Canonical?",
    answer: `
      <p class="mb-4">Canonical was built by <strong class="text-amber-400">John Azzinaro</strong>, a former AWS Technical Product Manager with over 5 years of product management experience and more than a decade of software development background.</p>
      <p>Having worked on both sides - engineering and product - John experienced firsthand the chaos that product teams face compared to the structured workflows that engineering teams enjoy. Canonical was born from this frustration and the desire to bring engineering best practices to product work.</p>
    `
  },
  {
    question: "Why was Canonical built?",
    answer: `
      <p class="mb-4">Product teams often struggle with:</p>
      <ul class="my-4 space-y-2">
        <li class="flex items-start">
          <span class="text-amber-400 mr-2">•</span>
          <span>Scattered documents across multiple tools</span>
        </li>
        <li class="flex items-start">
          <span class="text-amber-400 mr-2">•</span>
          <span>No clear version history or change tracking</span>
        </li>
        <li class="flex items-start">
          <span class="text-amber-400 mr-2">•</span>
          <span>Difficulty collaborating on product artifacts</span>
        </li>
        <li class="flex items-start">
          <span class="text-amber-400 mr-2">•</span>
          <span>Lack of structured review processes</span>
        </li>
        <li class="flex items-start">
          <span class="text-amber-400 mr-2">•</span>
          <span>"Final_v2_FINAL.doc" syndrome</span>
        </li>
      </ul>
      <p>Meanwhile, engineering teams have solved these problems with git, pull requests, code reviews, and structured workflows. Canonical bridges this gap by bringing engineering discipline to product work.</p>
    `
  },
  {
    question: "What's next for Canonical?",
    answer: `
      <p class="mb-4">We're currently in <strong class="text-amber-400">Beta</strong> and actively working on:</p>
      <ul class="my-4 space-y-2">
        <li class="flex items-start">
          <span class="text-amber-400 mr-2">•</span>
          <span>Enhanced collaboration features</span>
        </li>
        <li class="flex items-start">
          <span class="text-amber-400 mr-2">•</span>
          <span>AI-powered content suggestions and consistency checking</span>
        </li>
        <li class="flex items-start">
          <span class="text-amber-400 mr-2">•</span>
          <span>Integrations with popular tools like Figma, Jira, and Slack</span>
        </li>
        <li class="flex items-start">
          <span class="text-amber-400 mr-2">•</span>
          <span>Advanced template library and customization options</span>
        </li>
        <li class="flex items-start">
          <span class="text-amber-400 mr-2">•</span>
          <span>Team management and workflow automation</span>
        </li>
      </ul>
      <p>Our goal is to become the canonical source of truth for all product artifacts, making product work as disciplined and collaborative as engineering work.</p>
    `
  }
]);

const toggleFAQ = (index) => {
  openFAQ.value = openFAQ.value === index ? null : index;
};
</script>

<style scoped>


.surface {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}

.animate-slideDown {
  animation: slideDown 0.3s ease;
}

@media (max-width: 768px) {
  .text-5xl {
    font-size: 2rem;
  }
  
  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .p-6 {
    padding: 1rem;
  }
  
  .text-lg {
    font-size: 1rem;
  }
  
  .gap-8 {
    gap: 1rem;
  }
  
  .flex {
    flex-direction: column;
    align-items: center;
  }
  
  .px-8 {
    min-width: 200px;
    justify-content: center;
  }
}
</style> 