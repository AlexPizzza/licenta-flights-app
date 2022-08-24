import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBalxhQX3GojiY1Sw3DV_iAoa-wnQOn2T4",
  authDomain: "flightsapp-660ea.firebaseapp.com",
  projectId: "flightsapp-660ea",
  storageBucket: "flightsapp-660ea.appspot.com",
  messagingSenderId: "408572278120",
  appId: "1:408572278120:web:533c2481a20c319019d2dd",
};

let app;

if (!firebase.app.length) {
  app = firebase.app();
} else {
  app = firebase.initializeApp(firebaseConfig);
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
