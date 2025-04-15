
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBINcsKebV2JLR06E10flDSKKqVWGHaeNY",
  authDomain: "skipq-f36ce.firebaseapp.com",
  projectId: "skipq-f36ce",
  storageBucket: "skipq-f36ce.firebaseestorage.app",
  messagingSenderId: "667114610386",
  appId: "1:667114610386:web:b9e731427976d66cb4970b",
  measurementId: "G-JHVZKF7Y7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
