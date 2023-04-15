// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD463tvccJo2IvDyArj3YXWff9TQ-aft0M",
    authDomain: "users-70a0e.firebaseapp.com",
    projectId: "users-70a0e",
    storageBucket: "users-70a0e.appspot.com",
    messagingSenderId: "54322425067",
    appId: "1:54322425067:web:e247054e277d4b9a1a22ae",
    measurementId: "G-W3HG6Q6102",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };