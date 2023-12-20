import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";

export default function MyApp({ Component, pageProps }) {
  const [serviceCards, setServiceCards] = useLocalStorageState("serviceCards", {
    defaultValue: [],
  });
  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  function handleAddServiceCards(newServiceCard) {
    setServiceCards((prevServiceCards) => [
      ...prevServiceCards,
      newServiceCard,
    ]);
  }

  function handleToggleFavorite(serviceCardId) {
    const isFavorite = favorites.includes(serviceCardId);
    if (isFavorite) {
      setFavorites(favorites.filter((id) => id !== serviceCardId));
    } else {
      setFavorites([...favorites, serviceCardId]);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        serviceCards={serviceCards}
        handleAddServiceCards={handleAddServiceCards}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </>
  );
}
