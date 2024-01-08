import { useState } from "react";
import styled from "styled-components";
import StarRating from "../StarRating";
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

const ServiceDetails = styled.div`
  margin-top: 10px;
`;

export default function ServiceProvider({
  card,
  isOnFavoritesPage,
  handleEditServiceCard,
}) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [editedCard, setEditedCard] = useState(null);
  const [isRated, setIsRated] = useLocalStorageState(`isRated-${card.id}`, {
    defaultValue: false,
  });
  const [rating, setRating] = useLocalStorageState(`rating-${card.id}`, {
    defaultValue: 0,
  });

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  const handleRating = (event) => {
    event.preventDefault();
    if (!isRated) {
      setIsRated(true);
      setRating(rating);
      alert("You have successfully rated!");
    } else {
      alert("You have already rated.");
    }
  };

  const handleEdit = (updatedServiceCard) => {
    setEditedCard(updatedServiceCard);
  };

  const handleSave = (event) => {
    event.preventDefault();

    handleEditServiceCard(editedCard);
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
          <br></br>
          {!isOnFavoritesPage && (
            <ServiceButton onClick={() => handleEdit(card)}>Edit</ServiceButton>
          )}
          <form onSubmit={handleRating}>
            <fieldset
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "none",
                marginTop: "10px",
              }}
            >
              <StarRating
                rating={rating}
                setRating={setRating}
                isRated={isRated}
              />
              {!isRated && <button type="submit">Rate Me</button>}
            </fieldset>
          </form>
        </div>
      )}
    </ServiceProviderWrapper>
  );
}
