import styled from "styled-components";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const SubmitReviewButton = styled.button`
  background-color: white;
  color: #ff5733;
  border: 1px solid;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
`;

const StyledInput = styled.input`
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export default function ReviewForm({ card }) {
  const { mutate } = useSWR("/api/providers");
  const [hasReviewed, setHasReviewed] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const userHasReviewed = card.reviews.some(
      (review) => review.userId === session.user.email
    );
    setHasReviewed(userHasReviewed);
  }, [card, session]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddReview(card._id, event.target.review.value, session.user.email);
    event.target.review.value = "";
  };

  async function onAddReview(providerId, review, userId) {
    try {
      const url = `/api/providers/${providerId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review, userId }),
      });

      if (response.ok) {
        setHasReviewed(true);
        const updatedData = await response.json();

        mutate();
        alert("You have successfully made a Review!");
        return updatedData;
      } else {
        console.error("Error updating provider:", response.statusText);
        const errorMessage = await response.text();
        console.error("Detailed Error Message:", errorMessage);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  return !hasReviewed ? (
    <form onSubmit={handleSubmit}>
      <StyledInput
        id="review"
        minLength={4}
        maxLength={100}
        required
        placeholder="Write your review..."
      />
      <SubmitReviewButton type="submit">Submit Review</SubmitReviewButton>
    </form>
  ) : (
    <p>You have already reviewed this provider.</p>
  );
}
