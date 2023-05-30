import React, { useState, useEffect } from "react";

/** presentational card component
 *
 * Props:
 * - card -> url string of card image
 *
 * State:
 * - None
 *
 * DeckOhCards -> Card
 */

function Card({ card }) {
  const size = {
    height: "100px",
    width: "100px",
  };
  return <img style={size} src={card} alt="card" />;
}

export default Card;
