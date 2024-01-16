import ServiceProvider from "@/components/ServiceProvider";
import styled from "styled-components";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Header = styled.header`
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const Headline = styled.h1`
  color: #333;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;

const CardWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const Card = styled.li`
  background-color: #fff;
  border: 1px solid #ccc;
  list-style: none;
  border-radius: 5px;
  padding: 10px;
  width: 300px;
  text-align: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FavoritesPage = ({ favorites, onToggleFavorite }) => {
  const router = useRouter();
  const { isReady } = router;
  const { data } = useSWR("/api/providers");
  const { data: session, status } = useSession();
  if (!data || !isReady) return <div>Loading...</div>;

  if (status !== "authenticated") {
    return (
      <>
        <Link href="/">
          <Headline>&larr; Back to Categories</Headline>
        </Link>
        <p>Access denied without login</p>
      </>
    );
  }

  const favoriteCards = data
    ? data.filter((card) => favorites.includes(card._id))
    : [];

  return (
    <>
      <Header>
        <HeaderWrapper>
          <Link href="/">
            <Headline> &larr; Favorites</Headline>
          </Link>
        </HeaderWrapper>
      </Header>

      <main>
        <CardWrapper>
          {favoriteCards.map((card) => (
            <Card key={card._id}>
              <FavoriteButton
                onClick={() => onToggleFavorite(card._id)}
                isFavorite={favorites.includes(card._id)}
              />
              <ServiceProvider
                key={card._id}
                card={card}
                isOnFavoritesPage={true}
              />
            </Card>
          ))}
        </CardWrapper>
      </main>
    </>
  );
};

export default FavoritesPage;
