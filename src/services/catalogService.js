import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

// Dummy seed data for food and grocery catalogs
const FOOD_KEY = 'feasto_food_v1';
const GROC_KEY = 'feasto_grocery_v1';

const foodSeed = [
  { id:'f1', name:'Margherita Pizza', category:'Pizza', price:299, stock:20, image:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Slice House', address:'MG Road, City', lat:12.9716, lng:77.5946 }, source:'food' },
  { id:'f2', name:'Paneer Butter Masala', category:'North Indian', price:189, stock:15, image:'https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Curry Corner', address:'Brigade Road, City', lat:12.975, lng:77.6 }, source:'food' },
  { id:'f3', name:'Veg Biryani', category:'Rice', price:210, stock:10, image:'https://images.unsplash.com/photo-1563379091339-03246963d16a?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Biryani Bhavan', address:'Church Street, City', lat:12.9719, lng:77.6412 }, source:'food' },
  { id:'f4', name:'Chocolate Brownie', category:'Desserts', price:99, stock:30, image:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Bake Studio', address:'Indiranagar, City', lat:12.9712, lng:77.641 }, source:'food' },
  { id:'f5', name:'Chicken Tikka Masala', category:'North Indian', price:249, stock:18, image:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Grill House', address:'Koramangala, City', lat:12.9352, lng:77.6245 }, source:'food' },
  { id:'f6', name:'Pepperoni Feast', category:'Pizza', price:329, stock:12, image:'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Slice House', address:'MG Road, City', lat:12.9716, lng:77.5946 }, source:'food' },
  { id:'f7', name:'Sushi Platter (Veg)', category:'Sushi', price:399, stock:8, image:'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Ocean Roll', address:'Brigade Road, City', lat:12.975, lng:77.6 }, source:'food' },
  { id:'f8', name:'Caesar Salad', category:'Salads', price:159, stock:25, image:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Green Bowl', address:'Indiranagar, City', lat:12.9712, lng:77.641 }, source:'food' },
  { id:'f9', name:'Masala Dosa', category:'South Indian', price:89, stock:40, image:'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Dosa Delight', address:'Jayanagar, City', lat:12.9346, lng:77.605 }, source:'food' },
  { id:'f10', name:'Gulab Jamun (3 pcs)', category:'Desserts', price:69, stock:50, image:'https://images.unsplash.com/photo-1571167906168-34e17f6da204?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Sweet Tooth', address:'City Market, City', lat:12.970, lng:77.59 }, source:'food' },
  { id:'f11', name:'Pav Bhaji', category:'Street Food', price:119, stock:35, image:'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Street Spice', address:'Commercial Street, City', lat:12.9759, lng:77.6093 }, source:'food' },
  { id:'f12', name:'Chow Mein', category:'Noodles', price:139, stock:28, image:'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Noodle Box', address:'Forum Mall, City', lat:12.9279, lng:77.6271 }, source:'food' },
  { id:'f13', name:'Fish Curry', category:'Seafood', price:279, stock:22, image:'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Coastal Kitchen', address:'UB City Mall, City', lat:12.9718, lng:77.5986 }, source:'food' },
  { id:'f14', name:'Idli Sambar (4 pcs)', category:'Breakfast', price:59, stock:60, image:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=60', hotel:{ name:'South Spice', address:'BTM Layout, City', lat:12.9165, lng:77.6101 }, source:'food' },
  { id:'f15', name:'Shawarma Roll', category:'Middle Eastern', price:149, stock:32, image:'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Arabian Nights', address:'Residency Road, City', lat:12.9716, lng:77.6033 }, source:'food' },
  { id:'f16', name:'Lasagna', category:'Italian', price:269, stock:18, image:'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Bella Italia', address:'Lavelle Road, City', lat:12.9698, lng:77.6025 }, source:'food' },
  { id:'f17', name:'Butter Chicken', category:'North Indian', price:229, stock:26, image:'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Punjab Palace', address:'Malleshwaram, City', lat:13.0067, lng:77.5667 }, source:'food' },
  { id:'f18', name:'Greek Salad', category:'Salads', price:179, stock:21, image:'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Mediterranean Cafe', address:'Cunningham Road, City', lat:12.9925, lng:77.5958 }, source:'food' },
  { id:'f19', name:'Tiramisu', category:'Desserts', price:139, stock:24, image:'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Dolce Vita', address:'Church Street, City', lat:12.9719, lng:77.6412 }, source:'food' },
  { id:'f20', name:'Chicken Fried Rice', category:'Rice', price:169, stock:33, image:'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=800&auto=format&fit=crop&q=60', hotel:{ name:'Asian Wok', address:'Indiranagar, City', lat:12.9712, lng:77.641 }, source:'food' }
];

const grocerySeed = [
  { id:'g1', name:'Organic Bananas (1 dozen)', category:'Fruits', price:80, stock:40, image:'https://images.unsplash.com/photo-1574226516831-e1dff420e12e?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g2', name:'Brown Rice (1 kg)', category:'Grains', price:120, stock:25, image:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g3', name:'Olive Oil (500ml)', category:'Cooking', price:349, stock:12, image:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g4', name:'Multigrain Bread (400g)', category:'Bakery', price:65, stock:20, image:'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g5', name:'Almonds (250g)', category:'Nuts', price:299, stock:30, image:'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g6', name:'Fresh Milk (1L)', category:'Dairy', price:55, stock:100, image:'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g7', name:'Eggs (6 pcs)', category:'Dairy', price:60, stock:80, image:'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g8', name:'Tomatoes (1 kg)', category:'Vegetables', price:45, stock:60, image:'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g9', name:'Potatoes (1 kg)', category:'Vegetables', price:35, stock:120, image:'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g10', name:'Onions (1 kg)', category:'Vegetables', price:30, stock:90, image:'https://images.unsplash.com/photo-1508747703725-719777637510?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g11', name:'Cumin Powder (100g)', category:'Spices', price:55, stock:200, image:'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g12', name:'Turmeric Powder (100g)', category:'Spices', price:45, stock:220, image:'https://images.unsplash.com/photo-1599492477093-654fc2c7dfba?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g13', name:'Sugar (1 kg)', category:'Baking', price:48, stock:150, image:'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g14', name:'All-Purpose Flour (1 kg)', category:'Baking', price:60, stock:130, image:'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g15', name:'Peanut Butter (350g)', category:'Spreads', price:199, stock:45, image:'https://images.unsplash.com/photo-1567540735281-8c2d52a5c50e?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g16', name:'Pasta (500g)', category:'Grains', price:89, stock:70, image:'https://images.unsplash.com/photo-1551462147-37cbd8db2aa8?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g17', name:'Green Tea (25 bags)', category:'Beverages', price:149, stock:60, image:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g18', name:'Dishwasher Liquid (500ml)', category:'Household', price:199, stock:40, image:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g19', name:'Toilet Cleaner (500ml)', category:'Household', price:129, stock:50, image:'https://images.unsplash.com/photo-1585120040053-c3536de41093?w=800&auto=format&fit=crop&q=60', source:'grocery' },
  { id:'g20', name:'Frozen Peas (500g)', category:'Frozen', price:99, stock:60, image:'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800&auto=format&fit=crop&q=60', source:'grocery' }
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
