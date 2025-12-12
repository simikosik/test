// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBYe-18u7baJdE1tWYtbUGt43bQJXbF5sk",
  authDomain: "kosikquest.firebaseapp.com",
  projectId: "kosikquest",
  storageBucket: "kosikquest.firebasestorage.app",
  messagingSenderId: "202773941964",
  appId: "1:202773941964:web:025499d92097094c1c3c69",
  measurementId: "G-KGY6QKG0ZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);