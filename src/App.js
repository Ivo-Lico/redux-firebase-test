import {Provider} from "react-redux"
import store from "./store";
import Cards from "./components/Cards";
import Logueo from "./components/Logueo";
import React,{useState,useEffect} from "react";
import firebaseApp from "./firebasefolder/credenciales";
import {getAuth, onAuthStateChanged} from "firebase/auth"
function App() {
const auth = getAuth(firebaseApp)
const [usuarioGlobal, setUsuarioGlobal] = useState(null)
onAuthStateChanged(auth, (usuarioFirebase)=>{

  if(usuarioFirebase){
setUsuarioGlobal(usuarioFirebase)
  }

  else{
    setUsuarioGlobal(null)
}
})
  return (
    <Provider store={store}>
    <div>
      <>
     {usuarioGlobal ? <Cards correoUsuario={usuarioGlobal.email} /> : <Logueo />}
      </>
    </div>
    </Provider>
  );
}
export default App;
