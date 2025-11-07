import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
// Firebase Firestore imports removed as they're not used
import { createUserProfile, getUserProfileByUid, getUserProfileByEmail } from '../services/usersService';

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
      case 'auth/popup-closed-by-user': return 'Sign-in popup was closed before completion.';
      case 'auth/cancelled-popup-request': return 'Sign-in was cancelled.';
      case 'auth/popup-blocked': return 'Sign-in popup was blocked by browser.';
      default: return err?.message || 'Authentication failed.';
    }
  }

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async (u)=>{
      if(u){
        // Try to load full profile from Firestore (prefer uid-keyed doc)
        try{
          let profile = await getUserProfileByUid(u.uid);
          if(!profile && u.email){
            // try legacy email-keyed document as a fallback
            profile = await getUserProfileByEmail(u.email);
          }
          if(profile){
            // ensure uid is present
            profile.uid = profile.uid || u.uid;
            setUser(profile);
          } else {
            // fallback: create a minimal profile and set it
            try{
              const created = await createUserProfile(u.email, u.uid, { email: u.email });
              setUser({ uid: u.uid, email: u.email, ...(created || {}) });
            }catch(createErr){
              console.warn('Could not create minimal profile:', createErr);
              setUser({ uid: u.uid, email: u.email });
            }
          }
        }catch(err){
          console.warn('Could not load user profile on auth state change', err);
          setUser({ uid: u.uid, email: u.email });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  },[]);

  async function register(email, password, profileData){
    // register accepts (email, password, profileData)
    try{
      if(!email || !password) throw new Error('Email and password required');
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      // Send email verification
      try{
        await sendEmailVerification(res.user);
        console.log('Verification email sent to:', email);
      }catch(verifyErr){
        console.warn('Failed to send verification email:', verifyErr);
        // Don't throw here, just log - user can still use the account
      }
      
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
      return { uid: res.user.uid, email: res.user.email, emailVerified: res.user.emailVerified };
    }catch(e){
      throw new Error(mapFirebaseError(e));
    }
  }

  async function login(email, password){
    try{
      if(!email || !password) throw new Error('Email and password required');
      const res = await signInWithEmailAndPassword(auth, email, password);
      return { uid: res.user.uid, email: res.user.email, emailVerified: res.user.emailVerified };
    }catch(e){
      throw new Error(mapFirebaseError(e));
    }
  }

  async function loginWithGoogle(){
    try{
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      
      // Check if user profile exists, if not create one
      try{
        let profile = await getUserProfileByUid(res.user.uid);
        if(!profile){
          // Create profile for new Google user
          const profileData = {
            name: res.user.displayName || '',
            phone: res.user.phoneNumber || ''
          };
          await createUserProfile(res.user.email, res.user.uid, profileData);
        }
      }catch(err){
        console.error('Failed to create/load Google user profile:', err);
      }
      
      return { uid: res.user.uid, email: res.user.email, emailVerified: res.user.emailVerified };
    }catch(e){
      throw new Error(mapFirebaseError(e));
    }
  }

  async function resetPassword(email){
    try{
      if(!email) throw new Error('Email is required');
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: 'Password reset email sent. Please check your inbox.' };
    }catch(e){
      throw new Error(mapFirebaseError(e));
    }
  }

  async function resendVerificationEmail(){
    try{
      const currentUser = auth.currentUser;
      if(!currentUser) throw new Error('No user is currently logged in');
      if(currentUser.emailVerified) throw new Error('Email is already verified');
      
      await sendEmailVerification(currentUser);
      return { success: true, message: 'Verification email sent. Please check your inbox.' };
    }catch(e){
      throw new Error(mapFirebaseError(e));
    }
  }

  async function logout(){
    await signOut(auth);
    setUser(null);
  }

  // Refresh the user's profile from Firestore and update local state.
  async function refreshProfile(){
    const current = auth.currentUser;
    if(!current) return null;
    try{
      let profile = await getUserProfileByUid(current.uid);
      if(!profile && current.email) profile = await getUserProfileByEmail(current.email);
      if(profile){
        profile.uid = profile.uid || current.uid;
        setUser(profile);
        return profile;
      }
      return null;
    }catch(e){
      console.warn('refreshProfile error', e);
      return null;
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      register, 
      login, 
      loginWithGoogle,
      resetPassword,
      resendVerificationEmail,
      logout, 
      loading, 
      refreshProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  return useContext(AuthContext);
}
