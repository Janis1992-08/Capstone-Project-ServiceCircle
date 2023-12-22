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

// Funktion für die Validierung der Daten
const validateFormData = (editedCard) => {
  const { firstName, lastName, skills, needs, email, phone } = editedCard;

  // Überprüfen, ob alle Felder ausgefüllt sind
  if (!firstName || !lastName || !skills || !needs || !email || !phone) {
    return 'Alle Felder müssen ausgefüllt sein.';
  }

  // Überprüfen der E-Mail-Validität
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
  }

  // Überprüfen, ob die Telefonnummer nur Zahlen enthält
  const phonePattern = /^\d+$/;
  if (!phonePattern.test(phone)) {
    return 'Die Telefonnummer darf nur Zahlen enthalten.';
  }

  return null; // Null bedeutet, dass die Validierung erfolgreich ist
};

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

    const validationResult = validateFormData(editedCard);

    // Überprüfen, ob die Validierung fehlgeschlagen ist
    if (validationResult) {
      return; // Abbruch des Speicherns, wenn die Validierung fehlgeschlagen ist
    }

    handleEditServiceCard(editedCard);
    // Zurücksetzen der Service Card nach dem Speichern!
    setEditedCard(null);
  };

return (
  <ServiceProviderWrapper key={card.id}>
        {editedCard && editedCard.id === card.id ? (

            <form>
            <label htmlFor="firstName"> First Name: </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={editedCard.firstName}
              onChange={(event) => setEditedCard({ ...editedCard, firstName: event.target.value })}
            />
            <label htmlFor="lastName">Last Name: </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={editedCard.lastName}
              onChange={(event) => setEditedCard({ ...editedCard, lastName: event.target.value })}
            />
            <label htmlFor="skills">Skills: </label>
            <input
              type="text"
              id="skills"
              name="skills"
              required
              value={editedCard.skills}
              onChange={(event) => setEditedCard({ ...editedCard, skills: event.target.value })}
            />
            <label htmlFor="needs">Needs: </label>
            <input
              type="text"
              id="needs"
              name="needs"
              required
              value={editedCard.needs}
              onChange={(event) => setEditedCard({ ...editedCard, needs: event.target.value })}
            />
            <label htmlFor="email">email: </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={editedCard.email}
              onChange={(event) => setEditedCard({ ...editedCard, email: event.target.value })}
              />
            <label htmlFor="phone">phone: </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={editedCard.phone}
              onChange={(event) => setEditedCard({ ...editedCard, phone: event.target.value })}
            />

            <ServiceButton onClick={handleSave}>
              Save
            </ServiceButton>
            </form>
          
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
            <ServiceButton onClick={() => handleEdit(card)}>
              Edit
            </ServiceButton>
          )}
        </div>
      )}
    </ServiceProviderWrapper>
  );
}
