import firebase from 'firebase/app';
import 'firebase/firestore';  //database
import 'firebase/auth';       //authentication
import { useRef } from 'react';

const config = {
    apiKey: "AIzaSyATvCaq1fwSIqghbqFteD63ExWH9GsrCZ0",
    authDomain: "restful-smoke-db.firebaseapp.com",
    databaseURL: "https://restful-smoke-db.firebaseio.com",
    projectId: "restful-smoke-db",
    storageBucket: "restful-smoke-db.appspot.com",
    messagingSenderId: "630972223571",
    appId: "1:630972223571:web:043c7b82e7b7327a3f36a6",
    measurementId: "G-7DVYBJ0D2W"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await useRef.get();
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('error creating user', error.message);
        }
        return userRef;
    }
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Adding google authentication to our application
const provider = new firebase.auth.GoogleAuthProvider();
//trigger google pop up when we use google auth
provider.setCustomParameters({ prompt : 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
