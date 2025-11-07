import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const CartContext = createContext();

function storageKey(uid, type){
  const t = type || 'guest';
  return uid ? `feasto_cart_uid_${uid}_${t}` : `feasto_cart_guest_${t}`;
}

export function CartProvider({ children }){
  const { user } = useAuth() || {};
  const [food, setFood] = useState([]);
  const [grocery, setGrocery] = useState([]);
  const [synced, setSynced] = useState(false); // whether we've loaded server/local initial cart for this session
  const [dirtyFood, setDirtyFood] = useState(false);
  const [dirtyGrocery, setDirtyGrocery] = useState(false);

  // merge guest carts into user cart (both food and grocery)
  useEffect(()=>{
    let unsub = null;

    async function mergeGuestToUserCart(userUid){
      try{
        const guestFoodRaw = localStorage.getItem(storageKey(null,'food'));
        const guestGrocRaw = localStorage.getItem(storageKey(null,'grocery'));
        const guestFood = guestFoodRaw ? JSON.parse(guestFoodRaw) : [];
        const guestGroc = guestGrocRaw ? JSON.parse(guestGrocRaw) : [];

        const userRef = doc(db, 'carts', userUid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.exists() ? userSnap.data() : null;
  const mergedFood = userData && userData.food ? [...userData.food] : [];
  const mergedGrocery = userData && userData.grocery ? [...userData.grocery] : [];

  // Coerce quantities to numbers to avoid string/NaN issues from Firestore/localStorage
  const coerceQty = (arr)=> (arr || []).map(i=> ({ ...i, qty: Number(i.qty || 0) }));
  for(let i=0;i<mergedFood.length;i++) mergedFood[i] = coerceQty([mergedFood[i]])[0];
  for(let i=0;i<mergedGrocery.length;i++) mergedGrocery[i] = coerceQty([mergedGrocery[i]])[0];
  for(let i=0;i<guestFood.length;i++) guestFood[i] = coerceQty([guestFood[i]])[0];
  for(let i=0;i<guestGroc.length;i++) guestGroc[i] = coerceQty([guestGroc[i]])[0];

        for(const g of guestFood){
          const found = mergedFood.find(x=> x.id===g.id);
          if(found) found.qty = (found.qty || 0) + (g.qty || 0);
          else mergedFood.push(g);
        }
        for(const g of guestGroc){
          const found = mergedGrocery.find(x=> x.id===g.id);
          if(found) found.qty = (found.qty || 0) + (g.qty || 0);
          else mergedGrocery.push(g);
        }
        // include owner metadata so each user's cart doc explicitly contains their uid (and can include email)
        // Avoid overwriting existing server cart with empty arrays when guest cart is empty
        const dataToWrite = { uid: userUid };
        if(guestFood.length > 0 || mergedFood.length > 0) dataToWrite.food = mergedFood;
        if(guestGroc.length > 0 || mergedGrocery.length > 0) dataToWrite.grocery = mergedGrocery;
        // Only write if there's something meaningful to persist (avoid writing only empty arrays)
        if(Object.keys(dataToWrite).length > 1){
          await setDoc(userRef, dataToWrite, { merge: true });
        }
        // update local state and per-user backups so UI doesn't flash and quantities persist
        try{
          if(mergedFood) {
            setFood(mergedFood);
            localStorage.setItem(storageKey(userUid,'food'), JSON.stringify(mergedFood));
          }
          if(mergedGrocery) {
            setGrocery(mergedGrocery);
            localStorage.setItem(storageKey(userUid,'grocery'), JSON.stringify(mergedGrocery));
          }
        }catch(e){ console.warn('Failed to persist merged cart locally', e); }
        // clear guest carts
        localStorage.removeItem(storageKey(null,'food'));
        localStorage.removeItem(storageKey(null,'grocery'));
        // we've completed initial merge/load
        setSynced(true);
        setDirtyFood(false);
        setDirtyGrocery(false);
      }catch(err){
        console.warn('Failed to merge guest carts to user cart', err);
  // even on error, mark synced so we don't overwrite server cart with empty arrays
  setSynced(true);
  setDirtyFood(false);
  setDirtyGrocery(false);
      }
    }

    if(user?.uid){
      mergeGuestToUserCart(user.uid);

      const d = doc(db, 'carts', user.uid);
      unsub = onSnapshot(d, (snap)=>{
        if(snap.exists()){
          const data = snap.data();
          // coerce quantities and persist a local backup for this user
          const coerce = (arr)=> (arr||[]).map(i=> ({ ...i, qty: Number(i.qty || 0) }));
          const foods = coerce(data.food);
          const grocs = coerce(data.grocery);
          setFood(foods);
          setGrocery(grocs);
          try{
            localStorage.setItem(storageKey(user.uid,'food'), JSON.stringify(foods));
            localStorage.setItem(storageKey(user.uid,'grocery'), JSON.stringify(grocs));
          }catch(e){ /* ignore localStorage errors */ }
        } else {
          setFood([]); setGrocery([]);
        }
        // mark that we've received initial server snapshot
        setSynced(true);
        // clear dirty flags because server is authoritative until user makes changes
        setDirtyFood(false);
        setDirtyGrocery(false);
      }, (err)=>{
        console.error('Cart onSnapshot error', err);
        // fallback to local
        try{ const f = localStorage.getItem(storageKey(user.uid,'food')); if(f) setFood(JSON.parse(f)); }catch(e){}
        try{ const g = localStorage.getItem(storageKey(user.uid,'grocery')); if(g) setGrocery(JSON.parse(g)); }catch(e){}
  setSynced(true);
  setDirtyFood(false);
  setDirtyGrocery(false);
      });
    } else {
      try{ const f = localStorage.getItem(storageKey(null,'food')); if(f) setFood(JSON.parse(f)); else setFood([]); }catch(e){ setFood([]); }
      try{ const g = localStorage.getItem(storageKey(null,'grocery')); if(g) setGrocery(JSON.parse(g)); else setGrocery([]); }catch(e){ setGrocery([]); }
      // guest is effectively synced to local storage
      setSynced(true);
    }

    return ()=>{ if(unsub) unsub(); };
  },[user?.uid]);

  // persist changes
  useEffect(()=>{
    if(user?.uid){
      // only persist to Firestore after we've synced initial state to avoid overwriting server carts with transient empty arrays
      // and only when the user has actively modified the cart (dirty flags)
      if(!synced) return;
      if(!(dirtyFood || dirtyGrocery)) return;
      const d = doc(db, 'carts', user.uid);
      // write owner metadata with the cart so carts are explicitly tied to a user
      // persist to Firestore and also keep a local per-user backup so logout/login won't lose data
      setDoc(d, { uid: user.uid, email: user.email || null, food, grocery }, { merge: true })
        .then(()=>{
          // after successful write, clear dirty flags
          setDirtyFood(false); setDirtyGrocery(false);
        })
        .catch((e)=>{ console.error('Failed to persist cart to Firestore', e); });
      try{
        localStorage.setItem(storageKey(user.uid,'food'), JSON.stringify(food));
        localStorage.setItem(storageKey(user.uid,'grocery'), JSON.stringify(grocery));
      }catch(e){ /* ignore localStorage errors */ }
    } else {
      // guest carts
      try{ localStorage.setItem(storageKey(null,'food'), JSON.stringify(food)); }catch(e){}
      try{ localStorage.setItem(storageKey(null,'grocery'), JSON.stringify(grocery)); }catch(e){}
    }
  },[food, grocery, user?.uid, user?.email, synced, dirtyFood, dirtyGrocery]);

  function addItem(item, qty=1, type='food'){
    if(type==='grocery'){
      setGrocery(prev=>{
        const found = prev.find(p=>p.id===item.id);
        if(found) {
          setDirtyGrocery(true);
          return prev.map(p=> p.id===item.id ? { ...p, qty: (Number(p.qty||0) + Number(qty||0)) } : p);
        }
        setDirtyGrocery(true);
        return [...prev, { ...item, qty: Number(qty||0) }];
      });
    } else {
      setFood(prev=>{
        const found = prev.find(p=>p.id===item.id);
        if(found) {
          setDirtyFood(true);
          return prev.map(p=> p.id===item.id ? { ...p, qty: (Number(p.qty||0) + Number(qty||0)) } : p);
        }
        setDirtyFood(true);
        return [...prev, { ...item, qty: Number(qty||0) }];
      });
    }
  }

  function updateQty(id, qty, type='food'){
    const n = Number(qty || 0);
    if(type==='grocery'){ setGrocery(prev=> prev.map(i=> i.id===id? {...i, qty: n}: i)); setDirtyGrocery(true); }
    else { setFood(prev=> prev.map(i=> i.id===id? {...i, qty: n}: i)); setDirtyFood(true); }
  }

  function removeItem(id, type='food'){
    if(type==='grocery'){ setGrocery(prev=> prev.filter(i=> i.id!==id)); setDirtyGrocery(true); }
    else { setFood(prev=> prev.filter(i=> i.id!==id)); setDirtyFood(true); }
  }

  function clear(type){
    if(type==='grocery'){ setGrocery([]); setDirtyGrocery(true); }
    else if(type==='food'){ setFood([]); setDirtyFood(true); }
    else { setFood([]); setGrocery([]); setDirtyFood(true); setDirtyGrocery(true); }
  }

  const totalFood = food.reduce((s,i)=> s + (i.price||0) * (i.qty||0), 0);
  const totalGrocery = grocery.reduce((s,i)=> s + (i.price||0) * (i.qty||0), 0);

  return (
    <CartContext.Provider value={{ food, grocery, addItem, updateQty, removeItem, clear, totalFood, totalGrocery }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){ return useContext(CartContext); }
