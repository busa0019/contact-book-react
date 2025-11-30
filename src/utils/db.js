// Import SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWsM2fOIlxsPJwvHSGcpAsgFmF27R0yJI",
  authDomain: "mtm6404-contact-book-busa0019.firebaseapp.com",
  projectId: "mtm6404-contact-book-busa0019",
  storageBucket: "mtm6404-contact-book-busa0019.firebasestorage.app",
  messagingSenderId: "984992092748",
  appId: "1:984992092748:web:cf11c6b01342c02c305ae9",
  measurementId: "G-7G6K2EBB79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export the database
export default db;