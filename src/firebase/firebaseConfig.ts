// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU1tPjSMzHIYT1phRBTjhcYLvZR1XEJjU",
  authDomain: "timd-pointing-system.firebaseapp.com",
  databaseURL:
    "https://timd-pointing-system-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "timd-pointing-system",
  storageBucket: "timd-pointing-system.appspot.com",
  messagingSenderId: "1023026602000",
  appId: "1:1023026602000:web:59b42424bc46f89d022a95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
