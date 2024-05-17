// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import {  getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1CJjz4IYs-c6gl9RuoLwbIeXOQ8me7UA",
  authDomain: "ichat-adfb5.firebaseapp.com",
  projectId: "ichat-adfb5",
  storageBucket: "ichat-adfb5.appspot.com",
  messagingSenderId: "626146462198",
  appId: "1:626146462198:web:5d6aebd1af68509c341fd7",
  measurementId: "G-RKSGWLGEEN"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();