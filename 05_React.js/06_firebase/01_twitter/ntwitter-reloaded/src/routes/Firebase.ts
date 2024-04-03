import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXzeERkCM-tBNy5xzA6gCbgiNQJ01r7-c",
  authDomain: "nwitter-reloaded-9e20b.firebaseapp.com",
  projectId: "nwitter-reloaded-9e20b",
  storageBucket: "nwitter-reloaded-9e20b.appspot.com",
  messagingSenderId: "987514417101",
  appId: "1:987514417101:web:acf52c3e76d15932891e84",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
