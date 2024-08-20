
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";


  import {getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"


  const firebaseConfig = {
    apiKey: "AIzaSyBPNNUt3BJi3B7HX3-tOQI1YbSmrzzRTd8",
    authDomain: "buy-and-sells-corner-39ad0.firebaseapp.com",
    projectId: "buy-and-sells-corner-39ad0",
    storageBucket: "buy-and-sells-corner-39ad0.appspot.com",
    messagingSenderId: "413046328170",
    appId: "1:413046328170:web:ca49d6e1ed696a0960f313",
    measurementId: "G-HV9DVKEZ7V"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);