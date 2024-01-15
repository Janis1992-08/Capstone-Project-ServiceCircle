import { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/data";
import styled from "styled-components";
import Image from "next/image";
import diversImage from "../public/assets/images/divers.jpg";
import { useSession } from "next-auth/react";

const HeaderWrapper = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 40px;
  color: black;
`;

const HeaderImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
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
  background-color: gray;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  text-align: center;
  outline: none;
  width: 60%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: green;
    text-decoration: none;
  }
`;

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: session } = useSession();

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === categoryId ? null : categoryId
    );
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <HeaderWrapper>
        <HeaderImage
          src={diversImage}
          alt="divers group of people"
          layout="fill"
          objectFit="cover"
        />
        <h1>Service Circle</h1>

        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Find your perfect Service-Match
        </h1>
      </HeaderWrapper>

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
                    <Link href={`/categories/${subcategory.id}`}>
                      {subcategory.name}
                    </Link>{" "}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {session && (
        <Link href="/create-service-card-form">
          <ServiceOfferElement>Make a Service Offer</ServiceOfferElement>
        </Link>
      )}

      <Link href="/favorites">
        <ShowFavorites>Show my Favorites</ShowFavorites>
      </Link>
    </div>
  );
};

export default Homepage;
