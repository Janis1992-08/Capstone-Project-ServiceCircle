import { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/data";
import styled from "styled-components";
import Image from "next/image";
import diversImage from "../public/assets/images/divers.jpg";

const HeaderContainer = styled.div`
  text-align: center;
  margin-top: 5px;
`;

const HeaderImage = styled(Image)`
  margin-top: 5px;
  object-fit: cover;
  height: 150px;
`;

const HeaderTitle = styled.h1`
  margin-top: 5px;
`;

const buttonStyle = {
  backgroundColor: "#3498db",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
  textAlign: "left",
};

const selectedButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#4CAF50",
};

const subcategoryStyle = {
  backgroundColor: "#f2f2f2",
  padding: "8px",
  margin: "5px 0",
  borderRadius: "5px",
};

const ServiceOfferElement = styled.div`
  display: block;
  margin: 20px auto;
  padding: 15px 30px;
  border-radius: 8px;
  background-color: darkorange;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  text-decoration: none;
  text-align: center;
  outline: none;
  width: 80%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff7f00;
    text-decoration: none;
  }
`;

const ShowFavorites = styled.div`
  display: block;
  margin: 20px auto;
  padding: 15px 30px;
  border-radius: 25px;
  background-color: darkgreen;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  text-align: center;
  outline: none;
  width: 60%;
  transition: background-color 0.3s ease;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === categoryId ? null : categoryId
    );
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />   
      <HeaderContainer>
        <HeaderTitle>Service Circle</HeaderTitle>
        <HeaderImage src={diversImage} alt="a group of people with divers professions" width={1000} height={400} />
        <HeaderTitle>Find your perfect Service-Match</HeaderTitle>
      </HeaderContainer>
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {categories.map((category) => (
          <li key={category.id} style={{ marginBottom: "10px" }}>
            <button
              onClick={() => handleCategoryClick(category.id)}
              style={
                selectedCategory === category.id
                  ? selectedButtonStyle
                  : buttonStyle
              }
            >
              {category.name}
            </button>
            {selectedCategory === category.id && (
              <ul
                style={{
                  listStyleType: "none",
                  paddingLeft: "20px",
                  margin: 0,
                }}
              >
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id} style={subcategoryStyle}>
                    <StyledLink href={`/categories/${subcategory.id}`}>
                      {subcategory.name}
                    </StyledLink>{" "}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <StyledLink href="/create-service-card-form">
        <ServiceOfferElement>Make a Service Offer</ServiceOfferElement>
      </StyledLink>
      <StyledLink href="/favorites">
        <ShowFavorites>Show my Favorites</ShowFavorites>
      </StyledLink>
    </div>
  );
};

export default Homepage;
