import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyDLceIHkVpSdc-t0JoWpV1rAHafCeli4DE",
    authDomain: "instagram-7452d.firebaseapp.com",
    projectId: "instagram-7452d",
    storageBucket: "instagram-7452d.appspot.com",
    messagingSenderId: "706744142010",
    appId: "1:706744142010:web:23e086ce68729e91bada83"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
 
export { firebase, FieldValue };