
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyATGyWZ01lTtUrAy86SuU4yOOyBGghpAcQ",
  authDomain: "reactlinks-7d78b.firebaseapp.com",
  projectId: "reactlinks-7d78b",
  storageBucket: "reactlinks-7d78b.appspot.com",
  messagingSenderId: "178216598731",
  appId: "1:178216598731:web:074d3bc00ac36eccffef4e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export { auth, db };