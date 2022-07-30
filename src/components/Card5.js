import React,{useState, useEffect} from 'react'
import { Card,CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
export default function Card5({url}) {

const [card, setCard] = useState(null)

useEffect(()=>{
  async function funcionLoca(){
    const fetchPokemon = async()=>{
      await fetch(url)
      .then(res=>res.json())
      .then(json=>{
        console.log(json,"pokemonloco card 5")
        setCard(json)
      }
      )
    };
    await fetchPokemon()
  }
  funcionLoca()
  },[])


if(card){
  return (
    <Card
  color="light"
  style={{
    width: '18rem'
  }}
>
  <img
    alt=""
    src={card.sprites.front_default}
  />
  <CardBody>
    <CardTitle tag="h5">
      {card.name}
    </CardTitle>
    <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
      {card.id}
    </CardSubtitle>
    <CardText>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </CardText>
    <Button>
      Detalle
    </Button>
  </CardBody>
</Card>
      
  )
}
}
