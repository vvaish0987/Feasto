import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const CartContext = createContext();

function storageKey(uid){
  return uid ? `feasto_cart_uid_${uid}` : `feasto_cart_guest`;
}

export function CartProvider({ children }){
  const { user } = useAuth() || {};
  const [items, setItems] = useState([]);

  // load cart: if user present, try Firestore, else localStorage
  useEffect(()=>{
    let unsub = null;
    async function mergeGuestToUserCart(userUid){
      try{
        const guestRaw = localStorage.getItem(storageKey(null));
        const guest = guestRaw ? JSON.parse(guestRaw) : [];
        const userRef = doc(db, 'carts', userUid);
        const userSnap = await getDoc(userRef);
        const userCart = userSnap.exists() ? (userSnap.data().items || []) : [];
        // merge by summing quantities
        const merged = [...userCart];
        for(const g of guest){
          const found = merged.find(x=> x.id===g.id);
          if(found) found.qty = (found.qty || 0) + (g.qty || 0);
          else merged.push(g);
        }
        await setDoc(userRef, { items: merged }, { merge: true });
        // clear guest cart after successful merge
        localStorage.removeItem(storageKey(null));
      }catch(err){
        // keep silent; user still has their guest cart locally
        console.warn('Failed to merge guest cart to user cart', err);
      }
    }

    if(user?.uid){
      // attempt merge of guest cart to user cart
      mergeGuestToUserCart(user.uid);

      const d = doc(db, 'carts', user.uid);
      // try real-time sync
      unsub = onSnapshot(d, (snap)=>{
        if(snap.exists()){
          setItems(snap.data().items || []);
        } else {
          setItems([]);
        }
      }, ()=>{
        // on error, fallback to localStorage
        const raw = localStorage.getItem(storageKey(user.uid));
        if(raw) setItems(JSON.parse(raw));
      });
    } else {
      try{
        const raw = localStorage.getItem(storageKey(null));
        if(raw) setItems(JSON.parse(raw)); else setItems([]);
      }catch(e){ setItems([]); }
    }

    return ()=>{ if(unsub) unsub(); };
  },[user?.uid]);

  // persist: when items change, write to Firestore if user present, else localStorage
  useEffect(()=>{
    if(user?.uid){
      const d = doc(db, 'carts', user.uid);
      setDoc(d, { items }, { merge: true }).catch(()=>{/* ignore errors for now */});
    } else {
      localStorage.setItem(storageKey(null), JSON.stringify(items));
    }
  },[items, user?.uid]);

  function addItem(item, qty=1){
    setItems(prev=>{
      const found = prev.find(p=>p.id===item.id);
      if(found) return prev.map(p=> p.id===item.id ? { ...p, qty: p.qty + qty } : p);
      return [...prev, { ...item, qty }];
    });
  }

  function updateQty(id, qty){
    setItems(prev=> prev.map(i=> i.id===id? {...i, qty}: i));
  }

  function removeItem(id){
    setItems(prev=> prev.filter(i=> i.id!==id));
  }

  function clear(){ setItems([]); }

  const total = items.reduce((s,i)=> s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){ return useContext(CartContext); }
