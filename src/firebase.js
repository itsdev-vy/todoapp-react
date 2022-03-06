import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_TODO,
    authDomain: "todo-app-50f3c.firebaseapp.com",
    projectId: "todo-app-50f3c",
    storageBucket: "todo-app-50f3c.appspot.com",
    messagingSenderId: "1014223292738",
    appId: "1:1014223292738:web:0303d7dfb4a196de7620db",
    measurementId: "G-6BGN0VK2P6"
});

const db = firebaseApp.firestore();

export default db;
