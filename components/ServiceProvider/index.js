import { useState } from 'react';
import styled from "styled-components";
import ReviewForm from "@/components/ReviewForm";
import useLocalStorageState from "use-local-storage-state";


const ServiceProviderWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
`;

const ServiceButton = styled.button`
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

const ServiceDetails = styled.div`
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

export default function ServiceProvider({
  card,
  isOnFavoritesPage,
  handleEditServiceCard,
  serviceCards,
  setServiceCards,
}) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [editedCard, setEditedCard] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useLocalStorageState(`reviews_${card.id}`, {});

  const onAddReview = (cardId, review) => {
    const updatedReviews = { ...reviews, [cardId]: review };
    setReviews(updatedReviews);
  };

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  const handleEdit = (updatedServiceCard) => {
    setEditedCard(updatedServiceCard);
  };

  const handleSave = (event) => {
    event.preventDefault();
    handleEditServiceCard(editedCard);
    setEditedCard(null);
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this service provider?");
    if (isConfirmed) {
      const updatedCards = serviceCards.filter((c) => c.id !== card.id);
      setServiceCards(updatedCards);
    }
  };

  return (
    <ServiceProviderWrapper key={card.id}>
      {editedCard && editedCard.id === card.id ? (
        <form onSubmit={handleSave}>
          <label htmlFor="firstName"> First Name: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={editedCard.firstName}
            onChange={(event) =>
              setEditedCard({ ...editedCard, firstName: event.target.value })
            }
          />
          <label htmlFor="lastName"> Last Name: </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={editedCard.lastName}
            onChange={(event) =>
              setEditedCard({ ...editedCard, lastName: event.target.value })
            }
          />
          <label htmlFor="skills"> Skills: </label>
          <input
            type="text"
            id="skills"
            name="skills"
            required
            value={editedCard.skills}
            onChange={(event) =>
              setEditedCard({ ...editedCard, skills: event.target.value })
            }
          />
          <label htmlFor="needs"> Needs: </label>
          <input
            type="text"
            id="needs"
            name="needs"
            required
            value={editedCard.needs}
            onChange={(event) =>
              setEditedCard({ ...editedCard, needs: event.target.value })
            }
          />
          <label htmlFor="email"> Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={editedCard.email}
            onChange={(event) =>
              setEditedCard({ ...editedCard, email: event.target.value })
            }
         
            />
          <label htmlFor="phone"> Phone: </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={editedCard.phone}
            onChange={(event) =>
              setEditedCard({ ...editedCard, phone: event.target.value })
            }
          />
          <ServiceButton type="submit">Save</ServiceButton>
        </form>
      ) : (
        <div>
          <h2>
            {card.firstName} {card.lastName}
          </h2>
          <p>
            <strong>Skills:</strong> {card.skills}
          </p>
          <p>
            <strong>Needs:</strong> {card.needs}
          </p>
          {showContactInfo && (
            <ServiceDetails>
              <p>
                <strong>Email:</strong> {card.email}
              </p>
              <p>
                <strong>Phone:</strong> {card.phone}
              </p>
            </ServiceDetails>
          )}
          <ServiceButton type="button" onClick={toggleContactInfo}>
            {showContactInfo ? "Hide Contact" : "Show Contact"}
          </ServiceButton>
          <br />
          {!isOnFavoritesPage && (
            <>
              <ServiceButton onClick={() => handleEdit(card)}>
                Edit
              </ServiceButton>
              <DeleteButton type="button" onClick={handleDelete}>
                Delete
              </DeleteButton>
            </>
          )}
          <ReviewButton onClick={toggleReviewForm}>
          {showReviewForm ? "Hide Review Form" : "Add Review"}
        </ReviewButton>

        {showReviewForm && (
          <ReviewForm
            cardId={card.id}
            onAddReview={onAddReview}
            reviewButtonColor={card.reviewButtonColor}
          />
        )}

        {reviews && reviews[card.id] && (
          <article>
            <h3>Reviews:</h3>
            <p>{reviews[card.id]}</p>
          </article>
        )}
      </div>
    )}
  </ServiceProviderWrapper>
);}

