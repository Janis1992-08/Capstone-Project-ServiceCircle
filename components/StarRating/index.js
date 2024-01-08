import { useState } from "react";
import styled from "styled-components";

const StarWrapper = styled.label`
  display: inline-block;
  font-size: 20px;
  cursor: pointer;

  input {
    display: none;
  }
`;

const StarRating = ({ rating, setRating, isRated }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    if (!isRated) {
      setRating(selectedRating);
    }
  };

  const handleStarHover = (selectedRating) => {
    if (!isRated) {
      setHoverRating(selectedRating);
    }
  };

  const handleMouseLeave = () => {
    if (!isRated) {
      setHoverRating(0);
    }
  };

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <>
      <div>
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
              checked={star === (hoverRating || rating)}
              onChange={() => handleStarClick(star)}
              disabled={isRated}
            />
            {star <= (hoverRating || rating) ? "⭐️" : "☆"}
          </StarWrapper>
        ))}
      </div>
    </>
  );
};

export default StarRating;
