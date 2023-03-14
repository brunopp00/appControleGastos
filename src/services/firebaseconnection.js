import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBwOgE713_TC0AWUekgGqzt8sZXPNaiMuM",
  authDomain: "controledegastos-b6d03.firebaseapp.com",
  projectId: "controledegastos-b6d03",
  storageBucket: "controledegastos-b6d03.appspot.com",
  messagingSenderId: "60385698443",
  appId: "1:60385698443:web:44832d4c59c48af9dd2a8e",
  measurementId: "G-PWB063TQQF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)