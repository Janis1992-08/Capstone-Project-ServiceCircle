import ServiceProvider from "@/components/ServiceProvider";
import styled from "styled-components";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

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
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 100%;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Main = styled.main`
  padding: 20px;
`;

const Details = styled.details`
  margin-bottom: 20px;

  & > summary {
    cursor: pointer;
    padding: 10px;
    background-color: grey;
    color: black;
    border-radius: 5px;
    margin-bottom: 10px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }

  & > h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  & > div {
    margin-top: 10px;
    text-align: center;
  }
`;

const FavoritesPage = ({ favorites, onToggleFavorite }) => {
  const router = useRouter();
  const { isReady } = router;
  const { data, mutate } = useSWR("/api/providers");
  const { data: session, status } = useSession();

  if (!data || !isReady) return <div>Loading...</div>;
  console.log(session);
  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  const myCards = data
    ? data.filter((card) => session.user.email === card.author)
    : [];
  const favoriteCards = data
    ? data.filter((card) => favorites.includes(card._id))
    : [];

  return (
    <Container>
      <Header>
        <HeaderWrapper>
          <Link href="/">
            <Headline> &larr; Back to Categories</Headline>
          </Link>
          {session.user.image && (
            <div
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                width: "150px",
                height: "100px",
              }}
            >
              <Image
                src={session.user.image}
                alt="User profile picture"
                strategy="responsive"
                width={200}
                height={200}
              />
            </div>
          )}
        </HeaderWrapper>
      </Header>

      <Main>
        <Details>
          <summary>Show my Cards</summary>
          <h2>My Cards</h2>
          <CardWrapper>
            {myCards.length > 0 ? (
              myCards.map((card) => (
                <Card key={card._id}>
                  <FavoriteButton
                    onClick={() => onToggleFavorite(card._id)}
                    isFavorite={favorites.includes(card._id)}
                  />
                  <ServiceProvider key={card._id} card={card} />
                </Card>
              ))
            ) : (
              <div>No cards to display</div>
            )}
          </CardWrapper>
        </Details>

        <Details>
          <summary>Show my Favorites</summary>
          <h2>Favorite Cards</h2>
          <CardWrapper>
            {favoriteCards.length > 0 ? (
              favoriteCards.map((card) => (
                <Card key={card._id}>
                  <FavoriteButton
                    onClick={() => onToggleFavorite(card._id)}
                    isFavorite={favorites.includes(card._id)}
                  />
                  <ServiceProvider key={card._id} card={card} />
                </Card>
              ))
            ) : (
              <div>No favorite cards to display</div>
            )}
          </CardWrapper>
        </Details>
      </Main>
    </Container>
  );
};

export default FavoritesPage;
