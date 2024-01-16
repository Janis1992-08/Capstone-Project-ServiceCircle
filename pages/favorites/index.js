import ServiceProvider from "@/components/ServiceProvider";
import styled from "styled-components";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

const Header = styled.header`
  padding: 20px;
  text-align: center;
`;

const Headline = styled.p`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
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
  if (!data || !isReady) return <div>Loading...</div>;

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
