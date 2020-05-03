import firebase from 'firebase'
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: '###tu apkey###',
    authDomain: "proyectos-cliente.firebaseapp.com",
    databaseURL: "https://proyectos-cliente.firebaseio.com",
    projectId: "proyectos-cliente",
    storageBucket: "proyectos-cliente.appspot.com",
    messagingSenderId: "887799128715",
    appId: "###tu appId###"
  });
  
  const db = firebase.firestore();

  export default db;

