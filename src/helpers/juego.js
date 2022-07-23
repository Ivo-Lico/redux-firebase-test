const ganar = (state,re1,re2,puntos, setpuntos)=>{

    const eevee = (element) => element === "eevee";

    const magikarp = (element) => element === "magikarp";

    let resultToReturn = false;
    resultToReturn = state.cards.some((element, index) => {
        return state.cards.indexOf(element) !== index
    })
    if(state.cards.some(magikarp)){
        re2("Perdiste 25 puntos, hay al menos un magikarp xd")
        setpuntos(puntos - 25)
    }
    if(state.cards.some(eevee) && resultToReturn){
        re1("Combooooo, ganaste 250 puntos")
        setpuntos(puntos + 250)
    }

    //Chequear si hay algún eevee
    else if(state.cards.some(eevee)){
      re1("Ganaste 50 puntos, hay al menos un eevee")
      setpuntos(puntos + 50)
    }

    //Chequear repetidos
    else if(resultToReturn) {
        re1("Ganaste 25 puntos, hay al menos un repetido")
        setpuntos(puntos + 25)
        }
        
    else re1("Perdiste")
  }
  
  export default ganar