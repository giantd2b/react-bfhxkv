import firebase from "firebase/app";
import "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDZzTdrthGb-hivohy3ydvNzevzsm_w5NY",
    authDomain: "test-firestore-e0f40.firebaseapp.com",
    projectId: "test-firestore-e0f40",
    storageBucket: "test-firestore-e0f40.appspot.com",
    messagingSenderId: "999914596514",
    appId: "1:999914596514:web:58902e38ab6baa88148ffb",
    measurementId: "G-2LRJY3BPBD"
  };
  // Initialize Firebase
 const firebaseApp = firebase.initializeApp(firebaseConfig);
export  default firebaseApp.firestore();
