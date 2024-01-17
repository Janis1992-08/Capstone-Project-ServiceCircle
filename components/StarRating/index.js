import { useState, useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSession } from "next-auth/react";

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
  const [hasRated, setHasRated] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    // Check if the user has already rated the provider
    const userHasRated = card.ratings.some(
      (rating) => rating.userId === session.user.email
    );
    setHasRated(userHasRated);
  }, [card, session]);

  const { mutate } = useSWR("/api/providers");

  async function handleRating(providerId, rating, userId) {
    try {
      const url = `/api/providers/${providerId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, userId }),
      });

      if (response.ok) {
        setHasRated(true);
        const updatedData = await response.json();
        mutate();
        alert("You have successfully rated!");
        return updatedData;
      } else {
        console.error("Error updating provider:", response.statusText);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  const handleStarHover = (selectedRating) => {
    setHoverRating(selectedRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleStarClick = (selectedRating) => {
    setTempRating(selectedRating);
  };

  return (
    <>
      {!hasRated ? (
        stars.map((star) => (
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
            />
            {star <= (tempRating || hoverRating || card.rating) ? (
              <AiFillStar color="gold" size="1.3em" />
            ) : (
              <AiOutlineStar color="black" size="1.3em" />
            )}
          </StarWrapper>
        ))
      ) : (
        <p>You have rated</p>
      )}
      {!hasRated && tempRating > 0 && (
        <StyledButton
          type="button"
          onClick={() => handleRating(card._id, tempRating, session.user.email)}
        >
          Rate
        </StyledButton>
      )}
    </>
  );
};

export default StarRating;
