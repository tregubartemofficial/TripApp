import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBUo9yTBgmH2i3sS-1B1buTVuVva2b1os",
  authDomain: "tripapp-b0696.firebaseapp.com",
  projectId: "tripapp-b0696",
  storageBucket: "tripapp-b0696.appspot.com",
  messagingSenderId: "363732337500",
  appId: "1:363732337500:web:ffa5f4c205c0e33195b799",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
