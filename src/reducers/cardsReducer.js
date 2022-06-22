import { POKEMONES, JUGAR } from "../types";



const numeroRandom = ()=>{
   return (Math.round(Math.random() * (0,11)))
}

const pokemonRandom = ()=>{
   let cartas = [arraypokemones[numeroRandom()].name, arraypokemones[numeroRandom()].name, arraypokemones[numeroRandom()].name, arraypokemones[numeroRandom()].name, arraypokemones[numeroRandom()].name]
   console.log(cartas)
   return (cartas)
}


const initialState = 0
const arraypokemones = []
const pokemonestraidos = async()=>{
    await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
    .then(res=>res.json())
    .then(json=>{
      arraypokemones.push(json.results[24],json.results[0],json.results[3],json.results[6], json.results[132], json.results[62], json.results[128], json.results[142],json.results[51],json.results[53], json.results[65], json.results[148])
    }
    )
  };

export default function cardsReducer(state = initialState,action) {
switch(action.type){
case POKEMONES:
    pokemonestraidos();
    return state;
case JUGAR:
    return state = pokemonRandom();      
    default:
        return state;
    }   
}

export {initialState};