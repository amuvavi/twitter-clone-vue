// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDBGtCBg52IJ_ziOuY3nOtbCysXPjedtu8',
  authDomain: 'qweet-34d05.firebaseapp.com',
  projectId: 'qweet-34d05',
  storageBucket: 'qweet-34d05.appspot.com',
  messagingSenderId: '32734121397',
  appId: '1:32734121397:web:13584fc18172812b7addfc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
