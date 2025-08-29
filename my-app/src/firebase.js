// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // ✅ import Realtime DB

const firebaseConfig = {
  apiKey: "AIzaSyCCnRY7ABWC2FYX8B4v7otK-ZJBsfqHPZw",
  authDomain: "turfground-app.firebaseapp.com",
  databaseURL: "https://turfground-app-default-rtdb.firebaseio.com/", // ✅ add this
  projectId: "turfground-app",
  storageBucket: "turfground-app.appspot.com",
  messagingSenderId: "337356857200",
  appId: "1:337356857200:web:bdf7a4957e6d31cf5bb9b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const realtimeDb = getDatabase(app); // ✅ initialize Realtime Database

// Export
export { app, db, auth, realtimeDb };
export default app;
