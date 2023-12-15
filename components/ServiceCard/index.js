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

export default function ServiceProvider({ firstName, lastName, skills, needs, email, phone }) {

  const [showContactInfo, setShowContactInfo] = useState(false);

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  return (
    <ServiceProviderWrapper>
      <h2>{firstName} {lastName}</h2>
      <p><strong>Skills:</strong> {skills}</p>
      <p><strong>Needs:</strong> {needs}</p>

      {showContactInfo && (
        <ServiceDetails>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
        </ServiceDetails>
      )}

      <ServiceButton type="button" onClick={toggleContactInfo}>
        {showContactInfo ? 'Hide Contact' : 'Show Contact'}
      </ServiceButton>
    </ServiceProviderWrapper>
  );
};

