import {initializeApp} from 'firebase/app';
import { getAuth,} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyBorbavd3_oAFrCDfvZy9SlYoa39PhQ8o4",
    authDomain: "challenge-21061.firebaseapp.com",
    projectId: "challenge-21061",
    storageBucket: "challenge-21061.appspot.com",
    messagingSenderId: "433107107443",
    appId: "1:433107107443:web:bc9f93fea587bbb13a3406",
    measurementId: "G-6SN0K12JDF"
  };

  const app  = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  export {db,auth};