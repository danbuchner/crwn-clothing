import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAPoPJS2v4yhoPtuV2715dIgbSpXH90wKI",
    authDomain: "crwn-db-c5f93.firebaseapp.com",
    projectId: "crwn-db-c5f93",
    storageBucket: "crwn-db-c5f93.appspot.com",
    messagingSenderId: "1057521138415",
    appId: "1:1057521138415:web:111014f799f7c5ecdcb91a",
    measurementId: "G-YBWPYDPH1N"
  };


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
