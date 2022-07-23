import React,{useState} from 'react'
import firebaseApp from '../firebasefolder/credenciales'
import { getAuth,createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth"
import { Button, Input, Alert } from 'reactstrap';
import styles from '../css/logueo.module.css'
import AlertExample from '../helpers/alert';
export default function Logueo() {

const auth = getAuth (firebaseApp)    
const [estaRegistrandose, setEstaRegistrandose] = useState(false)


const [error, setError] = useState(null)

async function submitHandler(e){
    e.preventDefault()
    const correo = e.target.email.value
    const contra = e.target.password.value
    console.log(correo,contra)
    if(estaRegistrandose){
        try{
            const usuario = await createUserWithEmailAndPassword(auth, correo, contra)
            console.log(usuario)
            setEstaRegistrandose(!estaRegistrandose)
        }
        catch(err){
            setError("Error de autenticación. " + err.message)
        }
    }
    else{
        try{
            const usuario = await  signInWithEmailAndPassword(auth,correo,contra)
            console.log(usuario)
        }
        catch(err){
            setError("Error de autenticación. " + err.message)
        }
    }
}
  return (
    <div id={styles.contenedor}>
        <h1>Random Card Game</h1>
            <div>
                <form onSubmit={submitHandler} action="">
                    <div id={styles.continput}>
                        <label htmlFor="email">Email</label>
                        <Input onChange={()=>setError(null)} placeholder='Escribe tu email' required id='email' type="text" />
                        <label htmlFor="password">Contraseña</label>
                        <Input onChange={()=>setError(null)}  placeholder='Escribe tu contraseña' required id='password' type="password" />
                    </div>
                        { error ? <AlertExample error={error}></AlertExample> : null}
    <div id={styles.contbotones}>
    <Button id={styles.registrate} color="primary"
    size="">{estaRegistrandose ? "Logueate" : "Registrate"}</Button>
    
    {estaRegistrandose ? null : <Button id={styles.login}  color="primary"
    size="">Login</Button>}
    </div>
                </form>
            </div>
    </div>
  )
}
