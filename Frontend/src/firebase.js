
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore'; // If you're using Firestore
import 'firebase/compat/database'; // If you're using the Realtime Database



const firebaseConfig = {
    apiKey: "AIzaSyD3a8AUWAIHoCxGkqGWlBgXlWWbwrYJ_is",
    authDomain: "messagingapplication-6f600.firebaseapp.com",
    projectId: "messagingapplication-6f600",
    storageBucket: "messagingapplication-6f600.appspot.com",
    messagingSenderId: "324585667911",
    appId: "1:324585667911:web:66b5b34cf3fe7bac972062"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig)
  const db= firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export { auth, provider }
  export default db