<template>
  <div class="relative overflow-x-hidden min-h-screen">
    <!-- Hero Section (no parallax component, works with WebGL background from App.vue) -->
    <section class="relative h-[90vh] flex items-center justify-center">
      <div class="hero-overlay">
        <div class="relative z-10 pt-20 flex flex-col items-center justify-center text-white text-center max-w-4xl mx-auto px-4">
          <div class="lg:text-6xl text-4xl font-bold mb-4 text-white">
            The AI for Product
          </div>
          <div class="md:text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Empower your team to build the best products for your customers
          </div>
          <div class="md:text-lg lg:text-2xl typing mb-8 text-warning font-semibold border-r-2 border-warning">> {{ currentPhrase }}</div>
          <div class="space-y-4">
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <router-link to="/signup" class="inline-block bg-warning md:text-lg lg:text-xl text-white px-8 py-3 rounded-full hover:bg-primary-darken-1 transition-colors shadow-lg">
                Get Started Free <v-icon>mdi-rocket-launch</v-icon>
              </router-link>
              <a href="https://canonical-prod.web.app/document/7Smjq3YGDK2YW2ULrbMv?v=1.0.0" target="_blank" rel="noopener noreferrer" class="inline-block border-2 border-white text-white md:text-lg lg:text-xl px-8 py-3 rounded-full hover:bg-white hover:text-surface transition-colors shadow-lg">
                Try Demo
              </a>
            </div>
            <div class="text-white/60 text-sm">No credit card required • 5-minute setup</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="surface-glass text-white/80 relative z-20 border-0 border-on-surface-variant">
      
      <!-- Problem Statement Section -->
      <section class="py-20 px-6">
        <div class="container mx-auto max-w-4xl text-center">
          <h2 class="text-3xl lg:text-4xl font-bold mb-8 text-white">
            Product Work is Chaotic
          </h2>
          
          <div class="grid md:grid-cols-2 gap-8 justify-center">
            <div class="space-y-4 text-center">
              <h3 class="text-xl font-semibold text-error">Challenges</h3>
              <ul class="space-y-2 text-left">
                <li>❌ Stakeholders out of sync</li>
                <li>❌ Developers building wrong features</li>
                <li>❌ Strategy gets lost in translation</li>
                <li>❌ Context switching between tools</li>
                <li>❌ "Final_v2_FINAL.doc" chaos</li>
              </ul>
            </div>
            <div class="space-y-4 text-center">
              <h3 class="text-xl font-semibold text-success">Happy state</h3>
              <ul class="space-y-2 text-left">
                <li>✅ Clear, organized product artifacts</li>
                <li>✅ Aligned stakeholders & team</li>
                <li>✅ Developers building right features</li>
                <li>✅ Strategy that translates to execution</li>
                <li>✅ Writing culture that drives results</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Solution Overview Section -->
      <section class="py-12 px-6 surface-glass-dark">
        <div class="container mx-auto max-w-7xl">
          <div class="grid lg:grid-cols-5 gap-12 items-center">
            <!-- Left Column - Text Content -->
            <div class="text-left lg:col-span-2">
              <h2 class="text-3xl lg:text-4xl font-bold mb-8 text-white">
                Meet Canonical: Where Product Strategy Meets Execution
              </h2>
              <p class="text-xl mb-8 text-white/70">
                Organize your product artifacts to keep stakeholders coordinated, developers building the right thing, 
                and product strategy on track. Built on best practices from product thought leaders.
              </p>
              <v-btn color="warning" @click="openDemo">
                Try it now 
              </v-btn>
            </div>
            
            <!-- Right Column - Image -->
            <div class="lg:col-span-3 flex justify-center lg:justify-start">
              <img src="/productShowcase/editor.png" alt="Canonical Editor Interface" class="w-full max-w-4xl rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <!-- Key Features Section -->
      <section id="features" class="py-20 px-6">
        <div class="container mx-auto max-w-6xl">
          <h2 class="text-3xl lg:text-4xl font-bold mb-16 text-center text-white">
            Features That Transform How You Build Products
          </h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <!-- Feature 1: Organized Artifacts -->
            <div class="surface-glass-subtle rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div class="text-warning text-3xl mb-4">📋</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Organized Product Artifacts</h3>
              <p class="text-white/70 mb-4">Create and organize PRDs, user stories, specs, and roadmaps in one place. Keep your product strategy clear and accessible.</p>
              <ul class="text-sm space-y-1 text-white/60 text-left">
                <li>• Unified artifact management</li>
                <li>• Clear information hierarchy</li>
                <li>• Easy search and discovery</li>
                <li>• Template-driven creation</li>
              </ul>
            </div>

            <!-- Feature 2: Stakeholder Alignment -->
            <div class="surface-glass-subtle rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div class="text-warning text-3xl mb-4">👥</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Stakeholder Alignment</h3>
              <p class="text-white/70 mb-4">Keep everyone on the same page with clear communication tools and shared visibility into product decisions.</p>
              <ul class="text-sm space-y-1 text-white/60 text-left">
                <li>• Shared product visibility</li>
                <li>• Comment and feedback loops</li>
                <li>• Decision documentation</li>
                <li>• Progress tracking</li>
              </ul>
            </div>

            <!-- Feature 3: Writing Culture -->
            <div class="surface-glass-subtle rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div class="text-warning text-3xl mb-4">✍️</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Enable Writing Culture</h3>
              <p class="text-white/70 mb-4">Foster clear thinking through structured writing. Document decisions, rationale, and strategy that guides development.</p>
              <ul class="text-sm space-y-1 text-white/60 text-left">
                <li>• Structured thinking frameworks</li>
                <li>• Decision documentation</li>
                <li>• Strategy articulation</li>
                <li>• Knowledge preservation</li>
              </ul>
            </div>

            <!-- Feature 4: Template Library -->
            <div class="surface-glass-subtle rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div class="text-warning text-3xl mb-4">📚</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Best Practice Templates</h3>
              <p class="text-white/70 mb-4">Built on frameworks from product thought leaders like Marty Cagan, Melissa Perri, and Rob Fitzpatrick. Start with proven structures.</p>
              <ul class="text-sm space-y-1 text-white/60 text-left">
                <li>• Thought leader frameworks</li>
                <li>• PRD and spec templates</li>
                <li>• Custom team standards</li>
                <li>• Proven methodologies</li>
              </ul>
            </div>

            <!-- Feature 5: AI-Powered Insights -->
            <div class="surface-glass-subtle rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div class="text-warning text-3xl mb-4">🤖</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Product-Focused AI</h3>
              <p class="text-white/70 mb-4">Specialized AI trained on product management best practices to help you create better artifacts and make better decisions.</p>
              <ul class="text-sm space-y-1 text-white/60 text-left">
                <li>• Product management insights</li>
                <li>• Content improvement suggestions</li>
                <li>• Strategy guidance</li>
                <li>• Best practice recommendations</li>
              </ul>
            </div>

            <!-- Feature 6: Integration Ecosystem -->
            <div class="surface-glass-subtle rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div class="text-warning text-3xl mb-4">⚡</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Seamless Team Workflows</h3>
              <p class="text-white/70 mb-4">Connect with your existing tools to reduce context switching and keep your team focused on building great products.</p>
              <ul class="text-sm space-y-1 text-white/60 text-left">
                <li>• Design tool sync</li>
                <li>• Development integration</li>
                <li>• Communication channels</li>
                <li>• Workflow automation</li>
              </ul>
            </div>

          </div>
        </div>
      </section>


      <!-- Social Proof Section -->
      <section class="py-20 px-6 surface-glass-dark">
        <div class="container mx-auto max-w-4xl text-center">
          <h2 class="text-3xl lg:text-4xl font-bold mb-12 text-white">
            Built by Product People, For Product People
          </h2>
          
          <div class="surface-glass p-8 rounded-lg mb-12">
            <div class="flex items-center justify-center mb-4">
              <img src="/canonical-logo.svg" alt="Canonical" class="w-12 h-12 mr-4" />
              <div class="text-left">
                <p class="text-white font-semibold">John Azzinaro</p>
                <p class="text-white/70 text-sm">Ex-AWS Technical Product Manager • 5+ years PM experience</p>
              </div>
            </div>
            <blockquote class="text-lg italic text-white/70">
              "Having been both an engineer and a product manager, I've seen how organized thinking and clear artifacts transform product outcomes. Canonical brings that discipline to product work."
            </blockquote>
          </div>

          <div class="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div class="text-3xl font-bold text-warning">Product-First</div>
              <div class="text-white/70">Built for PM Workflows</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-warning">Best Practices</div>
              <div class="text-white/70">Thought Leader Inspired</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-warning">Open Source</div>
              <div class="text-white/70">Built for everyone</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 px-6">
        <div class="container mx-auto max-w-4xl text-center">
          <h2 class="text-3xl lg:text-4xl font-bold mb-8 text-white">
            Ready to Build Better Products?
          </h2>
          <p class="text-xl mb-12 text-white/70 max-w-2xl mx-auto">
            Join the beta and transform how your team creates, organizes, and collaborates on product artifacts. 
            No credit card required, 5-minute setup.
          </p>
          
          <div class="space-y-6">
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <router-link to="/signup" class="inline-block bg-warning text-white px-8 py-4 rounded-full hover:bg-primary-darken-1 transition-colors text-xl shadow-lg">
                Transform Your Product Work 🚀
              </router-link>
              <a href="https://canonical-prod.web.app/document/7Smjq3YGDK2YW2ULrbMv?v=1.0.0" target="_blank" rel="noopener noreferrer" class="inline-block border-2 border-white/70 text-white/70 px-8 py-4 rounded-full hover:bg-white/70 hover:text-surface transition-colors text-xl shadow-lg">
                Try Demo First
              </a>
            </div>
            
            <div class="flex justify-center space-x-8 text-sm text-white/70">
              <div class="flex items-center">
                <span class="text-success mr-2">✓</span>
                No Credit Card
              </div>
              <div class="flex items-center">
                <span class="text-success mr-2">✓</span>
                5-Min Setup
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

    <div class="fixed bottom-0 left-0 right-0 flex justify-center items-center p-2 space-x-4 bg-surface/80 backdrop-blur-sm z-50">
      <a href="https://github.com/Canonical-AI/.github/blob/main/Privacy.md" target="_blank" rel="noopener noreferrer" class="text-white/70 hover:text-primary transition-colors">privacy</a>
      <a href="https://github.com/Canonical-AI/.github/blob/main/Terms.md" target="_blank" rel="noopener noreferrer" class="text-white/70 hover:text-primary transition-colors">terms</a>
      <p class="text-white/70"> &copy; 2025 Canonical-ai.com </p>
      <a href="mailto:team@canonic-ai.com" class="text-white/70 hover:text-primary transition-colors">team@canonic-ai.com</a>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const phrases = ref([
  'Organize Product Artifacts.',
  'Align Your Stakeholders.',
  'Build The Right Thing.',
  'Enable Writing Culture.',
  'Transform Product Work.',
]);

const currentPhrase = ref('');
let i = 0;
let isDeleting = false;
let typingSpeed = 120;
let deletingSpeed = 48;
let pauseDuration = 1080;

const typePhrase = () => {
  const fullText = phrases.value[i];
  if (!isDeleting) {
    currentPhrase.value = fullText.substring(0, currentPhrase.value.length + 1);
    if (currentPhrase.value === fullText) {
      setTimeout(() => {
        isDeleting = true;
        typePhrase();
      }, pauseDuration);
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

const openDemo = () => {
  if (typeof window !== 'undefined') {
    window.open('https://canonical-prod.web.app', '_blank');
  }
};

onMounted(() => {
  typePhrase();
});
</script>

<style scoped>
/* Minimal custom styles - most moved to Tailwind classes */
html {
  scroll-behavior: smooth;
}

section {
  scroll-margin-top: 80px;
}
</style> 