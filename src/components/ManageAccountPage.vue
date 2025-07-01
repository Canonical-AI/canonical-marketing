<template>
  <div class="min-h-[calc(100vh-64px)] p-4 bg-transparent">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col lg:flex-row gap-8 items-start">
        <!-- Main Dashboard Content (3/4 width) -->
        <div class="flex-1 min-w-0">
          <!-- Loading State -->
          <div v-if="loading" class="text-center py-16 text-white">
            <div class="w-12 h-12 border-3 border-white/30 border-t-warning rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading your account information...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-16 text-white">
            <div class="error-alert">{{ error }}</div>
            <button @click="retryLoad" class="bg-warning text-white px-6 py-3 rounded-lg hover:bg-warning/80 transition-colors font-medium">Try Again</button>
          </div>

          <!-- Account Information -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- User Profile Card -->
            <div class="surface-glass rounded-2xl p-6 text-white">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold">Profile</h2>
              </div>
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-full border-2 border-white/20 bg-warning flex items-center justify-center text-2xl font-semibold text-white">
                    {{ getInitial(user?.email) }}
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-medium">{{ user?.displayName || 'User' }}</h3>
                    <p class="text-white/70">{{ user?.email }}</p>
                    <p class="text-white/50 text-sm">Joined {{ formatDate(user?.metadata?.creationTime) }}</p>
                  </div>
                </div>
                <div class="pt-4">
                  <button @click="signOut" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">Sign Out</button>
                </div>
              </div>
            </div>

            <!-- Current Plan Card -->
            <div class="surface-glass rounded-2xl p-6 text-white">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold">Current Plan</h2>
              </div>
              <div class="space-y-6">
                <div class="space-y-4">
                  <div class="bg-warning text-white px-4 py-2 rounded-lg font-semibold inline-block">{{ currentPlan.name }}</div>
                  <p class="text-2xl font-bold">${{ currentPlan.price }}<span class="text-base text-white/70 font-normal">/month</span></p>
                  <ul class="space-y-2">
                    <li v-for="feature in currentPlan.features" :key="feature" class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                      {{ feature }}
                    </li>
                  </ul>
                </div>
                <div class="pt-4">
                  <button @click="upgradePlan" class="w-full bg-warning text-white px-6 py-3 rounded-lg hover:bg-warning/80 transition-colors font-medium">Upgrade Plan</button>
                </div>
              </div>
            </div>

            <!-- Projects Card -->
            <div class="surface-glass rounded-2xl p-6 text-white">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold">Projects</h2>
                <span class="text-white/70 text-sm">{{ projects.length }} of {{ currentPlan.maxProjects }}</span>
              </div>
              <div class="space-y-4">
                <div v-if="projects.length === 0" class="text-center py-8">
                  <svg class="w-12 h-12 text-white/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p class="text-white/70 mb-4">No projects yet</p>
                  <button @click="createProject" class="bg-warning text-white px-6 py-3 rounded-lg hover:bg-warning/80 transition-colors font-medium">Create Your First Project</button>
                </div>
                <div v-else class="space-y-4">
                  <div v-for="project in projects" :key="project.id" class="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                    <div class="flex-1">
                      <h4 class="font-medium">{{ project.name }}</h4>
                      <p class="text-white/70 text-sm">Created {{ formatDate(project.createdAt) }}</p>
                    </div>
                    <div>
                      <button @click="openProject(project.id)" class="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors font-medium">Open</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Usage Card -->
            <div class="surface-glass rounded-2xl p-6 text-white">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold">Usage This Month</h2>
              </div>
              <div class="grid grid-cols-1 gap-6">
                <div class="text-center">
                  <div class="text-white/70 text-sm mb-2">Documents Created</div>
                  <div class="text-2xl font-bold mb-1">{{ usage.documentsCreated }}</div>
                  <div class="text-white/50 text-xs">of {{ currentPlan.limits.documents }}</div>
                </div>
                <div class="text-center">
                  <div class="text-white/70 text-sm mb-2">AI Generations</div>
                  <div class="text-2xl font-bold mb-1">{{ usage.aiGenerations }}</div>
                  <div class="text-white/50 text-xs">of {{ currentPlan.limits.aiGenerations }}</div>
                </div>
                <div class="text-center">
                  <div class="text-white/70 text-sm mb-2">Storage Used</div>
                  <div class="text-2xl font-bold mb-1">{{ formatBytes(usage.storageUsed) }}</div>
                  <div class="text-white/50 text-xs">of {{ formatBytes(currentPlan.limits.storage) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Menu (1/4 width) -->
        <div class="w-full lg:w-80 lg:sticky lg:top-8">
          <v-btn 
            color="warning" 
            class="mb-4 w-full"
            @click="launchApp"
            :loading="launchAppLoading"
            block
          > 
            Launch App
          </v-btn>
          <div class="surface-glass rounded-2xl p-6 mb-6">
            <h3 class="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <nav class="space-y-2">
              <button @click="createProject" class="btn-nav w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                New Project
              </button>
              <button @click="upgradePlan" class="btn-nav w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                Upgrade Plan
              </button>
              <a href="#" @click.prevent class="btn-nav w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                View Billing
              </a>
              <a href="#" @click.prevent class="btn-nav w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Account Settings
              </a>
            </nav>
          </div>

          <div class="surface-glass rounded-2xl p-6">
            <h3 class="text-lg font-semibold text-white mb-4">Help & Support</h3>
            <nav class="space-y-2">
              <a href="#" @click.prevent class="btn-nav w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Help Center
              </a>
              <a href="#" @click.prevent class="btn-nav w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                Contact Support
              </a>
              <a href="#" @click.prevent class="btn-nav w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Documentation
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth, signOutUser, onAuthStateChange, handleLaunchApp } from '../firebase.js';

export default {
  name: 'ManageAccountPage',
  setup() {
    const router = useRouter();
    const loading = ref(true);
    const error = ref('');
    const user = ref(null);
    const launchAppLoading = ref(false);

    // Mock data - in real app, this would come from your backend
    const currentPlan = ref({
      name: 'Free',
      price: 0,
      maxProjects: 3,
      features: [
        'Up to 3 projects',
        '10 AI generations per month',
        '1GB storage',
        'Basic support'
      ],
      limits: {
        documents: 50,
        aiGenerations: 10,
        storage: 1024 * 1024 * 1024 // 1GB in bytes
      }
    });

    const projects = ref([
      // Mock projects - in real app, fetch from backend
      {
        id: '1',
        name: 'Product Requirements Doc',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    ]);

    const usage = ref({
      documentsCreated: 12,
      aiGenerations: 3,
      storageUsed: 256 * 1024 * 1024 // 256MB
    });

    const getInitial = (email) => {
      // Get the first letter from the email
      return email ? email.charAt(0).toUpperCase() : 'U';
    };

    const formatDate = (date) => {
      if (!date) return 'Unknown';
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const formatBytes = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const signOut = async () => {
      try {
        await signOutUser();
        router.push('/');
      } catch (err) {
        error.value = 'Failed to sign out';
      }
    };

    const upgradePlan = () => {
      // Navigate to billing/upgrade page in main app
      const targetApp = import.meta.env.PROD ? 'https://canonical-prod.web.app' : 'https://canonical-dev.web.app';
      window.open(`${targetApp}/billing`, '_blank');
    };

    const createProject = () => {
      // Navigate to project creation in main app
      const targetApp = import.meta.env.PROD ? 'https://canonical-prod.web.app' : 'https://canonical-dev.web.app';
      window.open(`${targetApp}/new-project`, '_blank');
    };

    const openProject = (projectId) => {
      // Navigate to specific project in main app
      const targetApp = import.meta.env.PROD ? 'https://canonical-prod.web.app' : 'https://canonical-dev.web.app';
      window.open(`${targetApp}/project/${projectId}`, '_blank');
    };

    const retryLoad = () => {
      loading.value = true;
      error.value = '';
      loadAccountData();
    };

    const launchApp = async () => {
      launchAppLoading.value = true;
      
      try {
        await handleLaunchApp(user.value);
      } finally {
        launchAppLoading.value = false;
      }
    };

    const loadAccountData = async () => {
      try {
        // In real app, fetch user data, projects, usage from backend
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        loading.value = false;
      } catch (err) {
        error.value = 'Failed to load account data';
        loading.value = false;
      }
    };

    onMounted(() => {
      // Check if user is authenticated
      const unsubscribe = onAuthStateChange((authUser) => {
        if (authUser) {
          user.value = authUser;
          loadAccountData();
        } else {
          // User not authenticated, redirect to home
          router.push('/');
        }
      });

      // Cleanup
      return unsubscribe;
    });

    return {
      loading,
      error,
      user,
      currentPlan,
      projects,
      usage,
      launchAppLoading,
      getInitial,
      formatDate,
      formatBytes,
      signOut,
      upgradePlan,
      createProject,
      openProject,
      retryLoad,
      launchApp
    };
  }
};
</script>

<style scoped>
/* Minimal custom styles - most moved to Tailwind and shared classes */
</style> 