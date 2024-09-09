// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBah7xI-FJUDq8orvy19rgLqHbV1OI-JZk",
  authDomain: "travel-genie-d9066.firebaseapp.com",
  projectId: "travel-genie-d9066",
  storageBucket: "travel-genie-d9066.appspot.com",
  messagingSenderId: "1079256136824",
  appId: "1:1079256136824:web:f4d5d827413ae05688818d",
  measurementId: "G-X70MHRF15E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);