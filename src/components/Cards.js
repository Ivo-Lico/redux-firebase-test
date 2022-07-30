import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { traerPokemones } from '../actions/cardsAction';
import { jugar } from '../actions/cardsAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import styles from '../css/googlebutton.module.css'
import firebaseApp from '../firebasefolder/credenciales';
import {getAuth, signOut} from "firebase/auth"
import {getFirestore, doc, getDoc, setDoc, updateDoc} from "firebase/firestore"

import Card1 from './Card1.js' 
import Card2 from './Card2' 
import Card3 from './Card3' 
import Card4 from './Card4' 
import Card5 from './Card5'
export default function Cards({correoUsuario}) {

// const [puntosDelJugador, setpuntosDelJugador] = useState(100)  
const [arrayPuntos, setArrayPuntos] = useState(100)
const [resultado, setresultado] = useState("")
const [show, setShow] = useState(false)
const [toggle, setToggle] = useState(true)
const [changeStyle, setChangeStyle] = useState(styles.jugarcontenedor)
const [showCards, setShowCards] = useState(false)
const [showRes, setShowRes] = useState(false)

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
      await setDoc(docuRef, {puntos:      arrayPuntos })
      const consulta = await getDoc(docuRef)
      const infoDocu = consulta.data()
      return infoDocu.puntos
  }
}

function guardarPuntos(){
    const docuRef = doc(firestore,`usuarios/${correoUsuario}`)
    updateDoc(docuRef, {puntos: arrayPuntos})
    setArrayPuntos(arrayPuntos)
  }

  const ganar = ()=>{

    let mapeo = state.cards.map(element => element.name)

    const eevee = (element) => element === "eevee";

    const magikarp = (element) => element === "magikarp";

    let resultToReturn = false;
    resultToReturn = mapeo.some((element, index) => {
        return mapeo.indexOf(element) !== index
    })
    if(mapeo.some(magikarp)){
      setresultado("Perdiste 25 puntos, hay al menos un magikarp xd")
      setArrayPuntos(arrayPuntos - 25)
    }
    if(mapeo.some(eevee) && resultToReturn){
      setresultado("Combooooo, ganaste 250 puntos")
        setArrayPuntos(arrayPuntos + 250)
    }

    //Chequear si hay algún eevee
    else if(mapeo.some(eevee)){
      setresultado("Ganaste 50 puntos, hay al menos un eevee")
      setArrayPuntos(arrayPuntos + 50)
    }

    //Chequear repetidos
    else if(resultToReturn) {
      setresultado("Ganaste 25 puntos, hay al menos un repetido")
      setArrayPuntos(arrayPuntos + 25)
        }
        
    else setresultado("Perdiste")
  }


  return (
    <div>
      <header id={styles.header}>
        <h2 id={styles.titulo}>
            Random Pokemon
        </h2>
        <h4 id={styles.puntos}>{arrayPuntos ? arrayPuntos : null}</h4>
        </header>
        {showCards ? <div id={styles.cartitas}>
          <div className={styles.carta}>
          {state.cards[0].url ? <Card1 url={state.cards[0].url}></Card1> : null}
          </div>
          <div className={styles.carta}>
          {state.cards[1].url ? <Card2 url={state.cards[1].url}></Card2> : null}
          </div >
          <div className={styles.carta}>
          {state.cards[2].url ? <Card3 url={state.cards[2].url}></Card3> : null}
          </div >
          <div className={styles.carta}>
          {state.cards[3].url ? <Card4 url={state.cards[3].url}></Card4> : null}
          </div >
          <div className={styles.carta}>
          {state.cards[4].url ? <Card5 url={state.cards[4].url}></Card5> : null}
          </div >
          </div> : null}
        <div id={changeStyle}>
          <div id={styles.contbotonjugar}>
            <div>
        {toggle ? <Button
    color="primary" onClick={()=>{
          dispatch(jugar())
          setArrayPuntos(arrayPuntos - 25)
          setresultado(null)
          setShow(true)
          setToggle(false)
          setChangeStyle(styles.jugacontenedor2)
          setShowCards(true)
          setShowRes(false)
          }}>Jugar</Button> : null}
          </div>
          { showRes ? <ul id={styles.contenedorresultado}>
          <li id={styles.resultado}>{resultado}</li>
          </ul> : null}
          { show ? <section>         
<div>
<Button color='success' onClick={()=>{
          ganar()
          setChangeStyle(styles.jugarcontenedor)
          setToggle(true)
          setShow(false)
          setShowCards(false)
          setShowRes(true)
        }}>Ver resultados</Button>
</div></section> : null} 
           <div className={styles.buttons}>
  <Button  color="primary" 
 onClick={()=> guardarPuntos()}
  >
    Guardar puntos
  </Button>
  <Button onClick={()=>signOut(auth)}>Cerrar sesión</Button>
</div>  
          </div>
            <div>
            </div>
          </div>  
    </div> 
  )
}
