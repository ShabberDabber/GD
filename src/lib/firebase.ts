import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let firebaseApp: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

try {
  // Use a type cast to safely access import.meta.env without requiring global type definitions
  const env = (import.meta as any).env;
  const firebaseConfigStr = env ? env.VITE_FIREBASE_CONFIG : null;
  
  if (firebaseConfigStr) {
    const firebaseConfig = JSON.parse(firebaseConfigStr);
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
  } else {
    console.warn("Firebase config not found. Using localStorage.");
  }
} catch (e) {
  console.error("Error initializing Firebase:", e);
}

export { auth, db };