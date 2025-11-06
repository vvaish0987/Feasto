import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { createUserProfile, getUserProfileByUid } from '../services/usersService';

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
    const unsub = onAuthStateChanged(auth, async (u)=>{
      if(u){
        setUser({ uid: u.uid, email: u.email });
        // ensure a minimal users_uid document exists; helps when rules block legacy writes
        try{
          const existing = await getUserProfileByUid(u.uid);
          if(!existing){
            // create a minimal profile (do not block login if this fails)
            await createUserProfile(u.email, u.uid, { email: u.email });
          }
        }catch(err){
          console.warn('Could not ensure user profile on auth state change', err);
        }
      } else setUser(null);
      setLoading(false);
    });
    return () => unsub();
  },[]);

  async function register(email, password, profileData){
    // register accepts (email, password, profileData)
    try{
      if(!email || !password) throw new Error('Email and password required');
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // create a user profile document in Firestore keyed by email & uid
      try{
        const profile = { email, uid: res.user.uid, createdAt: new Date().toISOString(), ...(profileData || {}) };
        // use the usersService which surfaces errors
        await createUserProfile(email, res.user.uid, profileData || {});
      }catch(err){
        // If profile creation fails, surface a helpful message to the caller
        console.error('Failed to create user profile in Firestore:', err);
        // throw here so caller sees failure to persist profile (optional)
        throw new Error('Registered successfully but failed to save profile to Firestore: ' + (err.message || err));
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
