import { useState } from "react";
import styled from "styled-components";

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

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
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
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this service provider?"
    );

    if (isConfirmed) {
      const updatedCards = serviceCards.filter((cards) => cards.id !== card.id);
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
          <label htmlFor="lastName">Last Name: </label>
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
          <label htmlFor="skills">Skills: </label>
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
          <label htmlFor="needs">Needs: </label>
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
          <label htmlFor="email">email: </label>
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
          <label htmlFor="phone">phone: </label>
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

          <h2>
            <strong>Skills:</strong> {card.skills}
          </h2>
          <h2>
            <strong>Needs:</strong> {card.needs}
          </h2>

          {showContactInfo && (
            <ServiceDetails>
              <h2>
                <strong>Email:</strong> {card.email}
              </h2>
              <h2>
                <strong>Phone:</strong> {card.phone}
              </h2>
            </ServiceDetails>
          )}
          <ServiceButton type="button" onClick={toggleContactInfo}>
            {showContactInfo ? "Hide Contact" : "Show Contact"}
          </ServiceButton>
          <br></br>
          {!isOnFavoritesPage && (
            <>
              <ServiceButton onClick={() => handleEdit(card)}>
                Edit
              </ServiceButton>
              <DeleteButton type="button" onClick={() => handleDelete(card.id)}>
                Delete
              </DeleteButton>
            </>
          )}
        </div>
      )}
    </ServiceProviderWrapper>
  );
}
