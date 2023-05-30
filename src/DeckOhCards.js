import React, { useState, useEffect } from "react";
import axios from "axios";

/** shows current card and allows user to load another card */
function DeckOhCards(){

  const [deck, setDeck] = useState({
    data: null,
    isLoading: true
  })
  const [card, setCard] = useState(false)

  useEffect(()=>{
    async function getDeck(){
      //ajax call for the deck that we will await
      const newDeck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      //setDeck to the new deck
      setDeck({
        data: newDeck.data,
        isLoading: false
      })
    }
    getDeck();
  }, [])

  async function getNewCard(){
    if (deck.data.remaining < 1) {
      window.alert("Error: No cards remaining!");
      return ""
    }
    //otherwise, make the request to the api with the deck id
    let newCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`);
    console.log("resp object is>", newCard.data);
    setCard(newCard.data.cards[0].image);
  }


if (deck.isLoading) return <h1>Loading....</h1>

return (
  <div>
    {card ? <img src={card} /> : <h2>Click to begin!</h2>}
    <button onClick={getNewCard}>Click for card!</button>
  </div>
)
}
export default DeckOhCards;