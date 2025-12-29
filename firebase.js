// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvn3bH61I30YuzcfeaN46HwExzB4yR0jw",
  authDomain: "docker-ecom.firebaseapp.com",
  projectId: "docker-ecom",
  storageBucket: "docker-ecom.firebasestorage.app",
  messagingSenderId: "836920462176",
  appId: "1:836920462176:web:caa59cbb94932bef2c6c05",
  measurementId: "G-YY86YN8R5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const messaging = getMessaging(app);