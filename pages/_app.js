import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";


export default function MyApp({ Component, pageProps }) {
  const [serviceCards, setServiceCards] = useLocalStorageState("serviceCards", {
    defaultValue: [],
  });
  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  function handleRating(id, rating) {
    setServiceCards(
      serviceCards.map((service) =>
        service.id === id ? { ...service, rating } : service
      )
    );
  }

  function handleEditServiceCard(updatedServiceCard) {
    const updatedCards = serviceCards.map(card =>
      card.id === updatedServiceCard.id ? updatedServiceCard : card
    );
    setServiceCards(updatedCards);
  }

  const handleDelete = (deletedCard) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this service provider?"
    );

    if (isConfirmed) {
      const deletedServiceCards = serviceCards.filter((card) => card.id !== deletedCard.id);
      setServiceCards(deletedServiceCards);
    }
  };

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
        setServiceCards={setServiceCards}
        onRating={handleRating}
        handleDelete={handleDelete}
        handleEditServiceCard={handleEditServiceCard}
        handleAddServiceCards={handleAddServiceCards}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </>
  );
}
