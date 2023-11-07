import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBNspypkOUbWhaS1CjMuCmjofaDiBTb5nY",
    authDomain: "chat-ec449.firebaseapp.com",
    projectId: "chat-ec449",
    storageBucket: "chat-ec449.appspot.com",
    messagingSenderId: "895023880765",
    appId: "1:895023880765:web:3a2af55543bf794c596854",
    measurementId: "G-CKZ4N4DY65"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);