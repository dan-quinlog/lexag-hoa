// Simple test to verify the dev server can start
console.log('Testing app startup...');

import('./dist/assets/index-21a0efd1.js')
  .then(() => {
    console.log('✅ App modules load successfully');
  })
  .catch((error) => {
    console.error('❌ Error loading app:', error);
  });
