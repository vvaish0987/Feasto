import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, setDoc, writeBatch } from 'firebase/firestore';

// Import the comprehensive JSON data
import foodItemsData from '../data/food-items.json';
import groceryItemsData from '../data/grocery-items.json';
import categoriesData from '../data/categories.json';
import appData from '../data/app-data.json';

// Convert the rich JSON data from objects to arrays
const foodSeed = Object.values(foodItemsData || {});
const grocerySeed = Object.values(groceryItemsData || {});

// Debug logging
console.log('🔍 Data loaded:', {
  foodItems: foodSeed.length,
  groceryItems: grocerySeed.length,
  sampleFood: foodSeed[0]?.name,
  sampleGrocery: grocerySeed[0]?.name
});

async function seedIfEmpty(collectionName, seed){
  try{
    const snaps = await getDocs(collection(db, collectionName));
    if(snaps.empty){
      for(const it of seed){
        await setDoc(doc(db, collectionName, it.id), it);
      }
    }
  }catch(e){
    // ignore errors (local fallback will be used)
  }
}



export async function getCategories(type='food'){
  try{
    await seedIfEmpty(type, type==='food' ? foodSeed : grocerySeed);
    const snaps = await getDocs(collection(db, type));
    const items = snaps.docs.map(d=> d.data());
    const cats = Array.from(new Set(items.map(i=> i.category)));
    console.debug('[catalogService] getCategories using Firestore for', type, '->', cats);
    return ['All', ...cats];
  }catch(e){
    const arr = type==='food' ? foodSeed : grocerySeed;
    const cats = Array.from(new Set(arr.map(i=> i.category)));
    console.debug('[catalogService] getCategories falling back to local for', type, '->', cats);
    return ['All', ...cats];
  }
}

export async function getItems(type='food', category='All'){
  try{
    await seedIfEmpty(type, type==='food' ? foodSeed : grocerySeed);
    const snaps = await getDocs(collection(db, type));
    let items = snaps.docs.map(d=> d.data());
    console.debug('[catalogService] getItems using Firestore for', type, 'category=', category, 'count=', items.length);
    if(category==='All') return items;
    return items.filter(i=> i.category === category);
  }catch(e){
    const arr = type==='food' ? foodSeed : grocerySeed;
    console.debug('[catalogService] getItems falling back to local for', type, 'category=', category, 'count=', arr.length);
    if(category==='All') return arr;
    return arr.filter(i=> i.category === category);
  }
}

export async function getFeatured(type='food'){
  // return first 6
  try{
    await seedIfEmpty(type, type==='food' ? foodSeed : grocerySeed);
    const snaps = await getDocs(collection(db, type));
    const items = snaps.docs.map(d=> d.data());
    console.debug('[catalogService] getFeatured using Firestore for', type, 'count=', items.length);
    return items.slice(0,6);
  }catch(e){
    const arr = type==='food' ? foodSeed : grocerySeed;
    console.debug('[catalogService] getFeatured falling back to local for', type, 'count=', arr.length);
    return arr.slice(0,6);
  }
}

const catalogService = { getCategories, getItems, getFeatured };
export default catalogService;

