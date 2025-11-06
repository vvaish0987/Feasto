import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function createUserProfile(email, uid, profileData={}){
  const profile = { email, uid, createdAt: new Date().toISOString(), ...profileData };
  // write both email-keyed and uid-keyed documents
  try{
    await setDoc(doc(db, 'users', email), profile, { merge:true });
  }catch(e){
    // surface error but continue to try uid write
    console.warn('createUserProfile: failed to write users/{email}', e);
    throw e;
  }
  if(uid){
    try{
      await setDoc(doc(db, 'users_uid', uid), profile, { merge:true });
    }catch(e){
      console.warn('createUserProfile: failed to write users_uid/{uid}', e);
      throw e;
    }
  }
  return profile;
}

export async function getUserProfileByEmail(email){
  try{
    const snap = await getDoc(doc(db, 'users', email));
    return snap.exists() ? snap.data() : null;
  }catch(e){
    console.warn('getUserProfileByEmail error', e);
    return null;
  }
}

export async function getUserProfileByUid(uid){
  try{
    const snap = await getDoc(doc(db, 'users_uid', uid));
    return snap.exists() ? snap.data() : null;
  }catch(e){
    console.warn('getUserProfileByUid error', e);
    return null;
  }
}
