import React from "react";
import ServiceProvider from "@/components/ServiceCard";
import styled from "styled-components";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";

const Headline = styled.p`
  color: #333;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  width: 300px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  }
`;

const FavoritesPage = ({ favorites, serviceCards, onToggleFavorite }) => {
  const favoriteCards = serviceCards.filter((card) =>
    favorites.includes(card.id)
  );

  return (
    <>
      <Link href="/">
        <Headline> &larr; Favorites</Headline>
      </Link>

      <main>
        <CardWrapper>
          {favoriteCards.map((card) => (
            <Card key={card.id}>
              <FavoriteButton
                onClick={() => onToggleFavorite(card.id)}
                isFavorite={favorites.includes(card.id)}
              />
              <ServiceProvider
                firstName={card.firstName}
                lastName={card.lastName}
                skills={card.skills}
                needs={card.needs}
                email={card.email}
                phone={card.phone}
              />
            </Card>
          ))}
        </CardWrapper>
      </main>
    </>
  );
};

export default FavoritesPage;
