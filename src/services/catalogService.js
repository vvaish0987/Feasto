import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

// Dummy seed data for food and grocery catalogs
const FOOD_KEY = 'feasto_food_v1';
const GROC_KEY = 'feasto_grocery_v1';

const foodSeed = [
  { id:'f1', name:'Margherita Pizza', category:'Pizza', price:299, stock:20, image:'https://images.unsplash.com/photo-1601924582975-6f7f6c1b3d3b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b9d9a5b3a1f6f5b', hotel:{ name:'Slice House', address:'MG Road, City', lat:12.9716, lng:77.5946 }, source:'food' },
  { id:'f2', name:'Paneer Butter Masala', category:'North Indian', price:189, stock:15, image:'https://images.unsplash.com/photo-1604908177110-46a2a9b5d9d9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7bda1c9d1c3f2a1f', hotel:{ name:'Curry Corner', address:'Brigade Road, City', lat:12.975, lng:77.6 }, source:'food' },
  { id:'f3', name:'Veg Biryani', category:'Rice', price:210, stock:10, image:'https://images.unsplash.com/photo-1604908176971-8e1a1a9b7b7c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c4d5e6f7g8h', hotel:{ name:'Biryani Bhavan', address:'Church Street, City', lat:12.9719, lng:77.6412 }, source:'food' },
  { id:'f4', name:'Chocolate Brownie', category:'Desserts', price:99, stock:30, image:'https://images.unsplash.com/photo-1599785209707-8b6d4e3f6a3b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2b3c4d5e6f7g8h9i', hotel:{ name:'Bake Studio', address:'Indiranagar, City', lat:12.9712, lng:77.641 }, source:'food' },
  { id:'f5', name:'Chicken Tikka Masala', category:'North Indian', price:249, stock:18, image:'https://images.unsplash.com/photo-1604909053367-3a6c1c8b1b1a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8a9b0c1d2e3f4g5h', hotel:{ name:'Grill House', address:'Koramangala, City', lat:12.9352, lng:77.6245 }, source:'food' },
  { id:'f6', name:'Pepperoni Feast', category:'Pizza', price:329, stock:12, image:'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9b8a7c6d5e4f3g2h', hotel:{ name:'Slice House', address:'MG Road, City', lat:12.9716, lng:77.5946 }, source:'food' },
  { id:'f7', name:'Sushi Platter (Veg)', category:'Sushi', price:399, stock:8, image:'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1c2b3a4d5e6f7g8h', hotel:{ name:'Ocean Roll', address:'Brigade Road, City', lat:12.975, lng:77.6 }, source:'food' },
  { id:'f8', name:'Caesar Salad', category:'Salads', price:159, stock:25, image:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2d3c4b5a6e7f8g9h', hotel:{ name:'Green Bowl', address:'Indiranagar, City', lat:12.9712, lng:77.641 }, source:'food' },
  { id:'f9', name:'Masala Dosa', category:'South Indian', price:89, stock:40, image:'https://images.unsplash.com/photo-1604908177123-9c8d1b2a3b4c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3e4f5g6h7i8j9k0l', hotel:{ name:'Dosa Delight', address:'Jayanagar, City', lat:12.9346, lng:77.605 }, source:'food' },
  { id:'f10', name:'Gulab Jamun (3 pcs)', category:'Desserts', price:69, stock:50, image:'https://images.unsplash.com/photo-1564758866814-3b3f8a1c7a1b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4f5g6h7i8j9k0l1m', hotel:{ name:'Sweet Tooth', address:'City Market, City', lat:12.970, lng:77.59 }, source:'food' }
];

const grocerySeed = [
  { id:'g1', name:'Organic Bananas (1 dozen)', category:'Fruits', price:80, stock:40, image:'https://images.unsplash.com/photo-1574226516831-e1dff420e12e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3c4d5e6f7g8h9i0j', source:'grocery' },
  { id:'g2', name:'Brown Rice (1 kg)', category:'Grains', price:120, stock:25, image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4d5e6f7g8h9i0j1k', source:'grocery' },
  { id:'g3', name:'Olive Oil (500ml)', category:'Cooking', price:349, stock:12, image:'https://images.unsplash.com/photo-1528756514091-dee4720b6b6c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5e6f7g8h9i0j1k2l', source:'grocery' },
  { id:'g4', name:'Multigrain Bread (400g)', category:'Bakery', price:65, stock:20, image:'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6f7g8h9i0j1k2l3m', source:'grocery' },
  { id:'g5', name:'Almonds (250g)', category:'Nuts', price:299, stock:30, image:'https://images.unsplash.com/photo-1606813902779-6f9b3c8b2a2b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7a8b9c0d1e2f3g4h', source:'grocery' },
  { id:'g6', name:'Fresh Milk (1L)', category:'Dairy', price:55, stock:100, image:'https://images.unsplash.com/photo-1582719478250-1c3f5b8a4d4e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8b9c0d1e2f3g4h5i', source:'grocery' },
  { id:'g7', name:'Eggs (6 pcs)', category:'Dairy', price:60, stock:80, image:'https://images.unsplash.com/photo-1588167103499-9b9a2e6a7b8c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9c0d1e2f3g4h5i6j', source:'grocery' },
  { id:'g8', name:'Tomatoes (1 kg)', category:'Vegetables', price:45, stock:60, image:'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=0d1e2f3g4h5i6j7k', source:'grocery' },
  { id:'g9', name:'Potatoes (1 kg)', category:'Vegetables', price:35, stock:120, image:'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5k6l7m8n9o0p1q2r', source:'grocery' },
  { id:'g10', name:'Onions (1 kg)', category:'Vegetables', price:30, stock:90, image:'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6l7m8n9o0p1q2r3s', source:'grocery' },
  { id:'g11', name:'Cumin Powder (100g)', category:'Spices', price:55, stock:200, image:'https://images.unsplash.com/photo-1589987600841-0b9f1f2a3c4d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7m8n9o0p1q2r3s4t', source:'grocery' },
  { id:'g12', name:'Turmeric Powder (100g)', category:'Spices', price:45, stock:220, image:'https://images.unsplash.com/photo-1604908177341-1a2b3c4d5e6f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8n9o0p1q2r3s4t5u', source:'grocery' },
  { id:'g13', name:'Sugar (1 kg)', category:'Baking', price:48, stock:150, image:'https://images.unsplash.com/photo-1505765050784-9b4d4b9b5f5f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9o0p1q2r3s4t5u6v', source:'grocery' },
  { id:'g14', name:'All-Purpose Flour (1 kg)', category:'Baking', price:60, stock:130, image:'https://images.unsplash.com/photo-1592928301975-3a3f3b3b3c3d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=0p1q2r3s4t5u6v7w', source:'grocery' },
  { id:'g15', name:'Peanut Butter (350g)', category:'Spreads', price:199, stock:45, image:'https://images.unsplash.com/photo-1593254042569-2b2d2b2b2c2c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1q2r3s4t5u6v7w8x', source:'grocery' },
  { id:'g16', name:'Pasta (500g)', category:'Grains', price:89, stock:70, image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2r3s4t5u6v7w8x9y', source:'grocery' },
  { id:'g17', name:'Green Tea (25 bags)', category:'Beverages', price:149, stock:60, image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3s4t5u6v7w8x9y0z', source:'grocery' },
  { id:'g18', name:'Dishwasher Liquid (500ml)', category:'Household', price:199, stock:40, image:'https://images.unsplash.com/photo-1581579187330-6b6c6d6e6f6f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4t5u6v7w8x9y0z1a', source:'grocery' },
  { id:'g19', name:'Toilet Cleaner (500ml)', category:'Household', price:129, stock:50, image:'https://images.unsplash.com/photo-1581579187330-6b6c6d6e6f6f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5u6v7w8x9y0z1a2b', source:'grocery' },
  { id:'g20', name:'Frozen Peas (500g)', category:'Frozen', price:99, stock:60, image:'https://images.unsplash.com/photo-1599785209707-8b6d4e3f6a3b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6v7w8x9y0z1a2b3c', source:'grocery' }
];

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

function loadLocal(key, seed){
  try{ const raw = localStorage.getItem(key); if(!raw){ localStorage.setItem(key, JSON.stringify(seed)); return seed; } return JSON.parse(raw); }catch(e){ return seed; }
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

export default { getCategories, getItems, getFeatured };

// Seed all known items into Firestore. If force=true, overwrite existing docs; otherwise only create missing docs.
export async function seedAll(force = false){
  try{
    const writeForType = async (type, seedArr) =>{
      for(const it of seedArr){
        try{
          const ref = doc(db, type, it.id);
          if(force){
            await setDoc(ref, it);
          } else {
            const snap = await getDoc(ref);
            if(!snap.exists()) await setDoc(ref, it);
          }
        }catch(e){ /* ignore per-doc errors */ }
      }
    };
    await writeForType('food', foodSeed);
    await writeForType('grocery', grocerySeed);
    return { success:true };
  }catch(e){
    return { success:false, error: String(e) };
  }
}
