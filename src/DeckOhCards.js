import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import "./DeckOhCards.css"

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
  const [cards, setCards] = useState([]);

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
    let response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`
    );

    if (!response.data.remaining) {
      window.alert("Error: No cards remaining!");
      console.log(deck.data.remaining);
      return;
    }

    const newCard = response.data.cards[0].image;
    setCards((curr) => [newCard, ...curr]);
  }

  if (deck.isLoading) return <h1>Loading....</h1>;

  function renderCards() {
    return cards.map((card) => <Card card={card} />);
  }

  return (
    <div className="game">
      <div className="button-wrapper">
        <button onClick={getNewCard}>
          {cards.length === 0 ? "Click to Begin" : "Draw A Card"}
        </button>
      </div>
      <div>
      {renderCards()}

      </div>
    </div>
  );
}

export default DeckOhCards;
