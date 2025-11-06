import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function createUserProfile(email, uid, profileData={}){
  const profile = { email, uid, createdAt: new Date().toISOString(), ...profileData };
  // write both email-keyed and uid-keyed documents
  await setDoc(doc(db, 'users', email), profile, { merge:true });
  if(uid) await setDoc(doc(db, 'users_uid', uid), profile, { merge:true });
  return profile;
}

export async function getUserProfileByEmail(email){
  const snap = await getDoc(doc(db, 'users', email));
  return snap.exists() ? snap.data() : null;
}

export async function getUserProfileByUid(uid){
  const snap = await getDoc(doc(db, 'users_uid', uid));
  return snap.exists() ? snap.data() : null;
}
