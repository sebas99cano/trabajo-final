import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4BzHzJxt6a0RprFRyNhSMCouFITKsYuI",
  authDomain: "elfrontd3v.firebaseapp.com",
  projectId: "elfrontd3v",
  storageBucket: "elfrontd3v.appspot.com",
  messagingSenderId: "941100039124",
  appId: "1:941100039124:web:306f97b9aaaafa69cf3441",
  measurementId: "G-CPG9HS60SZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);

export default app;
