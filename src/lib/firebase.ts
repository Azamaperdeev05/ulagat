import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQ6-fivDVDzIDISkoBvYRcf77P4I_m0mA",
  authDomain: "ulagat-club.firebaseapp.com",
  projectId: "ulagat-club",
  storageBucket: "ulagat-club.firebasestorage.app",
  messagingSenderId: "1056697218871",
  appId: "1:1056697218871:web:5d686e816209e12e5b4cb2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
