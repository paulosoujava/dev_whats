import firebase from 'firebase';
  
  var config = {
    apiKey: "AIzaSyB2hUdxFnuzPE6UVDD1QJX-DGzl9Ewjjpg",
    authDomain: "devsapp-34d05.firebaseapp.com",
    databaseURL: "https://devsapp-34d05.firebaseio.com",
    projectId: "devsapp-34d05",
    storageBucket: "devsapp-34d05.appspot.com",
    messagingSenderId: "443168152213"
  };
  
  firebase.initializeApp(config);

  export default firebase;
