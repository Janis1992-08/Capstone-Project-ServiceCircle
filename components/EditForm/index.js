import useSWR from "swr";
import styled from "styled-components";
import { useSession } from "next-auth/react";

const ServiceButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const InputField = styled.input`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  overflow: hidden;
`;

export default function EditForm({ editedCard, setEditedCard, card }) {
  const { mutate } = useSWR("/api/providers");
  const { data: session, status } = useSession();

  async function handleEditServiceCard() {
    try {
      const url = `/api/providers/${card._id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedCard),
      });

      if (response.ok) {
        const updatedData = await response.json();

        mutate();
        return updatedData;
      } else {
        console.error("Error updating provider:", response.statusText);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  const handleSave = async (event) => {
    event.preventDefault();

    const updatedData = await handleEditServiceCard();
    setEditedCard(updatedData);
  };

  if (!editedCard) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSave}>
      <label htmlFor="firstName" className="edit-labels">
        First Name:
      </label>
      <InputField
        type="text"
        id="firstName"
        required
        value={editedCard.firstName}
        onChange={(event) =>
          setEditedCard({ ...editedCard, firstName: event.target.value })
        }
      />

      <label htmlFor="lastName" className="edit-labels">
        Last Name:
      </label>
      <InputField
        type="text"
        id="lastName"
        required
        value={editedCard.lastName}
        onChange={(event) =>
          setEditedCard({ ...editedCard, lastName: event.target.value })
        }
      />

      <label htmlFor="skills" className="edit-labels">
        Skills:
      </label>
      <InputField
        type="text"
        id="skills"
        required
        value={editedCard.skills}
        onChange={(event) =>
          setEditedCard({ ...editedCard, skills: event.target.value })
        }
      />

      <label htmlFor="needs" className="edit-labels">
        Needs:
      </label>
      <InputField
        type="text"
        id="needs"
        required
        value={editedCard.needs}
        onChange={(event) =>
          setEditedCard({ ...editedCard, needs: event.target.value })
        }
      />

      <label htmlFor="email" className="edit-labels">
        Email:
      </label>
      <InputField
        type="email"
        id="email"
        required
        value={editedCard.email}
        onChange={(event) =>
          setEditedCard({ ...editedCard, email: event.target.value })
        }
      />

      <label htmlFor="phone" className="edit-labels">
        Phone:
      </label>
      <InputField
        type="tel"
        id="phone"
        required
        value={editedCard.phone}
        onChange={(event) =>
          setEditedCard({ ...editedCard, phone: event.target.value })
        }
      />

      <label htmlFor="city" className="edit-labels">City: </label>
        <InputField
          type="text"
          id="city"
          name="city"
          value={editedCard.city}
          onChange={(event) =>
            setEditedCard({ ...editedCard, city: event.target.value })
          }
          required
        />

        <label htmlFor="district" className="edit-labels">District: </label>
        <InputField
          type="text"
          id="district"
          name="district"
          value={editedCard.district}
          onChange={(event) =>
            setEditedCard({ ...editedCard, district: event.target.value })
          }
          required
        />

        <label htmlFor="postalCode" className="edit-labels">Postal Code: </label>
        <InputField
          type="text"
          id="postalCode"
          name="postalCode"
          value={editedCard.postalCode}
          onChange={(event) =>
            setEditedCard({ ...editedCard, postalCode: event.target.value })
          }
          minLength={4}
          maxLength={5}
          required
          />

      <ServiceButton type="submit">Save</ServiceButton>
    </form>
  );
}
