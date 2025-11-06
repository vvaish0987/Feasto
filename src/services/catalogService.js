import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

// Dummy seed data for food and grocery catalogs
const FOOD_KEY = 'feasto_food_v1';
const GROC_KEY = 'feasto_grocery_v1';

const foodSeed = [
  { id:'f1', name:'Margherita Pizza', category:'Pizza', price:299, stock:20, image:'https://images.unsplash.com/photo-1601924582975-6f7f6c1b3d3b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b9d9a5b3a1f6f5b', hotel:{ name:'Slice House', address:'MG Road, City', lat:12.9716, lng:77.5946 }, source:'food' },
  { id:'f2', name:'Paneer Butter Masala', category:'North Indian', price:189, stock:15, image:'https://images.unsplash.com/photo-1604908177110-46a2a9b5d9d9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7bda1c9d1c3f2a1f', hotel:{ name:'Curry Corner', address:'Brigade Road, City', lat:12.975, lng:77.6 }, source:'food' },
  { id:'f3', name:'Veg Biryani', category:'Rice', price:210, stock:10, image:'https://images.unsplash.com/photo-1604908176971-8e1a1a9b7b7c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c4d5e6f7g8h', hotel:{ name:'Biryani Bhavan', address:'Church Street, City', lat:12.9719, lng:77.6412 }, source:'food' },
  { id:'f4', name:'Chocolate Brownie', category:'Desserts', price:99, stock:30, image:'https://images.unsplash.com/photo-1599785209707-8b6d4e3f6a3b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2b3c4d5e6f7g8h9i', hotel:{ name:'Bake Studio', address:'Indiranagar, City', lat:12.9712, lng:77.641 }, source:'food' }
];

const grocerySeed = [
  { id:'g1', name:'Organic Bananas (1 dozen)', category:'Fruits', price:80, stock:40, image:'https://images.unsplash.com/photo-1574226516831-e1dff420e12e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3c4d5e6f7g8h9i0j', source:'grocery' },
  { id:'g2', name:'Brown Rice (1 kg)', category:'Grains', price:120, stock:25, image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4d5e6f7g8h9i0j1k', source:'grocery' },
  { id:'g3', name:'Olive Oil (500ml)', category:'Cooking', price:349, stock:12, image:'https://images.unsplash.com/photo-1528756514091-dee4720b6b6c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5e6f7g8h9i0j1k2l', source:'grocery' },
  { id:'g4', name:'Multigrain Bread (400g)', category:'Bakery', price:65, stock:20, image:'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6f7g8h9i0j1k2l3m', source:'grocery' }
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
    return ['All', ...cats];
  }catch(e){
    const arr = type==='food' ? foodSeed : grocerySeed;
    const cats = Array.from(new Set(arr.map(i=> i.category)));
    return ['All', ...cats];
  }
}

export async function getItems(type='food', category='All'){
  try{
    await seedIfEmpty(type, type==='food' ? foodSeed : grocerySeed);
    const snaps = await getDocs(collection(db, type));
    let items = snaps.docs.map(d=> d.data());
    if(category==='All') return items;
    return items.filter(i=> i.category === category);
  }catch(e){
    const arr = type==='food' ? foodSeed : grocerySeed;
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
    return items.slice(0,6);
  }catch(e){
    const arr = type==='food' ? foodSeed : grocerySeed;
    return arr.slice(0,6);
  }
}

export default { getCategories, getItems, getFeatured };
