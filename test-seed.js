// Test script to run Firebase seeding
import { seedAll } from './src/services/catalogService.js';

async function testSeeding() {
  console.log('🚀 Starting Firebase seeding test...');
  
  try {
    const result = await seedAll(true); // Force overwrite for testing
    
    if (result.success) {
      console.log('✅ Seeding successful!');
      console.log('📊 Stats:', result.stats);
    } else {
      console.log('❌ Seeding failed:', result.error);
    }
  } catch (error) {
    console.log('💥 Unexpected error:', error);
  }
}

testSeeding();