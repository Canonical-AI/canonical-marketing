<template>
  <div class="app-root">
    <!-- Hero Section (no parallax component, works with WebGL background from App.vue) -->
    <section class="hero-section">
      <div class="hero-overlay">
        <div class="hero-content">
          <div class="md:text-2xl lg:text-6xl font-bold mb-4 text-white">
            Engineering Discipline for Product Work
          </div>
          <div class="md:text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Bring commits, versioning, and collaboration to product artifacts. 
            Built by product people, for product people.
          </div>
          <div class="md:text-lg lg:text-2xl typing mb-8 text-warning">> {{ currentPhrase }}</div>
          <div class="space-y-4">
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <router-link to="/signup" class="inline-block bg-warning md:text-lg lg:text-xl text-white px-8 py-3 rounded-full hover:bg-primary-darken-1 transition-colors shadow-lg">
                Get Started Free 🚀
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
    <div class="main-content bg-surface text-on-surface-variant">
      
      <!-- Problem Statement Section -->
      <section class="py-20 px-6">
        <div class="container mx-auto max-w-4xl text-center">
          <h2 class="text-3xl lg:text-4xl font-bold mb-8 text-white">
            Product Work Feels Chaotic Compared to Engineering
          </h2>
          <div class="grid md:grid-cols-2 gap-8 text-left">
            <div class="space-y-4">
              <h3 class="text-xl font-semibold text-warning">Engineering Has</h3>
              <ul class="space-y-2">
                <li>✅ Version control & commits</li>
                <li>✅ Code reviews & collaboration</li>
                <li>✅ Clear change history</li>
                <li>✅ Structured workflows</li>
              </ul>
            </div>
            <div class="space-y-4">
              <h3 class="text-xl font-semibold text-error">Product Usually Has</h3>
              <ul class="space-y-2">
                <li>❌ Scattered docs & files</li>
                <li>❌ No change tracking</li>
                <li>❌ Siloed collaboration</li>
                <li>❌ "Final_v2_FINAL.doc"</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Solution Overview Section -->
      <section class="py-20 px-6 bg-surface-variant">
        <div class="container mx-auto max-w-4xl text-center">
          <h2 class="text-3xl lg:text-4xl font-bold mb-8 text-white">
            Meet Canonical: Git for Product Artifacts
          </h2>
          <p class="text-xl mb-12 text-on-surface-variant max-w-2xl mx-auto">
            Create, version, and collaborate on product artifacts with the same discipline engineers use for code. 
            PRDs, wireframes, specs, and more - all in one canonical source of truth.
          </p>
          <div class="bg-surface p-8 rounded-lg shadow-lg">
            <p class="text-lg text-warning mb-4">🚀 Currently in Beta</p>
            <p class="text-on-surface-variant">Join product teams who are already bringing engineering best practices to their workflow</p>
          </div>
        </div>
      </section>

      <!-- Key Features Section -->
      <section id="features" class="py-20 px-6">
        <div class="container mx-auto max-w-6xl">
          <h2 class="text-3xl lg:text-4xl font-bold mb-16 text-center text-white">
            Features That Transform Product Work
          </h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <!-- Feature 1: Artifact Versioning -->
            <div class="feature-card bg-surface-light p-6 rounded-lg">
              <div class="mb-4">
                <img src="https://via.placeholder.com/300x180/4A5568/FFFFFF?text=Version+Control" alt="Artifact Versioning" class="w-full h-36 object-cover rounded-lg mb-4" />
              </div>
              <div class="text-warning text-3xl mb-4">📝</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Artifact Versioning</h3>
              <p class="text-on-surface-variant mb-4">Track every change to your product documents with git-like version control. Never lose work or wonder what changed.</p>
              <ul class="text-sm space-y-1 text-on-surface-variant/80">
                <li>• Commit-based versioning</li>
                <li>• Branch and merge workflows</li>
                <li>• Change history tracking</li>
                <li>• Rollback capabilities</li>
              </ul>
            </div>

            <!-- Feature 2: Collaborative Reviews -->
            <div class="feature-card bg-surface-light p-6 rounded-lg">
              <div class="mb-4">
                <img src="https://via.placeholder.com/300x180/4A5568/FFFFFF?text=Collaboration" alt="Collaborative Reviews" class="w-full h-36 object-cover rounded-lg mb-4" />
              </div>
              <div class="text-warning text-3xl mb-4">👥</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Collaborative Reviews</h3>
              <p class="text-on-surface-variant mb-4">Review product artifacts like code with proper feedback loops, approvals, and stakeholder management.</p>
              <ul class="text-sm space-y-1 text-on-surface-variant/80">
                <li>• Pull request-style reviews</li>
                <li>• Stakeholder approvals</li>
                <li>• Comment threading</li>
                <li>• Review workflows</li>
              </ul>
            </div>

            <!-- Feature 3: Cross-Reference System -->
            <div class="feature-card bg-surface-light p-6 rounded-lg">
              <div class="mb-4">
                <img src="https://via.placeholder.com/300x180/4A5568/FFFFFF?text=Cross+Reference" alt="Smart Cross-References" class="w-full h-36 object-cover rounded-lg mb-4" />
              </div>
              <div class="text-warning text-3xl mb-4">🔗</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Smart Cross-References</h3>
              <p class="text-on-surface-variant mb-4">Link artifacts, requirements, and specifications together with intelligent dependency tracking.</p>
              <ul class="text-sm space-y-1 text-on-surface-variant/80">
                <li>• Automatic linking</li>
                <li>• Dependency graphs</li>
                <li>• Impact analysis</li>
                <li>• Reference integrity</li>
              </ul>
            </div>

            <!-- Feature 4: Template Library -->
            <div class="feature-card bg-surface-light p-6 rounded-lg">
              <div class="mb-4">
                <img src="https://via.placeholder.com/300x180/4A5568/FFFFFF?text=Templates" alt="Template Library" class="w-full h-36 object-cover rounded-lg mb-4" />
              </div>
              <div class="text-warning text-3xl mb-4">📋</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Template Library</h3>
              <p class="text-on-surface-variant mb-4">Start with proven templates for PRDs, specs, and other product artifacts. Customize to your needs.</p>
              <ul class="text-sm space-y-1 text-on-surface-variant/80">
                <li>• PRD templates</li>
                <li>• Spec frameworks</li>
                <li>• Custom templates</li>
                <li>• Team standards</li>
              </ul>
            </div>

            <!-- Feature 5: AI-Powered Insights -->
            <div class="feature-card bg-surface-light p-6 rounded-lg">
              <div class="mb-4">
                <img src="https://via.placeholder.com/300x180/4A5568/FFFFFF?text=AI+Insights" alt="AI-Powered Insights" class="w-full h-36 object-cover rounded-lg mb-4" />
              </div>
              <div class="text-warning text-3xl mb-4">🤖</div>
              <h3 class="text-xl font-semibold mb-3 text-white">AI-Powered Insights</h3>
              <p class="text-on-surface-variant mb-4">Get intelligent suggestions, consistency checks, and automated improvements to your product artifacts.</p>
              <ul class="text-sm space-y-1 text-on-surface-variant/80">
                <li>• Content suggestions</li>
                <li>• Consistency checking</li>
                <li>• Auto-formatting</li>
                <li>• Quality scoring</li>
              </ul>
            </div>

            <!-- Feature 6: Integration Ecosystem -->
            <div class="feature-card bg-surface-light p-6 rounded-lg">
              <div class="mb-4">
                <img src="https://via.placeholder.com/300x180/4A5568/FFFFFF?text=Integrations" alt="Tool Integration" class="w-full h-36 object-cover rounded-lg mb-4" />
              </div>
              <div class="text-warning text-3xl mb-4">⚡</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Tool Integration</h3>
              <p class="text-on-surface-variant mb-4">Connect with your existing tools like Figma, Jira, and Slack for seamless workflow integration.</p>
              <ul class="text-sm space-y-1 text-on-surface-variant/80">
                <li>• Figma sync</li>
                <li>• Jira integration</li>
                <li>• Slack notifications</li>
                <li>• API connections</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <!-- Trusted By Section -->
      <section class="py-16 px-6 bg-surface-light">
        <div class="container mx-auto max-w-4xl text-center">
          <h3 class="text-lg font-semibold mb-8 text-on-surface-variant">
            Trusted by builders at:
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-60">
            <div class="company-logo bg-surface p-4 rounded-lg w-24 h-16 flex items-center justify-center">
              <span class="text-on-surface-variant font-semibold text-sm">ACME Inc</span>
            </div>
            <div class="company-logo bg-surface p-4 rounded-lg w-24 h-16 flex items-center justify-center">
              <span class="text-on-surface-variant font-semibold text-sm">TechCorp</span>
            </div>
            <div class="company-logo bg-surface p-4 rounded-lg w-24 h-16 flex items-center justify-center">
              <span class="text-on-surface-variant font-semibold text-sm">BuildCo</span>
            </div>
            <div class="company-logo bg-surface p-4 rounded-lg w-24 h-16 flex items-center justify-center">
              <span class="text-on-surface-variant font-semibold text-sm">StartupX</span>
            </div>
            <div class="company-logo bg-surface p-4 rounded-lg w-24 h-16 flex items-center justify-center">
              <span class="text-on-surface-variant font-semibold text-sm">InnovateLab</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Social Proof Section -->
      <section class="py-20 px-6 bg-surface-variant">
        <div class="container mx-auto max-w-4xl text-center">
          <h2 class="text-3xl lg:text-4xl font-bold mb-12 text-white">
            Built by Product People, For Product People
          </h2>
          
          <div class="bg-surface p-8 rounded-lg mb-12">
            <div class="flex items-center justify-center mb-4">
              <img src="/canonical-logo.svg" alt="Canonical" class="w-12 h-12 mr-4" />
              <div class="text-left">
                <p class="text-white font-semibold">John Azzinaro</p>
                <p class="text-on-surface-variant text-sm">Ex-AWS Technical Product Manager • 5+ years PM experience</p>
              </div>
            </div>
            <blockquote class="text-lg italic text-on-surface-variant">
              "I've been coding for over a decade and wanted to build a tool that makes it easier for product people to work with the same discipline engineers bring to their craft."
            </blockquote>
          </div>

          <div class="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div class="text-3xl font-bold text-warning">Beta</div>
              <div class="text-on-surface-variant">Early Access</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-warning">Open Source</div>
              <div class="text-on-surface-variant">Transparent Development</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-warning">Product-First</div>
              <div class="text-on-surface-variant">Built for Your Workflow</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 px-6">
        <div class="container mx-auto max-w-4xl text-center">
          <h2 class="text-3xl lg:text-4xl font-bold mb-8 text-white">
            Ready to Bring Order to Product Chaos?
          </h2>
          <p class="text-xl mb-12 text-on-surface-variant max-w-2xl mx-auto">
            Join the beta and experience what product work looks like with engineering discipline. 
            No credit card required, 5-minute setup.
          </p>
          
          <div class="space-y-6">
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <router-link to="/signup" class="inline-block bg-warning text-white px-8 py-4 rounded-full hover:bg-primary-darken-1 transition-colors text-xl shadow-lg">
                Start Creating Artifacts 🚀
              </router-link>
              <a href="https://canonical-prod.web.app/document/7Smjq3YGDK2YW2ULrbMv?v=1.0.0" target="_blank" rel="noopener noreferrer" class="inline-block border-2 border-on-surface-variant text-on-surface-variant px-8 py-4 rounded-full hover:bg-on-surface-variant hover:text-surface transition-colors text-xl shadow-lg">
                Try Demo First
              </a>
            </div>
            
            <div class="flex justify-center space-x-8 text-sm text-on-surface-variant">
              <div class="flex items-center">
                <span class="text-success mr-2">✓</span>
                Free Beta Access
              </div>
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

    <div class="hero-footer fixed bottom-0 left-0 right-0 flex justify-center items-center p-2 space-x-4 bg-surface/80 backdrop-blur-sm">
      <a href="https://github.com/Canonical-AI/.github/blob/main/Privacy.md" target="_blank" rel="noopener noreferrer" class="text-on-surface-variant hover:text-primary transition-colors">privacy</a>
      <a href="https://github.com/Canonical-AI/.github/blob/main/Terms.md" target="_blank" rel="noopener noreferrer" class="text-on-surface-variant hover:text-primary transition-colors">terms</a>
      <p class="text-on-surface-variant"> &copy; 2025 Canonical-ai.com </p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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

onMounted(() => {
  typePhrase();
});
</script>

<style scoped>
.app-root {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
}

/* Hero Section - works with WebGL background from App.vue */
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  padding: 5rem 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  max-width: 4xl;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .hero-content {
    padding: 8rem 1rem 0;
  }
}

/* Main Content */
.main-content {
  position: relative;
  z-index: 2;
}

/* Typing Animation */
.typing {
  position: relative;
  z-index: 1;
  border-right: .1em solid #FFC107;
  white-space: nowrap;
  overflow: hidden;
  animation: blink-caret .75s step-end infinite;
  font-weight: 600;
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #FFC107; }
}

/* Feature Cards */
.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Hero footer adjustments */
.hero-footer {
  z-index: 60;
}

/* Section spacing */
section {
  scroll-margin-top: 80px;
}
</style> 