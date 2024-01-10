import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
`;

const ReviewInput = styled.textarea`
`;

const SubmitReviewButton = styled.button`
  background-color: ${(props) => props.reviewButtonColor || "#2ecc71"};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

export default function ReviewForm({ cardId, addReview, reviewButtonColor }) {
  const [review, setReview] = useState('');

  useEffect(() => {
    const storedReview = localStorage.getItem(`review_${cardId}`);
    if (storedReview) {
      setReview(storedReview);
    }
  }, [cardId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview(cardId, review);
    

    localStorage.setItem(`review_${cardId}`, review);

    setReview('');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <ReviewInput
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder='Write your review here...'
      />
      <SubmitReviewButton type="submit" reviewButtonColor={reviewButtonColor}>
        Submit Review
      </SubmitReviewButton>
    </FormContainer>
  );
}