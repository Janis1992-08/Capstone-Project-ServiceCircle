import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import ReviewForm from "@/components/ReviewForm";
import EditForm from "@/components/EditForm";
import StarRating from "../StarRating";

const ServiceProviderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
`;

const EditDeleteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const EditButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
`;

const ReviewButton = styled(ActionButton)`
  background-color: #2ecc71;
  color: white;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
`;

const ShowContactButton = styled.button`
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
`;

export default function ServiceProvider({ card, isOnFavoritesPage }) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [editedCard, setEditedCard] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const { mutate } = useSWR("/api/providers");

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const handleOpenEditForm = () => {
    setEditedCard(card);
  };

  async function handleDelete(id) {
    const url = `/api/providers/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        await response.json();

        mutate();
        alert("You have successfully Deleted!");
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("An error occurred during the delete request:", error);
    }
  }

  return (
    <ServiceProviderWrapper key={card._id}>
      {editedCard?._id === card._id ? (
        <EditForm
          editedCard={editedCard}
          setEditedCard={setEditedCard}
          card={card}
        />
      ) : (
        <div>
          <h2>
            {card.firstName} {card.lastName}
          </h2>
          <h3>
            <strong>Skills:</strong> {card.skills}
          </h3>
          <h3>
            <strong>Needs:</strong> {card.needs}
          </h3>
          {showContactInfo && (
            <div>
              <h3>
                <strong>Email:</strong> {card.email}
              </h3>
              <h3>
                <strong>Phone:</strong> {card.phone}
              </h3>
            </div>
          )}
          <ShowContactButton type="button" onClick={toggleContactInfo}>
            {showContactInfo ? "Hide Contact" : "Show Contact"}
          </ShowContactButton>

          {!isOnFavoritesPage && (
            <EditDeleteWrapper>
              <EditButton type="button" onClick={handleOpenEditForm}>
                Edit
              </EditButton>
              <DeleteButton
                type="button"
                onClick={() => handleDelete(card._id)}
              >
                Delete
              </DeleteButton>
            </EditDeleteWrapper>
          )}

          <ReviewButton onClick={toggleReviewForm}>
            {showReviewForm ? "Hide Review Form" : "Add Review"}
          </ReviewButton>

          {showReviewForm && <ReviewForm card={card} />}

          <ActionButton onClick={toggleReviews}>
            {showReviews ? "Hide Reviews" : "Show Reviews"}
          </ActionButton>

          {showReviews && card.reviews && (
            <article>
              <h2>Reviews:</h2>
              {card.reviews.map((review, id) => (
                <h3 key={id}>{review}</h3>
              ))}
            </article>
          )}
          <div>
            <StarRating card={card} />
          </div>
        </div>
      )}
    </ServiceProviderWrapper>
  );
}
