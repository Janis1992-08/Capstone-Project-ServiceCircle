import { useState, useEffect } from 'react';
import styled from 'styled-components';


const SubmitReviewButton = styled.button`
  background-color: ${(props) => props.reviewButtonColor || "#2ecc71"};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

export default function ReviewForm({ cardId, onAddReview, reviewButtonColor }) {
  const [review, setReview] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddReview(cardId, review);
    setReview('');
  };

  return (
    <form onSubmit={handleSubmit}>
    <input
      value={review}
      onChange={(e) => setReview(e.target.value)}
      placeholder='Write your review here...'
    />
    <SubmitReviewButton type="submit" reviewButtonColor={reviewButtonColor}>
      Submit Review
    </SubmitReviewButton>
  </form>
  );
}