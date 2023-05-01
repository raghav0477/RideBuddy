import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCannp1vvt6plUBNGiZN063c5795WZTTV8",
  authDomain: "ridebuddy-6.firebaseapp.com",
  projectId: "ridebuddy-6",
  storageBucket: "ridebuddy-6.appspot.com",
  messagingSenderId: "21554640106",
  appId: "1:21554640106:web:afec602b7f7476c3ae1393",
  measurementId: "G-8CBZ8ZT0V6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
