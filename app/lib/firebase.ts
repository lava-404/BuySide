// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClFgX0ThqEIWFHTjeMwDh4fPAPR_K6Urc",
  authDomain: "buyside-1.firebaseapp.com",
  projectId: "buyside-1",
  storageBucket: "buyside-1.firebasestorage.app",
  messagingSenderId: "964457778531",
  appId: "1:964457778531:web:08fef49f6bdf1b869b9756",
  measurementId: "G-YPEH183SC6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth = getAuth(app);

 export { auth }