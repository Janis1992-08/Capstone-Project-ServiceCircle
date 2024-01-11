import { useState } from "react";
import styled from "styled-components";


const StarWrapper = styled.label`
  position: relative;
  font-size: 20px;
  cursor: pointer;

  input {
    display: none;
  }
`;

const StyledButton = styled.button`
  background-color: gold; 
  color: white; 
  padding: 8px;
  border: none; 
  border-radius: 4px;
  cursor: pointer; 
  font-size: 14px; 

  &:hover {
    background-color: goldenrod;
  }
`;

const stars = Array.from({ length: 5 }, (_, index) => index + 1);

const StarRating = ({ card, onRating }) => {
  const [hoverRating, setHoverRating] = useState(card.rating || 0);
  const [tempRating, setTempRating] = useState(0);

  const handleStarHover = (selectedRating) => {
    if (!card.rating) {
      setHoverRating(selectedRating);
    }
  };

  const handleMouseLeave = () => {
    if (!card.rating) {
      setHoverRating(0);
    }
  };

  const handleStarClick = (selectedRating) => {
    if (!card.rating) {
      setTempRating(selectedRating);
    }
  };

  return (
    <>
      {stars.map((star) => (
        <StarWrapper
          key={star}
          onMouseEnter={() => handleStarHover(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleStarClick(star)}
        >
          <input
            type="radio"
            name="rating"
            value={star}
            checked={star === (tempRating || hoverRating || card.rating)}
            onChange={() => handleStarClick(star)}
            disabled={card.isRated || card.rating > 0}
          />
          {star <= (tempRating || hoverRating || card.rating) ? "⭐️" : "☆"}
        </StarWrapper>
      ))}
      {!card.rating && tempRating > 0 && (
        <StyledButton type="button" onClick={() => onRating(card.id, tempRating)}>Rate</StyledButton>
      )}
    </>
  );
};

export default StarRating;
