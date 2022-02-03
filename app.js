import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyCJdfhVE1hd7QBMLgksySdFaahdlvg0L5Y",
  authDomain: "first-firebase-project-a6b0d.firebaseapp.com",
  projectId: "first-firebase-project-a6b0d",
  storageBucket: "first-firebase-project-a6b0d.appspot.com",
  messagingSenderId: "383557068263",
  appId: "1:383557068263:web:8fb64c4bfe5f50b3c3c942",
  measurementId: "G-7QZ8HSQDRB"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)