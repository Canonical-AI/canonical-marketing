<template>
  <v-container class="legal-page" fluid>
    <v-row>
      <v-col cols="12">
        <div class="legal-content">
          <div v-if="loading" class="text-center py-8">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <p class="mt-4 text-subtitle-1">Loading Privacy Policy...</p>
          </div>
          
          <div v-else-if="error" class="text-center py-8">
            <v-icon size="48" color="error" class="mb-4">mdi-alert-circle</v-icon>
            <h2 class="text-h5 mb-2">Failed to load Privacy Policy</h2>
            <p class="text-body-1 mb-4">{{ error }}</p>
            <v-btn @click="loadMarkdown" color="primary" variant="outlined">
              <v-icon start>mdi-refresh</v-icon>
              Try Again
            </v-btn>
          </div>
          
          <div v-else class="markdown-content" v-html="renderedMarkdown"></div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { marked } from 'marked';

const loading = ref(true);
const error = ref(null);
const renderedMarkdown = ref('');

// Configure marked options for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  headerPrefix: 'privacy-',
});

const loadMarkdown = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await fetch('/docs/privacy-policy.md');
    
    if (!response.ok) {
      throw new Error(`Failed to load privacy policy: ${response.status} ${response.statusText}`);
    }
    
    const markdownText = await response.text();
    renderedMarkdown.value = await marked.parse(markdownText);
  } catch (err) {
    console.error('Error loading privacy policy:', err);
    error.value = err.message || 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadMarkdown();
});
</script>

<style scoped>
.legal-page {
  padding-top: 2rem;
  padding-bottom: 4rem;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
}

.legal-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: none;
}

.markdown-content {
  color: #2c3e50;
  line-height: 1.8;
  font-size: 1rem;
  text-align: left;
}

/* Markdown Styling */
.markdown-content :deep(h1) {
  color: #1a202c;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid #e2e8f0;
  text-align: left;
}

.markdown-content :deep(h2) {
  color: #2d3748;
  font-size: 1.875rem;
  font-weight: 600;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
  text-align: left;
}

.markdown-content :deep(h3) {
  color: #4a5568;
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.markdown-content :deep(h4) {
  color: #4a5568;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.markdown-content :deep(p) {
  margin-bottom: 1.25rem;
  text-align: left;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown-content :deep(strong) {
  font-weight: 600;
  color: #2d3748;
}

.markdown-content :deep(em) {
  font-style: italic;
  color: #4a5568;
}

.markdown-content :deep(code) {
  background-color: #f7fafc;
  color: #e53e3e;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 0.875rem;
}

.markdown-content :deep(pre) {
  background-color: #f7fafc;
  color: #2d3748;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.25rem;
  border-left: 4px solid #4299e1;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #4299e1;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #4a5568;
  background-color: #f7fafc;
  padding: 1rem;
  border-radius: 0.25rem;
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.25rem;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.markdown-content :deep(th) {
  background-color: #f7fafc;
  font-weight: 600;
  color: #2d3748;
}

.markdown-content :deep(hr) {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  margin: 3rem 0;
}

.markdown-content :deep(a) {
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.markdown-content :deep(a:hover) {
  color: #2b6cb0;
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .legal-content {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .markdown-content :deep(h1) {
    font-size: 2rem;
  }
  
  .markdown-content :deep(h2) {
    font-size: 1.5rem;
  }
  
  .markdown-content :deep(h3) {
    font-size: 1.25rem;
  }
  
  .markdown-content :deep(table) {
    font-size: 0.875rem;
  }
  
  .markdown-content :deep(th),
  .markdown-content :deep(td) {
    padding: 0.5rem;
  }
}

/* Print Styles */
@media print {
  .legal-page {
    background: white !important;
  }
  
  .legal-content {
    background: white !important;
    box-shadow: none !important;
    border: none !important;
  }
  
  .markdown-content :deep(a) {
    color: #000 !important;
    text-decoration: underline !important;
  }
}
</style> 