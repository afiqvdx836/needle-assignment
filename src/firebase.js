// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Make sure to import Firestore

// Your Firebase configuration (replace these with your actual Firebase project settings)
const firebaseConfig = {
    apiKey: "AIzaSyCHekR1RZWyJ-5p-VDZwOv1qWN3snAbb70",
    authDomain: "needle-assignment-cd425.firebaseapp.com",
    projectId: "needle-assignment-cd425",
    storageBucket: "needle-assignment-cd425.appspot.com",
    messagingSenderId: "382563198855",
    appId: "1:382563198855:web:f618e54ba874ec9d1d9522",
    measurementId: "G-J33WQ3WZ6D"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // This exports the Firestore instance as `db`
