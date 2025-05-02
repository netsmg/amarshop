// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZC-buVhG9GkefVodM9Ku-jeD_kxdOBCM",
  authDomain: "webuinet.firebaseapp.com",
  databaseURL: "https://webuinet-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webuinet",
  storageBucket: "webuinet.appspot.com",
  messagingSenderId: "591886980663",
  appId: "1:591886980663:web:51eb2a39cb869d792711b2",
  measurementId: "G-NEE9ZLKHHE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage= getStorage(app);
