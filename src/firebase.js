import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQk8JuoCPspz2sv4Q9eCMoXDFjLTcmPe0",
  authDomain: "react-chat-app-17a59.firebaseapp.com",
  databaseURL:
    "https://react-chat-app-17a59-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-chat-app-17a59",
  storageBucket: "react-chat-app-17a59.appspot.com",
  messagingSenderId: "534457357879",
  appId: "1:534457357879:web:5d704954e060c5f3b391b2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
