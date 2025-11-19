
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// =================================================================================
// IMPORTANT SECURITY WARNING
// =================================================================================
// This file now contains your secret Firebase keys.
//
// 1. PASTE YOUR KEYS: Replace the placeholder values below with the actual
//    `firebaseConfig` object you copied from the Firebase console.
//
// 2. DO NOT COMMIT TO A PUBLIC REPOSITORY: If your code is on a public GitHub
//    repository, anyone can see these keys and misuse your Firebase project.
//    It is STRONGLY recommended that you keep your repository private.
//
// For a more secure setup in the future, consider adding a build tool like Vite,
// which can properly handle environment variables.
// =================================================================================

  const firebaseConfig = {
    apiKey: "AIzaSyDAaX8so7wzwuhuWHeNN8CXWfHnXx9dREQ",
    authDomain: "port-82839.firebaseapp.com",
    projectId: "port-82839",
    storageBucket: "port-82839.firebasestorage.app",
    messagingSenderId: "463866065220",
    appId: "1:463866065220:web:775b841f67d43b64e8a711"
  };

// Only initialize if config is present and placeholders are replaced
const isConfigured = firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("PASTE_");

let app = null;
let auth = null;
let db = null;

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase initialization failed. The app will run in offline mode.", error);
    // app, auth, and db will remain null, allowing graceful degradation.
  }
}

export { auth, db };
