import {Provider} from "react-redux"
import store from "./store";
import Cards from "./components/Cards";
import React,{useState} from "react";
import { app } from './firebasefolder/Firebase';
import {getAuth, onAuthStateChanged} from "firebase/auth"
const auth = getAuth(app)
function App() {

const[usuarioglobal, setusuarioglobal] = useState(null)

onAuthStateChanged(auth, (usuarioFirebase) =>{
  if(usuarioFirebase){
    setusuarioglobal(usuarioFirebase)
  }
  else{
    setusuarioglobal(null)
  }
})


  return (
    <Provider store={store}>
    <div>
      <>
     <Cards correoUsuario={usuarioglobal}  />
      </>
    </div>
    </Provider>
  );
}

export default App;
