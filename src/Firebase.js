import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAYQ9iSXHZNKhW4KEZEAluPZwrNHyQUggg",
  authDomain: "swiggy-49a33.firebaseapp.com",
  projectId: "swiggy-49a33",
  storageBucket: "swiggy-49a33.appspot.com",
  messagingSenderId: "496797264934",
  appId: "1:496797264934:web:77a598c3b25a17a10e4ae7",
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase