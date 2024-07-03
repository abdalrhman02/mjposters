import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDhY4gyJVDb7iSyw9fx6vZrmXoAkzabJmQ",
  authDomain: "store-mjposters.firebaseapp.com",
  projectId: "store-mjposters",
  storageBucket: "store-mjposters.appspot.com",
  messagingSenderId: "517866204952",
  appId: "1:517866204952:web:1dc5d771bbc537cb39f86d",
  measurementId: "G-5JC3S5YLGT"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);