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

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;
    // Get the user reference from firestore
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    // Snapshot represents the data
    const snapShot = await userRef.get();

    // to perform CRUD operations we have to ue the DocumentReference obj
    if(!snapShot.exists){
      // Get the fields we will need form the authenticated user object
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      // Calling an ascync method from the database will need to catch errors
      try{        
        // Method will create the user document in the firebase
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData});
      }catch(error){
        console.log('Error while creating user : ', error.message);
      }
    }

    return userRef;
  };


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
