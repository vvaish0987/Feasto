// mockApi now supports Firestore-backed inventory and orders when available.
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, setDoc, runTransaction, query } from 'firebase/firestore';

const INVENTORY_KEY = 'feasto_inventory_v1';
const ORDERS_KEY_PREFIX = 'feasto_orders_';

const initial = [
  { id:'p1', name:'Banana (per dozen)', category:'Fruit', price:40, stock:20 },
  { id:'p2', name:'Apple (kg)', category:'Fruit', price:120, stock:15 },
  { id:'p3', name:'Broccoli (per bunch)', category:'Vegetable', price:50, stock:10 },
  { id:'p4', name:'Whole Chicken (kg)', category:'Non-veg', price:220, stock:8 },
  { id:'p5', name:'Multigrain Bread', category:'Breads', price:60, stock:12 },
  { id:'p6', name:'Eggs (dozen)', category:'Non-veg', price:90, stock:30 }
];

async function ensureInventorySeed(){
  try{
    const col = collection(db, 'inventory');
    const snaps = await getDocs(col);
    if(snaps.empty){
      // seed
      for(const it of initial){
        await setDoc(doc(db, 'inventory', it.id), it);
      }
    }
  }catch(e){
    // ignore firestore errors: fallback to localStorage
  }
}

function loadInventoryLocal(){
  try{ const raw = localStorage.getItem(INVENTORY_KEY); if(!raw){ localStorage.setItem(INVENTORY_KEY, JSON.stringify(initial)); return initial; } return JSON.parse(raw); }catch(e){ return initial; }
}

export async function getCategories(){
  try{
    await ensureInventorySeed();
    const snaps = await getDocs(collection(db, 'inventory'));
    const inv = snaps.docs.map(d=> d.data());
    const cats = Array.from(new Set(inv.map(i=>i.category)));
    return ['All', ...cats];
  }catch(e){
    const inv = loadInventoryLocal();
    const cats = Array.from(new Set(inv.map(i=>i.category)));
    return ['All', ...cats];
  }
}

export async function getItems(category='All'){
  try{
    await ensureInventorySeed();
    const snaps = await getDocs(collection(db, 'inventory'));
    let inv = snaps.docs.map(d=> d.data());
    if(category==='All') return inv;
    return inv.filter(i=> i.category === category);
  }catch(e){
    const inv = loadInventoryLocal();
    if(category==='All') return inv;
    return inv.filter(i=> i.category === category);
  }
}

// Check availability without mutating. returns { ok: bool, missing: [{id, requested, available}] }
export async function checkAvailability(cartItems){
  try{
    // use Firestore reads; support item.source to pick collection
    const missing = [];
    for(const c of cartItems){
      const collectionName = c.source || 'inventory';
      const snap = await getDoc(doc(db, collectionName, c.id));
      const available = snap.exists() ? snap.data().stock : 0;
      if(!snap.exists() || c.qty > available) missing.push({ id: c.id, name: snap.exists()? snap.data().name : 'Unknown', requested: c.qty, available });
    }
    return { ok: missing.length===0, missing };
  }catch(e){
    // fallback to local check (try seed arrays)
    const inv = loadInventoryLocal();
    const missing = [];
    for(const c of cartItems){
      const it = inv.find(i=> i.id===c.id);
      const available = it ? it.stock : 0;
      if(!it || c.qty > available) missing.push({ id: c.id, name: it?.name || 'Unknown', requested: c.qty, available });
    }
    return { ok: missing.length===0, missing };
  }
}

// Commit order: checks availability and deducts only on success. Returns { success, order, missing }
export async function placeOrderForUser(uid, email, cartItems){
  try{
    // order envelope
    const order = {
      id: 'ORD_' + Math.random().toString(36).slice(2,9).toUpperCase(),
      date: new Date().toISOString(),
      items: cartItems.map(i=> ({ id:i.id, name:i.name, price:i.price, qty:i.qty, source: i.source || 'inventory' })),
      total: cartItems.reduce((s,i)=> s + i.price*i.qty, 0),
      delivered: false
    };

    await runTransaction(db, async (t)=>{
      // Firestore requires that all reads in a transaction happen before any writes.
      // First, perform all reads (t.get) for the items, collect snapshots.
      const refs = cartItems.map(c => ({
        item: c,
        collectionName: c.source || 'inventory',
        ref: doc(db, (c.source || 'inventory'), c.id)
      }));

      const snaps = [];
      for(const r of refs){
        const s = await t.get(r.ref);
        snaps.push(s);
      }

      // Validate availability based on the reads
      for(let i=0;i<refs.length;i++){
        const { item, collectionName } = refs[i];
        const snap = snaps[i];
        if(!snap.exists()) throw new Error(`Item ${item.id} not found in ${collectionName}`);
        const available = snap.data().stock;
        if(item.qty > available) throw new Error(`Insufficient stock for ${item.id}`);
      }

      // All reads completed and validated — now perform writes (decrements) and the order write
      for(let i=0;i<refs.length;i++){
        const { item } = refs[i];
        const snap = snaps[i];
        const available = snap.data().stock;
        t.update(refs[i].ref, { stock: available - item.qty });
      }

      const ordersRef = doc(collection(db, 'orders'), order.id);
      t.set(ordersRef, { ...order, email, uid });
    });

    return { success:true, order };
  }catch(e){
    const check = await checkAvailability(cartItems);
    return { success:false, missing: check.missing, message: e.message };
  }
}

export async function getOrdersForUser(uid){
  try{
    const snaps = await getDocs(collection(db, 'orders'));
    const all = snaps.docs.map(d=> d.data());
    return all.filter(o=> o.uid === uid).sort((a,b)=> new Date(b.date) - new Date(a.date));
  }catch(e){
    const raw = localStorage.getItem(ORDERS_KEY_PREFIX + (uid || 'guest'));
    return raw ? JSON.parse(raw) : [];
  }
}

export async function getInventorySnapshot(){
  try{
    const snaps = await getDocs(collection(db, 'inventory'));
    return snaps.docs.map(d=> d.data());
  }catch(e){
    return loadInventoryLocal();
  }
}
