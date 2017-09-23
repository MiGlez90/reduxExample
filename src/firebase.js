import * as firebase from 'firebase';


// Initialize Firebase
//
const config = {
    apiKey: "AIzaSyCgdhR6u5F2QUie8Ysatw496AGLuuigDMc",
    authDomain: "ejercicio1-43fab.firebaseapp.com",
    databaseURL: "https://ejercicio1-43fab.firebaseio.com",
    projectId: "ejercicio1-43fab",
    storageBucket: "ejercicio1-43fab.appspot.com",
    messagingSenderId: "165485868080"
};

firebase.initializeApp(config);

export default firebase;
