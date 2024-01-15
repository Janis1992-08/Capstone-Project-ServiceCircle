import styled from "styled-components";
import useSWR from "swr";

const SubmitReviewButton = styled.button`
  background-color: ${(props) => props.reviewButtonColor || "#2ecc71"};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

export default function ReviewForm({ card }) {
  const { mutate } = useSWR("/api/providers");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddReview(card._id, event.target.review.value);
    event.target.review.value = "";
  };

  async function onAddReview(providerId, review) {
    try {
      const url = `/api/providers/${providerId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });

      if (response.ok) {
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

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="review">Write your review here:</label>
      <input id="review" minLength={3} />
      <SubmitReviewButton type="submit">Submit Review</SubmitReviewButton>
    </form>
  );
}
