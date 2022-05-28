// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";

import { getFirestore } from "firebase/firestore"

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqBPnoRzl6W7tScsnwZH_VI3XYHROm5Rk",
  authDomain: "myproj-e60e7.firebaseapp.com",
  projectId: "myproj-e60e7",
  storageBucket: "myproj-e60e7.appspot.com",
  messagingSenderId: "289496930240",
  appId: "1:289496930240:web:bc82375165034eba659a25",
  measurementId: "G-E0YDW9XRJQ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
//const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export {app,db,storage}