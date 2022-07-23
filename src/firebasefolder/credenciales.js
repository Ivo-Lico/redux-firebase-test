import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBqBXLeCK-ONNsId1vy6w6lZl1-j8uP9g8",
  authDomain: "pokemon-cards-game.firebaseapp.com",
  databaseURL: "https://pokemon-cards-game-default-rtdb.firebaseio.com",
  projectId: "pokemon-cards-game",
  storageBucket: "pokemon-cards-game.appspot.com",
  messagingSenderId: "1028388069709",
  appId: "1:1028388069709:web:2bd6589ef9182e3a159704",
  measurementId: "G-V4KT5JW2RS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp