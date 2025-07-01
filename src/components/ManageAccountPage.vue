<template>
  <div class="manage-account-container">
    <div class="account-content">

      <div class="account-layout">
        <!-- Main Dashboard Content (3/4 width) -->
        <div class="dashboard-content">
          <!-- Loading State -->
          <div v-if="loading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading your account information...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="error-container">
            <div class="error-message">{{ error }}</div>
            <button @click="retryLoad" class="retry-btn">Try Again</button>
          </div>

          <!-- Account Information -->
          <div v-else class="account-grid">
            <!-- User Profile Card -->
            <div class="card profile-card">
              <div class="card-header">
                <h2 class="card-title">Profile</h2>
              </div>
              <div class="card-content">
                <div class="profile-info">
                  <div class="avatar-container">
                    <div class="user-avatar">
                      {{ getInitial(user?.email) }}
                    </div>
                  </div>
                  <div class="user-details">
                    <h3 class="user-name">{{ user?.displayName || 'User' }}</h3>
                    <p class="user-email">{{ user?.email }}</p>
                    <p class="user-joined">Joined {{ formatDate(user?.metadata?.creationTime) }}</p>
                  </div>
                </div>
                <div class="profile-actions">
                  <button @click="signOut" class="sign-out-btn">Sign Out</button>
                </div>
              </div>
            </div>

            <!-- Current Plan Card -->
            <div class="card plan-card">
              <div class="card-header">
                <h2 class="card-title">Current Plan</h2>
              </div>
              <div class="card-content">
                <div class="plan-info">
                  <div class="plan-badge">{{ currentPlan.name }}</div>
                  <p class="plan-price">${{ currentPlan.price }}<span class="price-period">/month</span></p>
                  <ul class="plan-features">
                    <li v-for="feature in currentPlan.features" :key="feature" class="feature-item">
                      <svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                      {{ feature }}
                    </li>
                  </ul>
                </div>
                <div class="plan-actions">
                  <button @click="upgradePlan" class="upgrade-btn">Upgrade Plan</button>
                </div>
              </div>
            </div>

            <!-- Projects Card -->
            <div class="card projects-card">
              <div class="card-header">
                <h2 class="card-title">Projects</h2>
                <span class="project-count">{{ projects.length }} of {{ currentPlan.maxProjects }}</span>
              </div>
              <div class="card-content">
                <div v-if="projects.length === 0" class="empty-state">
                  <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p>No projects yet</p>
                  <button @click="createProject" class="create-project-btn">Create Your First Project</button>
                </div>
                <div v-else class="projects-list">
                  <div v-for="project in projects" :key="project.id" class="project-item">
                    <div class="project-info">
                      <h4 class="project-name">{{ project.name }}</h4>
                      <p class="project-date">Created {{ formatDate(project.createdAt) }}</p>
                    </div>
                    <div class="project-actions">
                      <button @click="openProject(project.id)" class="open-project-btn">Open</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Usage Card -->
            <div class="card usage-card">
              <div class="card-header">
                <h2 class="card-title">Usage This Month</h2>
              </div>
              <div class="card-content">
                <div class="usage-stats">
                  <div class="usage-item">
                    <div class="usage-label">Documents Created</div>
                    <div class="usage-value">{{ usage.documentsCreated }}</div>
                    <div class="usage-limit">of {{ currentPlan.limits.documents }}</div>
                  </div>
                  <div class="usage-item">
                    <div class="usage-label">AI Generations</div>
                    <div class="usage-value">{{ usage.aiGenerations }}</div>
                    <div class="usage-limit">of {{ currentPlan.limits.aiGenerations }}</div>
                  </div>
                  <div class="usage-item">
                    <div class="usage-label">Storage Used</div>
                    <div class="usage-value">{{ formatBytes(usage.storageUsed) }}</div>
                    <div class="usage-limit">of {{ formatBytes(currentPlan.limits.storage) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Menu (1/4 width) -->
        <div class="sidebar-menu">
          <v-btn 
            color="warning" 
            class="mb-4"
            @click="launchApp"
            :loading="launchAppLoading"
            block
          > 
            Launch App
          </v-btn>
          <div class="menu-card">
            <h3 class="menu-title">Quick Actions</h3>
            <nav class="menu-nav">
              <button @click="createProject" class="menu-item">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                New Project
              </button>
              <button @click="upgradePlan" class="menu-item">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                Upgrade Plan
              </button>
              <a href="#" @click.prevent class="menu-item">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                View Billing
              </a>
              <a href="#" @click.prevent class="menu-item">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Account Settings
              </a>
            </nav>
          </div>

          <div class="menu-card">
            <h3 class="menu-title">Help & Support</h3>
            <nav class="menu-nav">
              <a href="#" @click.prevent class="menu-item">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Help Center
              </a>
              <a href="#" @click.prevent class="menu-item">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                Contact Support
              </a>
              <a href="#" @click.prevent class="menu-item">
                <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
.manage-account-container {
  min-height: calc(100vh - 64px);
  padding: 1rem;
  background: transparent;
}

.account-content {
  max-width: 1200px;
  margin: 0 auto;
}

.account-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
}

.loading-container {
  text-align: center;
  padding: 4rem 0;
  color: white;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #f59e0b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  text-align: center;
  padding: 4rem 0;
  color: white;
}

.error-message {
  color: #ef4444;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.retry-btn {
  background: #f59e0b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: #d97706;
}

.account-layout {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.dashboard-content {
  flex: 3;
  min-width: 0; /* Allows flex item to shrink below its minimum content size */
}

.sidebar-menu {
  flex: 1;
  position: sticky;
  top: 2rem;
}

.account-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  padding: 1.5rem;
  color: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.project-count {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.user-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: #f59e0b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
}

.user-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.user-email {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.25rem;
}

.user-joined {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

.sign-out-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.sign-out-btn:hover {
  background: #dc2626;
}

.plan-badge {
  background: #f59e0b;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}

.plan-price {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.price-period {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.plan-features {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.feature-icon {
  width: 1rem;
  height: 1rem;
  color: #10b981;
}

.upgrade-btn {
  background: #f59e0b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
  width: 100%;
}

.upgrade-btn:hover {
  background: #d97706;
}

.empty-state {
  text-align: center;
  padding: 2rem 0;
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 auto 1rem;
}

.create-project-btn {
  background: #f59e0b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
  margin-top: 1rem;
}

.create-project-btn:hover {
  background: #d97706;
}

.projects-list {
  space-y: 1rem;
}

.project-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.project-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.project-date {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.open-project-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.open-project-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.usage-stats {
  display: grid;
  gap: 1.5rem;
}

.usage-item {
  text-align: center;
}

.usage-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.usage-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.usage-limit {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
}

.menu-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  padding: 1.5rem;
  color: white;
  margin-bottom: 1.5rem;
}

.menu-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.menu-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  font-size: 0.875rem;
  text-align: left;
  width: 100%;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.menu-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .account-layout {
    flex-direction: column;
  }
  
  .dashboard-content {
    flex: none;
  }
  
  .sidebar-menu {
    flex: none;
    position: static;
  }
  
  .account-grid {
    grid-template-columns: 1fr;
  }
  
  .manage-account-container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style> 