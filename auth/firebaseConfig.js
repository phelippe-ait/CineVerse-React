import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAWE8ibKeKZR7K3YHBrub8ruNe0_jWQyH4",
  authDomain: "cineverse-b6e92.firebaseapp.com",
  projectId: "cineverse-b6e92",
  storageBucket: "cineverse-b6e92.firebasestorage.app",
  messagingSenderId: "1028828582842",
  appId: "1:1028828582842:web:8b61b730f404544407be52",
  measurementId: "G-RYHNME43NL",
};

const app = initializeApp(firebaseConfig);
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const db = getFirestore(app);
export const auth = getAuth(app);

