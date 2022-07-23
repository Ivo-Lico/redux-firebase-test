import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { traerPokemones } from '../actions/cardsAction';
import { jugar } from '../actions/cardsAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import styles from '../css/googlebutton.module.css'
import google from '../images/google.png'
import firebaseApp from '../firebasefolder/credenciales';
import {getAuth, signOut} from "firebase/auth"
import {getFirestore, doc, getDoc, setDoc, updateDoc} from "firebase/firestore"
import juego from '../helpers/juego'
export default function Cards({correoUsuario}) {

const [puntosDelJugador, setpuntosDelJugador] = useState(100)  
const [arrayPuntos, setArrayPuntos] = useState(null)
const [resultado, setresultado] = useState("")
const [resultado2, setresultado2] = useState("")


const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

const state = useSelector(state => state);
const dispatch = useDispatch()

useEffect(()=>{
  dispatch(traerPokemones())
  async function fetchPuntos(){
  const puntosFetcheados = await buscarOCrearDocs(correoUsuario)
  setArrayPuntos(puntosFetcheados)
  }
  fetchPuntos() 
  },[])

async function buscarOCrearDocs(idDocumento){
  const docuRef = doc(firestore, `usuarios/${idDocumento}`)
  const consulta = await getDoc(docuRef)
    if(consulta.exists()){
      const infoDocu = consulta.data()
      return infoDocu.puntos
  }
    else{
      await setDoc(docuRef, {puntos:      puntosDelJugador })
      const consulta = await getDoc(docuRef)
      const infoDocu = consulta.data()
      return infoDocu.puntos
  }
}

function guardarPuntos(){
    const docuRef = doc(firestore,`usuarios/${correoUsuario}`)
    updateDoc(docuRef, {puntos: puntosDelJugador})
    setArrayPuntos(puntosDelJugador)
  }

  return (
    <div>
        <h2 id={styles.titulo}>
            Juego de cartas Pokemon
        </h2>
        <div id={styles.jugarcontenedor}>
        <Button
    color="primary" onClick={()=>{
          dispatch(jugar())
          setpuntosDelJugador(puntosDelJugador - 25)
          setresultado2(null)
          setresultado(null)
          }}>Jugar</Button>
          </div>
        <div>{puntosDelJugador}</div>
        <div>{state.cards[0]}</div>
        <div>{state.cards[1]}</div>
        <div>{state.cards[2]}</div>
        <div>{state.cards[3]}</div>
        <div>{state.cards[4]}</div>    
<div>
<Button color='success' onClick={()=>{
          juego(state,setresultado,setresultado2,puntosDelJugador, setpuntosDelJugador)
        }}>Ver resultados</Button>
</div>
          <h2>{resultado}</h2>
          <h2>{resultado2}</h2>
         <button id={styles.googlebutton}> <span><img src={google} alt="" /></span><span>Login con google</span></button>
          <div>
  <Button 
 onClick={()=> guardarPuntos()}
  >
    Guardar puntos
  </Button>
  <button onClick={()=>signOut(auth)}>Cerrar sesión</button>
  <h4>{arrayPuntos ? arrayPuntos : null}</h4>
</div>
    </div>
  )
}
