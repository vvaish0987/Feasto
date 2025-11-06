import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function mapFirebaseError(err){
    const code = err?.code || '';
    switch(code){
      case 'auth/email-already-in-use': return 'This email is already registered.';
      case 'auth/invalid-email': return 'Invalid email address.';
      case 'auth/weak-password': return 'Password is too weak (min 6 chars).';
      case 'auth/operation-not-allowed': return 'Email/password sign-in is disabled in Firebase. Enable it in the Firebase Console.';
      case 'auth/wrong-password': return 'Incorrect password.';
      case 'auth/user-not-found': return 'No account found with this email.';
      default: return err?.message || 'Authentication failed.';
    }
  }

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=>{
      if(u) setUser({ uid: u.uid, email: u.email });
      else setUser(null);
      setLoading(false);
    });
    return () => unsub();
  },[]);

  async function register(email, password, profileData){
    // register accepts (email, password, profileData)
    try{
      if(!email || !password) throw new Error('Email and password required');
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // create a user profile document in Firestore keyed by email
      try{
        const profile = { email, uid: res.user.uid, createdAt: new Date().toISOString(), ...(profileData || {}) };
        // write both by email and by uid to make reads/writes robust regardless of rules
        await setDoc(doc(db, 'users', email), profile, { merge: true });
        await setDoc(doc(db, 'users_uid', res.user.uid), profile, { merge: true });
      }catch(err){
        // Log the error but don't fail the registration — profile creation may be blocked by rules.
        console.warn('Failed to create user profile in Firestore (non-fatal):', err);
      }
      return { uid: res.user.uid, email: res.user.email };
    }catch(e){
      throw new Error(mapFirebaseError(e));
    }
  }

  async function login(email, password){
    try{
      if(!email || !password) throw new Error('Email and password required');
      const res = await signInWithEmailAndPassword(auth, email, password);
      return { uid: res.user.uid, email: res.user.email };
    }catch(e){
      throw new Error(mapFirebaseError(e));
    }
  }

  async function logout(){
    await signOut(auth);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  return useContext(AuthContext);
}
