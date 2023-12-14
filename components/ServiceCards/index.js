import { useState } from "react";

export default function ServiceProvider({
  firstName,
  lastName,
  skills,
  needs,
  email,
  phone,
}) {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  return (
    <div className="service-provider">
      <h2>
        {firstName} {lastName}
      </h2>
      <p>
        <strong>Skills:</strong> {skills}
      </p>
      <p>
        <strong>Needs:</strong> {needs}
      </p>

      {showContactInfo ? (
        <div>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
        </div>
      ) : null}

      <button onClick={toggleContactInfo}>
        {showContactInfo ? "Hide Contact" : "Show Contact"}
      </button>
    </div>
  );
}
