import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "mern-movie-techfriar.firebaseapp.com",
  projectId: "mern-movie-techfriar",
  storageBucket: "mern-movie-techfriar.appspot.com",
  messagingSenderId: "750686408293",
  appId: "1:750686408293:web:37c101cdb2a3e41989408c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);