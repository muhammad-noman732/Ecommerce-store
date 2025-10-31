// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "loginonecart-b3c29.firebaseapp.com",
  projectId: "loginonecart-b3c29",
  storageBucket: "loginonecart-b3c29.firebasestorage.app",
  messagingSenderId: "1047370339620",
  appId: "1:1047370339620:web:1a098ec31d41114b110fb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}