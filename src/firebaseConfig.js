import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDp1KVUUpzTKCsyE8xky6NDpkGXqQbprDw",
  authDomain: "chat-c68d1.firebaseapp.com",
  projectId: "chat-c68d1",
  storageBucket: "chat-c68d1.appspot.com",
  messagingSenderId: "984491571028",
  appId: "1:984491571028:web:1a8250f1b7d9ae3a37fac1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();