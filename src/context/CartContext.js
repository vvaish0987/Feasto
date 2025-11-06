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
        const userData = userSnap.exists() ? userSnap.data() : { food: [], grocery: [] };
        const mergedFood = [...userData.food || []];
        const mergedGrocery = [...userData.grocery || []];

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

        await setDoc(userRef, { food: mergedFood, grocery: mergedGrocery }, { merge: true });
        // clear guest carts
        localStorage.removeItem(storageKey(null,'food'));
        localStorage.removeItem(storageKey(null,'grocery'));
      }catch(err){
        console.warn('Failed to merge guest carts to user cart', err);
      }
    }

    if(user?.uid){
      mergeGuestToUserCart(user.uid);

      const d = doc(db, 'carts', user.uid);
      unsub = onSnapshot(d, (snap)=>{
        if(snap.exists()){
          const data = snap.data();
          setFood(data.food || []);
          setGrocery(data.grocery || []);
        } else {
          setFood([]); setGrocery([]);
        }
      }, ()=>{
        // fallback to local
        try{ const f = localStorage.getItem(storageKey(user.uid,'food')); if(f) setFood(JSON.parse(f)); }catch(e){}
        try{ const g = localStorage.getItem(storageKey(user.uid,'grocery')); if(g) setGrocery(JSON.parse(g)); }catch(e){}
      });
    } else {
      try{ const f = localStorage.getItem(storageKey(null,'food')); if(f) setFood(JSON.parse(f)); else setFood([]); }catch(e){ setFood([]); }
      try{ const g = localStorage.getItem(storageKey(null,'grocery')); if(g) setGrocery(JSON.parse(g)); else setGrocery([]); }catch(e){ setGrocery([]); }
    }

    return ()=>{ if(unsub) unsub(); };
  },[user?.uid]);

  // persist changes
  useEffect(()=>{
    if(user?.uid){
      const d = doc(db, 'carts', user.uid);
      setDoc(d, { food, grocery }, { merge: true }).catch(()=>{});
    } else {
      localStorage.setItem(storageKey(null,'food'), JSON.stringify(food));
      localStorage.setItem(storageKey(null,'grocery'), JSON.stringify(grocery));
    }
  },[food, grocery, user?.uid]);

  function addItem(item, qty=1, type='food'){
    if(type==='grocery'){
      setGrocery(prev=>{
        const found = prev.find(p=>p.id===item.id);
        if(found) return prev.map(p=> p.id===item.id ? { ...p, qty: p.qty + qty } : p);
        return [...prev, { ...item, qty }];
      });
    } else {
      setFood(prev=>{
        const found = prev.find(p=>p.id===item.id);
        if(found) return prev.map(p=> p.id===item.id ? { ...p, qty: p.qty + qty } : p);
        return [...prev, { ...item, qty }];
      });
    }
  }

  function updateQty(id, qty, type='food'){
    if(type==='grocery') setGrocery(prev=> prev.map(i=> i.id===id? {...i, qty}: i));
    else setFood(prev=> prev.map(i=> i.id===id? {...i, qty}: i));
  }

  function removeItem(id, type='food'){
    if(type==='grocery') setGrocery(prev=> prev.filter(i=> i.id!==id));
    else setFood(prev=> prev.filter(i=> i.id!==id));
  }

  function clear(type){ if(type==='grocery'){ setGrocery([]); } else if(type==='food'){ setFood([]); } else { setFood([]); setGrocery([]); } }

  const totalFood = food.reduce((s,i)=> s + (i.price||0) * (i.qty||0), 0);
  const totalGrocery = grocery.reduce((s,i)=> s + (i.price||0) * (i.qty||0), 0);

  return (
    <CartContext.Provider value={{ food, grocery, addItem, updateQty, removeItem, clear, totalFood, totalGrocery }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){ return useContext(CartContext); }
