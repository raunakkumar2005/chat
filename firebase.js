import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC1OMqBM4Drw-hoZ7iV96baDdAweONaJ90",
    authDomain: "concise-crane-378915.firebaseapp.com",
    projectId: "concise-crane-378915",
    storageBucket: "concise-crane-378915.appspot.com",
    messagingSenderId: "647865362660",
    appId: "1:647865362660:web:3cee46f3441333ba30a4f1"
};


const app = firebase.initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const firestore = getFirestore(app, { experimentalAutoDetectLongPolling: true });
