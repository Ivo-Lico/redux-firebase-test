// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getFirestore, collection, getDocs} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqBXLeCK-ONNsId1vy6w6lZl1-j8uP9g8",
  authDomain: "pokemon-cards-game.firebaseapp.com",
  projectId: "pokemon-cards-game",
  storageBucket: "pokemon-cards-game.appspot.com",
  messagingSenderId: "1028388069709",
  appId: "1:1028388069709:web:c132160f3035eb01159704",
  measurementId: "G-1HREM5R9XX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}
const analytics = getAnalytics(app);
export const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const db = getFirestore()
const colRef = collection(db, "puntos")
getDocs(colRef)
  .then((snapshot)=>{
    console.log(snapshot.docs)
  })


export const signInWithGoogle = () =>{
  signInWithPopup(auth, provider).then(
    (result) =>{
console.log(result)
const name = result.user.displayName
const image = result.user.photoURL

localStorage.setItem("name", name)
localStorage.setItem("image", image)

    }
  ).catch((error) =>{
    console.log(error)
  })
}

