import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { traerPokemones } from '../actions/cardsAction';
import { jugar } from '../actions/cardsAction';
import { signInWithGoogle, app } from '../firebasefolder/Firebase';
import {getFirestore, doc, getDoc, setDoc, updateDoc} from "firebase/firestore"
export default function Cards({correoUsuario}) {

  const [puntosDelJugador, setpuntosDelJugador] = useState(100)
  const state = useSelector(state => state);
  const dispatch = useDispatch()

  const [resultado, setresultado] = useState("")
  const [resultado2, setresultado2] = useState("")

  const [arrayPuntos, setarrayPuntos] = useState(null)

  const chequearUsuario = ()=>{
    if(arrayPuntos !== null){
      return(arrayPuntos)
    }
  }

  useEffect(()=>{
    dispatch(traerPokemones())
  },[])

  async function fetchPuntos() {
    const puntosObtenidos = await buscarDocsOcrearDocs(correoUsuario)
      setarrayPuntos(puntosObtenidos.puntos)
    }

  useEffect(()=>{
      fetchPuntos()
      console.log(arrayPuntos,"arrayPuntos")
  },[])

const firestore = getFirestore(app)

  const ganar = ()=>{

    const eevee = (element) => element === "eevee";

    const magikarp = (element) => element === "magikarp";

    let resultToReturn = false;
    resultToReturn = state.cards.some((element, index) => {
        return state.cards.indexOf(element) !== index
    })
    if(state.cards.some(magikarp)){
      setresultado2("Perdiste 25 puntos, hay al menos un magikarp xd")
      setpuntosDelJugador(puntosDelJugador - 25)
    }
    if(state.cards.some(eevee) && resultToReturn){
      setresultado("Combooooo, ganaste 250 puntos")
      setpuntosDelJugador(puntosDelJugador + 250)
    }

    //Chequear si hay algún eevee
    else if(state.cards.some(eevee)){
      setresultado("Ganaste 50 puntos, hay al menos un eevee")
      setpuntosDelJugador(puntosDelJugador + 50)
    }

    //Chequear repetidos
    else if(resultToReturn) {
        setresultado("Ganaste 25 puntos, hay al menos un repetido")
        setpuntosDelJugador(puntosDelJugador + 25)
        }
        
    else setresultado("Perdiste")
  }

  const fakeData = [
    {puntos: puntosDelJugador}
  ]

  function guardarPuntos(){
    const docuRef= doc(firestore,`usuarios/${correoUsuario}`)
    updateDoc(docuRef, {puntos: puntosDelJugador})
    setarrayPuntos(puntosDelJugador)
    console.log(arrayPuntos,"estos son los arraypuntos")
  }


  async function buscarDocsOcrearDocs (idDocumento){
    //crear referencia al documento
    const docuRef = doc(firestore,`usuarios/${idDocumento}`)
    //revisar si existe
    const consulta = await getDoc(docuRef)

    if(consulta.exists()){
    const infoDocu = consulta.data()
    return infoDocu.puntos
    }
    else {
    await setDoc(docuRef, {puntos: {...fakeData}})
    const consulta = await getDoc(docuRef)
    const infoDocu = consulta.data()
    return infoDocu.puntos
    }

  }

  return (
    <div>
        <h2>
            Juego de cartas Pokemon
        </h2>
        <div>{puntosDelJugador}</div>
        <div>{state.cards[0]}</div>
        <div>{state.cards[1]}</div>
        <div>{state.cards[2]}</div>
        <div>{state.cards[3]}</div>
        <div>{state.cards[4]}</div>
        <button onClick={()=>{
          dispatch(jugar())
          setpuntosDelJugador(puntosDelJugador - 25)
          setresultado2(null)
          setresultado(null)
          }}>Jugar</button>
        <button onClick={()=>{
          ganar()
        }}>Ver resultados</button>
          <h2>{resultado}</h2>
          <h2>{resultado2}</h2>
          <button onClick={()=> {signInWithGoogle()}}>Login con Google</button>
          <img src={localStorage.getItem("image")} alt="" />
          <h2>{localStorage.getItem("name")}</h2>
          <button onClick={()=>{
            guardarPuntos()
          }}>Guardar puntos</button>
          <div>{chequearUsuario()}</div>
    </div>
  )
}
