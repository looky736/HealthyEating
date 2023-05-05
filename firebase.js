// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
// import {initializeAuth, getReactNativePersistance} from '@firebase/auth/react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDosY_TlLWE380e7VNRoc26aCXVB7D1-7Y",
  authDomain: "fir-auth2-c3d58.firebaseapp.com",
  projectId: "fir-auth2-c3d58",
  storageBucket: "fir-auth2-c3d58.appspot.com",
  messagingSenderId: "471379585915",
  appId: "1:471379585915:web:488d423d8af24bbbd9abde",
  databaseURL: "https://fir-auth2-c3d58-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

// const auth = firebase.initializeAuth(app, {
//     persistence: getReactNativePersistance(AsyncStorage)
// })

const database = firebase.database()

function getDate(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export { auth, database, getDate };