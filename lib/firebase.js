import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApbDoxRevZu0bvft6V9ebjU0tNm7IhO-I",
  authDomain: "major-f50ed.firebaseapp.com",
  projectId: "major-f50ed",
  storageBucket: "major-f50ed.firebasestorage.app",
  messagingSenderId: "625332384505",
  appId: "1:625332384505:web:f392544deb5ac64a6b6828",
};

// Avoid re-initializing on every hot reload in dev
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
