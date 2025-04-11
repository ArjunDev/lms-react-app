// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // if you're using Auth
import { getFirestore } from 'firebase/firestore'; // if you're using Firestore
import { getStorage } from 'firebase/storage'; // if you're using Storage

 const  firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // optional
};

// console.log(import.meta.env.VITE_FIREBASE_API_KEY)
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// export default firebaseConfig;

// Optional: export any services you use
const firebaseAuth = getAuth(firebaseApp);
const firebaseDb = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

export { firebaseApp, firebaseAuth, firebaseDb, firebaseStorage };
