import { useState } from 'react';
import styled from 'styled-components';

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

export default function ServiceProvider({ card, serviceCards, setServiceCards, isOnFavoritesPage }) {

  const [showContactInfo, setShowContactInfo] = useState(false);
  const [editedCard, setEditedCard] = useState(null);

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  function handleEditServiceCard(updatedServiceCard) {
    const updatedCards = serviceCards.map(card =>
      card.id === updatedServiceCard.id ? updatedServiceCard : card
    );
    setServiceCards(updatedCards);
  }

  const handleEdit = (updatedServiceCard) => {
    setEditedCard(updatedServiceCard);
  };
  const handleSave = () => {
    handleEditServiceCard(editedCard);
    // Zurücksetzen der Service Card nach dem Speichern!
    setEditedCard(null);
  };

return (
  <ServiceProviderWrapper key={card.id}>
        {editedCard && editedCard.id === card.id ? (
          <div>
            <h2>{card.firstName} {card.lastName}</h2>
            <label htmlFor="firstName">First Name: </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={editedCard.firstName}
              onChange={(event) => setEditedCard({ ...editedCard, firstName: event.target.value })}
            />
          
            <input
              type="text"
              required
              value={editedCard.lastName}
              onChange={(event) => setEditedCard({ ...editedCard, lastName: event.target.value })}
            />
          
            <input
              type="text"
              required
              value={editedCard.skills}
              onChange={(event) => setEditedCard({ ...editedCard, skills: event.target.value })}
            />
            
            <input
              type="text"
              required
              value={editedCard.needs}
              onChange={(event) => setEditedCard({ ...editedCard, needs: event.target.value })}
            />
            
            <input
              type="email"
              id="email"
              name="email"
              required
              value={editedCard.email}
              onChange={(event) => setEditedCard({ ...editedCard, email: event.target.value })}
              />
            
            <input
              type="tel"
              required
              value={editedCard.phone}
              onChange={(event) => setEditedCard({ ...editedCard, phone: event.target.value })}
            />

            <ServiceButton type="submit" onClick={handleSave}>
              Save
            </ServiceButton>
          </div>
        ) : (
          <div>
          <h2>{card.firstName} {card.lastName}</h2>

          <p><strong>Skills:</strong> {card.skills}</p>
          <p><strong>Needs:</strong> {card.needs}</p>

          {showContactInfo && (
            <ServiceDetails>
              <p><strong>Email:</strong> {card.email}</p>
              <p><strong>Phone:</strong> {card.phone}</p>
            </ServiceDetails>
          )}
          <ServiceButton type="button" onClick={toggleContactInfo}>
            {showContactInfo ? 'Hide Contact' : 'Show Contact'}
          </ServiceButton>
          <br></br>
          {!isOnFavoritesPage && (
            <ServiceButton type="submit" onClick={() => handleEdit(card)}>
              Edit
            </ServiceButton>
          )}
        </div>
      )}
    </ServiceProviderWrapper>
  );
}
