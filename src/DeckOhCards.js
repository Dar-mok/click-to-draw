import React, { useState, useEffect } from "react";
import axios from "axios";

/** shows current card and allows user to load another card
 *
 * props: none
 *
 * state:
 * - deck -> {data: null -> card deck object, isLoading: bool}
 * - card - {code: str, image: str, images: {}, suit:str, value:str}
 *
 * App -> DeckOhCards
 */
function DeckOhCards() {
  const [deck, setDeck] = useState({
    data: null,
    isLoading: true,
  });
  const [card, setCard] = useState(false);

  useEffect(() => {
    async function getDeck() {
      const newDeck = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setDeck({
        data: newDeck.data,
        isLoading: false,
      });
    }
    getDeck();
  }, []);

  /**get a single card from the deck if one is available */
  async function getNewCard() {
    let newCard = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`
    );

    if (!newCard.data.remaining) {
      window.alert("Error: No cards remaining!");
      console.log(deck.data.remaining);
      return;
    }
    setCard(newCard.data.cards[0].image);
  }

  if (deck.isLoading) return <h1>Loading....</h1>;

  return (
    <div>
      {card ? <img src={card} alt="card" /> : <h2>Click to begin!</h2>}
      <button onClick={getNewCard}>Click for card!</button>
    </div>
  );
}

export default DeckOhCards;