// Enhanced seed function with batch operations and comprehensive data
export async function seedAll(force = false) {
  try {
    console.log('🌱 Starting comprehensive database seeding...');
    console.log('📊 Data check:', {
      foodItems: foodSeed.length,
      groceryItems: grocerySeed.length,
      categoriesData: !!categoriesData,
      appData: !!appData
    });
    
    // Test Firebase connection first
    try {
      console.log('🔗 Testing Firebase connection...');
      const testDoc = doc(db, 'test', 'connection');
      await setDoc(testDoc, { timestamp: new Date(), test: true });
      console.log('✅ Firebase connection successful');
    } catch (e) {
      console.error('❌ Firebase connection failed:', e);
      return { success: false, error: `Firebase connection failed: ${e.message}` };
    }
    
    // Helper function for batch writes (Firestore limit: 500 operations per batch)
    const batchWrite = async (collectionName, dataArray, batchSize = 400) => {
      console.log(`📝 Writing ${dataArray.length} items to ${collectionName} collection...`);
      
      if (dataArray.length === 0) {
        console.log(`⚠️ No data to write for ${collectionName}`);
        return;
      }
      
      for (let i = 0; i < dataArray.length; i += batchSize) {
        const batch = writeBatch(db);
        const chunk = dataArray.slice(i, i + batchSize);
        
        for (const item of chunk) {
          if (!item.id) {
            console.warn(`⚠️ Item missing ID in ${collectionName}:`, item);
            continue;
          }
          
          const docRef = doc(db, collectionName, item.id);
          
          if (force) {
            batch.set(docRef, item);
          } else {
            // Check if document exists first (only for non-force mode)
            try {
              const docSnap = await getDoc(docRef);
              if (!docSnap.exists()) {
                batch.set(docRef, item);
              } else {
                console.log(`⏭️ Skipping existing document: ${item.id}`);
              }
            } catch (e) {
              // If we can't check, assume it doesn't exist and create it
              batch.set(docRef, item);
            }
          }
        }
        
        if (batch._mutations && batch._mutations.length > 0) {
          await batch.commit();
          console.log(`✅ Batch ${Math.floor(i/batchSize) + 1} completed for ${collectionName}`);
        } else {
          console.log(`⏭️ No new items to write in batch ${Math.floor(i/batchSize) + 1} for ${collectionName}`);
        }
      }
    };

    // 1. Seed Food Items (25 items)
    if (foodSeed.length > 0) {
      await batchWrite('food', foodSeed);
      console.log(`🍕 Food items seeded: ${foodSeed.length} items`);
    } else {
      console.log('⚠️ No food data found in JSON file');
    }

    // 2. Seed Grocery Items (30 items)
    if (grocerySeed.length > 0) {
      await batchWrite('grocery', grocerySeed);
      console.log(`🥕 Grocery items seeded: ${grocerySeed.length} items`);
    } else {
      console.log('⚠️ No grocery data found in JSON file');
    }

    // 3. Seed Categories
    if (categoriesData) {
      const categoryDocs = [];
      
      // Process food categories
      if (categoriesData['food-categories']) {
        Object.entries(categoriesData['food-categories']).forEach(([key, value]) => {
          categoryDocs.push({
            id: `food-${key.toLowerCase().replace(/\s+/g, '-')}`,
            ...value,
            categoryKey: key
          });
        });
      }
      
      // Process grocery categories
      if (categoriesData['grocery-categories']) {
        Object.entries(categoriesData['grocery-categories']).forEach(([key, value]) => {
          categoryDocs.push({
            id: `grocery-${key.toLowerCase().replace(/\s+/g, '-')}`,
            ...value,
            categoryKey: key
          });
        });
      }
      
      if (categoryDocs.length > 0) {
        await batchWrite('categories', categoryDocs);
        console.log(`📂 Categories seeded: ${categoryDocs.length} categories`);
      }
    }

    // 4. Seed App Settings & Data
    if (appData) {
      const appDocuments = [];
      
      // Delivery partners
      if (appData['delivery-partners']) {
        appDocuments.push({
          id: 'delivery-partners',
          type: 'delivery-partners',
          data: appData['delivery-partners']
        });
      }
      
      // Delivery stats
      if (appData['delivery-stats']) {
        appDocuments.push({
          id: 'delivery-stats',
          type: 'delivery-stats',
          data: appData['delivery-stats']
        });
      }
      
      // App settings
      if (appData['app-settings']) {
        appDocuments.push({
          id: 'app-settings',
          type: 'app-settings',
          data: appData['app-settings']
        });
      }
      
      if (appDocuments.length > 0) {
        await batchWrite('app-data', appDocuments);
        console.log(`⚙️ App data seeded: ${appDocuments.length} documents`);
      }
    }

    const totalItems = foodSeed.length + grocerySeed.length;
    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Total items seeded: ${totalItems} products`);
    
    return { 
      success: true, 
      stats: {
        foodItems: foodSeed.length,
        groceryItems: grocerySeed.length,
        totalItems: totalItems,
        collections: ['food', 'grocery', 'categories', 'app-data']
      }
    };
    
  } catch (e) {
    console.error('❌ Seeding failed:', e);
    return { success: false, error: String(e) };
  }
}
