import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC_jfBPrNlYBN3_IJqNGc_0g7yk8y1_uyQ",
    authDomain: "holyday-photos.firebaseapp.com",
    projectId: "holyday-photos",
    storageBucket: "holyday-photos.appspot.com",
    messagingSenderId: "529865824213",
    appId: "1:529865824213:web:1e12a46061a33ce1840f5c"
};
  

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };
