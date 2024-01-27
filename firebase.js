import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDAh4f78I5ce_l6HTP0IRqleX-PdK0sMbY",
    authDomain: "chat-a3869.firebaseapp.com",
    projectId: "chat-a3869",
    storageBucket: "chat-a3869.appspot.com",
    messagingSenderId: "284764268843",
    appId: "1:284764268843:web:a0b34386140c449191fd6e"
};


const app = firebase.initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const firestore = initializeFirestore(app, { experimentalForceLongPolling: true });
