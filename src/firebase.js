// Firebase initialization and exports
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB1_3xFa1d2-uZqcfhZCAzD5-Y_tXB1JhY",
  authDomain: "feasto-b9e9d.firebaseapp.com",
  projectId: "feasto-b9e9d",
  // storageBucket should usually be '<project>.appspot.com'
  storageBucket: "feasto-b9e9d.appspot.com",
  messagingSenderId: "282876161953",
  appId: "1:282876161953:web:d6cb2bda17aaaf4e5ce5e0",
  measurementId: "G-76860MN3QX"
};

const app = initializeApp(firebaseConfig);

// helpful debug log
console.log('Feasto Firebase init:', { projectId: firebaseConfig.projectId, authDomain: firebaseConfig.authDomain });

let analytics;
try{ analytics = getAnalytics(app); }catch(e){ /* analytics may not be available in some envs */ }

const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
