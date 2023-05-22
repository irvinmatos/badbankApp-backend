// Import the functions you need from the SDKs you need

//import firebase from 'firebase-app';
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

//import { initializeApp } from "firebase/app";
var initializeApp = require('firebase/app');
const  {useAuthState} = require('react-firebase-hooks/auth');
var { GoogleAuthProvider, getAuth, signInWithPopup } = require('firebase/auth');
var { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } = require('firebase/auth');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUjmV8JvY1_gKvIYFN0e41xNCnq87Aqb4",
  authDomain: "badbankapp-74313.firebaseapp.com",
  databaseURL: "https://badbankapp-74313-default-rtdb.firebaseio.com",
  projectId: "badbankapp-74313",
  storageBucket: "badbankapp-74313.appspot.com",
  messagingSenderId: "547252267483",
  appId: "1:547252267483:web:5eaaa6c36161bae95fdffe"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

module.exports = {
  auth,
  db,
  app,
  signInWithGoogle,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  useAuthState
};