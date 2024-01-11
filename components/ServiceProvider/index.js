import { useState } from "react";
import styled from "styled-components";
import StarRating from "../StarRating";

const ServiceProviderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
`;

const EditButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 13px;
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
  margin: 13px;
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

export default function ServiceProvider({
  card,
  isOnFavoritesPage,
  onEditServiceCard,
  onDeleteServiceCard,
  onRating
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

    onEditServiceCard(editedCard);
    setEditedCard(null);
  };



  return (
    <ServiceProviderWrapper key={card.id}>
      {editedCard?.id === card.id ? (
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

          <EditButton type="submit">Save</EditButton>
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
          <ShowContactButton type="button" onClick={toggleContactInfo}>
            {showContactInfo ? "Hide Contact" : "Show Contact"}
          </ShowContactButton>
          
          {!isOnFavoritesPage && (
            <>
              <EditButton type="button" onClick={() => handleEdit(card)}>
                Edit
              </EditButton>
              <DeleteButton type="button" onClick={() => onDeleteServiceCard(card)}>
                Delete
              </DeleteButton>
            </>
          )}
          <div> 
          <StarRating card={card} onRating={onRating} />
          </div>
        </div>
      )}
    </ServiceProviderWrapper>
  );
}
