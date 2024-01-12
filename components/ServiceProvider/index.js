import { useState } from "react";
import styled from "styled-components";
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
  margin: 10px;
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

const InputField = styled.input`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  overflow: hidden;
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
          <InputField
            type="text"
            id="firstName"
            name="firstName"
            required
            minLength={3}
          maxLength={15}
            value={editedCard.firstName}
            onChange={(event) =>
              setEditedCard({ ...editedCard, firstName: event.target.value })
            }
          />
          <label htmlFor="lastName">Last Name: </label>
          <InputField
            type="text"
            id="lastName"
            name="lastName"
            required
            minLength={3}
          maxLength={15}
            value={editedCard.lastName}
            onChange={(event) =>
              setEditedCard({ ...editedCard, lastName: event.target.value })
            }
          />
          <label htmlFor="skills">Skills: </label>
          <InputField
            type="text"
            id="skills"
            name="skills"
            required
            minLength={3}
          maxLength={50}
            value={editedCard.skills}
            onChange={(event) =>
              setEditedCard({ ...editedCard, skills: event.target.value })
            }
          />
          <label htmlFor="needs">Needs: </label>
          <InputField
            type="text"
            id="needs"
            name="needs"
            required
            minLength={3}
          maxLength={50}
            value={editedCard.needs}
            onChange={(event) =>
              setEditedCard({ ...editedCard, needs: event.target.value })
            }
          />
          <label htmlFor="email">email: </label>
          <InputField
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
          <InputField
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
            <>
           <p>
             <strong>Email:</strong> {card.email}
          </p>
          <p>
          <strong>Phone:</strong> {card.phone}
          </p>
          </>
            )}
          <ShowContactButton type="button" onClick={toggleContactInfo}>
            {showContactInfo ? "Hide Contact" : "Show Contact"}
          </ShowContactButton>
          
          {!isOnFavoritesPage && (
            <EditDeleteWrapper>
              <EditButton type="button" onClick={() => handleEdit(card)}>
                Edit
              </EditButton>
              <DeleteButton type="button" onClick={() => onDeleteServiceCard(card)}>
                Delete
              </DeleteButton>
            </EditDeleteWrapper>
          )}
          <div> 
          <StarRating card={card} onRating={onRating} />
          </div>
        </div>
      )}
    </ServiceProviderWrapper>
  );
}
