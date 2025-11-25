
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let firebaseApp: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

try {
  const firebaseConfigStr = (import.meta as any).env.VITE_FIREBASE_CONFIG;
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