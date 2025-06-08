// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5dgXdrZzGsFfS-vy7Nu3J_dmzTW4uXM0",
  authDomain: "satria-realtimetrack.firebaseapp.com",
  databaseURL: "https://satria-realtimetrack-default-rtdb.firebaseio.com",
  projectId: "satria-realtimetrack",
  storageBucket: "satria-realtimetrack.firebasestorage.app",
  messagingSenderId: "512315811014",
  appId: "1:512315811014:web:fea93d75176384a3e2a3c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue };
export { firebaseConfig };