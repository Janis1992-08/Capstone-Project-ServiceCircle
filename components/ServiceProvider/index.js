import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import ReviewForm from "@/components/ReviewForm";
import EditForm from "@/components/EditForm";
import StarRating from "../StarRating";
import { useSession } from "next-auth/react";
import AverageRating from "../AverageRating";

const ServiceProviderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  background-color: white;
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
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  margin: 6px;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  margin: 6px;
`;

const ShowContactButton = styled.button`
  background-color: #029e86;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
`;

const OwnerMessage = styled.p`
  color: red;
  position: relative;
  margin-top: 0px;
  background-color: #f0f0f0;
`;

export default function ServiceProvider({ card, isOnUserPage }) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [editedCard, setEditedCard] = useState(null);
  const { data: session } = useSession();

  const { mutate } = useSWR("/api/providers");

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  const handleOpenEditForm = () => {
    setEditedCard(card);
  };

  async function handleDelete(id) {
    const url = `/api/providers/${id}`;

    const userConfirmed = window.confirm(
      "Do you really want to permanently delete this card? You cannot restore the card after confirmation!"
    );
    if (!userConfirmed) {
      return;
    }
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        await response.json();

        mutate();
        alert("You have successfully deleted the card!");
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("An error occurred during the delete request:", error);
    }
  }

  return (
    <ServiceProviderWrapper key={card._id}>
      {session && session.user.email === card.author && (
        <OwnerMessage>This is your service card.</OwnerMessage>
      )}

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

          <p>
            <strong>Skills:</strong> {card.skills}
          </p>
          <p>
            <strong>Needs:</strong> {card.needs}
          </p>
          {showContactInfo && (
            <div>
              <p>
                <strong>Email:</strong> {card.email}
              </p>
              <p>
                <strong>Phone:</strong> {card.phone}
              </p>
              <p>
                <strong>City:</strong> {card.city}
              </p>
              <p>
                <strong>District:</strong> {card.district}
              </p>
              <p>
                <strong>Postal Code:</strong> {card.postalCode}
              </p>
            </div>
          )}

          {session ? (
            <ShowContactButton type="button" onClick={toggleContactInfo}>
              {showContactInfo ? "Hide Contact" : "Show Contact"}
            </ShowContactButton>
          ) : (
            <p style={{ color: "red" }}>
              Please log in to see the contact information.
            </p>
          )}
          <hr></hr>
          <details>
            <summary>
              {session ? (
                session.user.email === card.author ? (
                  <strong>Go to Reviews</strong>
                ) : (
                  <strong>Give me a Review</strong>
                )
              ) : (
                <strong>Go to Reviews</strong>
              )}
            </summary>

            {session && session.user.email !== card.author && (
              <ReviewForm card={card} />
            )}

            {card.reviews && card.reviews.length > 0 ? (
              <article>
                <h2>Reviews:</h2>
                {card.reviews.map((review, index) => (
                  <div key={index}>
                    <p>{review.review}</p>
                  </div>
                ))}
              </article>
            ) : (
              <p>No reviews yet.</p>
            )}
          </details>

          <hr></hr>
          <details>
            <summary>
              {session ? (
                session.user.email === card.author ? (
                  <strong>Show Average Rating</strong>
                ) : (
                  <strong>Give me a Rating</strong>
                )
              ) : (
                <strong>Show Average Rating</strong>
              )}
            </summary>

            {session && session.user.email !== card.author && (
              <StarRating card={card} />
            )}
            <br></br>

            <AverageRating card={card} />
          </details>

          {!isOnUserPage && session && session.user.email === card.author && (
            <>
              <hr></hr>
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
            </>
          )}
        </div>
      )}
    </ServiceProviderWrapper>
  );
}
