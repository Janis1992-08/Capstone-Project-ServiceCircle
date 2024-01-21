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
  background-color: #f0f0f0;
  padding: 10px;
  text-align: flex-start;
  border-bottom: 1px solid #ccc;
  margin-left: -20px;
  margin-right: -20px;
  margin-top: 0px;
`;

const Headline = styled.p`
  display: inline-block;
  border-radius: 5px;
  font-size: 1.6rem;
  font-weight: bold;
  color: black;
  text-decoration: none;
  margin-left: 0;
  margin-bottom: 20px;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3498db;
  }
`;

const CardWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  list-style-type: none;
`;

const Card = styled.li`
  border: 2px solid #ccc;
  list-style: none;
  border-radius: 5px;
  background-color: #f7f6f0;
  padding: 10px;
  width: 300px;
  text-align: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  }
`;

const Main = styled.main`
  padding: 20px;
`;

const Details = styled.details`
  margin-bottom: 20px;
`;
const Summary = styled.summary`
  cursor: pointer;
  padding: 10px;
  background-color: #167004;
  color: black;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #167004;
  }
`;

const Div = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  border-radius: 50%;
  width: 150px;
  height: 100px;
  overflow: hidden;
`;

const UserPage = ({ favorites, onToggleFavorite }) => {
  const router = useRouter();
  const { isReady } = router;
  const { data, mutate } = useSWR("/api/providers");
  const { data: session, status } = useSession();

  if (!data || !isReady) return <div>Loading...</div>;

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
        <Link href="/">
          <Headline> &larr; Back to Categories</Headline>
        </Link>
      </Header>

      <Main>
        <UserDetail>
          {session.user.image && (
            <ImageWrapper>
              <Image
                src={session.user.image}
                alt="User profile picture"
                strategy="responsive"
                width={200}
                height={200}
              />
            </ImageWrapper>
          )}
          <h3>Welcome {session.user.name}</h3>
        </UserDetail>
        <Details>
          <Summary>Show my Cards</Summary>
          <h2 className="subtitles">My Cards</h2>
          <CardWrapper>
            {myCards.length > 0 ? (
              myCards.map((card) => (
                <Card key={card._id}>
                  <ServiceProvider card={card} />
                </Card>
              ))
            ) : (
              <Div>No cards to display</Div>
            )}
          </CardWrapper>
        </Details>

        <Details>
          <Summary>Show my Favorites</Summary>
          <h2 className="subtitles">Favorite Cards</h2>
          <CardWrapper>
            {favoriteCards.length ? (
              favoriteCards.map((card) => (
                <Card key={card._id}>
                  <FavoriteButton
                    onClick={() => onToggleFavorite(card._id)}
                    isFavorite={favorites.includes(card._id)}
                  />
                  <ServiceProvider card={card} />
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

export default UserPage;
