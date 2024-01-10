import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../styles/GlobalStyles";
import styled from "styled-components";
import { FiSun, FiMoon } from "react-icons/fi"; 
import useLocalStorageState from "use-local-storage-state";

const SwitchButton = styled.label`
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
`;

const SwitchInput = styled.input`
  margin-left: 10px;
  appearance: none;
  width: 40px;
  height: 20px;
  background-color: #3498db;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  outline: none;

  &:before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    transition: transform 0.3s ease;
    transform: ${({ checked }) =>
      checked ? "translateX(20px)" : "translateX(0)"};
  }
`;

export default function MyApp({ Component, pageProps }) {

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const [serviceCards, setServiceCards] = useLocalStorageState("serviceCards", {
    defaultValue: [],
  });
  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  function handleEditServiceCard(updatedServiceCard) {
    const updatedCards = serviceCards.map(card =>
      card.id === updatedServiceCard.id ? updatedServiceCard : card
    );
    setServiceCards(updatedCards);
  }

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
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Component 
        {...pageProps} 
        toggleTheme={toggleTheme} 
        theme={theme} 
        serviceCards={serviceCards}
        setServiceCards={setServiceCards}
        handleEditServiceCard={handleEditServiceCard}
        handleAddServiceCards={handleAddServiceCards}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
      <SwitchButton onClick={toggleTheme}>
        {theme === "light" ? <FiSun /> : <FiMoon />}
        <SwitchInput
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
      </SwitchButton>
    </ThemeProvider>
  );};