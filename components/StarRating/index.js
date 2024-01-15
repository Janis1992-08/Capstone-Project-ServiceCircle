import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

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

const StarRating = ({ card }) => {
  const [hoverRating, setHoverRating] = useState(card.rating || 0);
  const [tempRating, setTempRating] = useState(0);

  const { mutate } = useSWR("/api/providers");

  async function handleRating(providerId, rating) {
    try {
      const url = `/api/providers/${providerId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      });

      console.log("Server Response:", response);

      if (response.ok) {
        const updatedData = await response.json();

        mutate();
        return updatedData;
      } else {
        console.error("Error updating provider:", response.statusText);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

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
        <StyledButton
          type="button"
          onClick={() => handleRating(card._id, tempRating)}
        >
          Rate
        </StyledButton>
      )}
    </>
  );
};

export default StarRating;
