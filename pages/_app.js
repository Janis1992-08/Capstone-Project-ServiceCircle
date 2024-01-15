import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { FiSun, FiMoon } from "react-icons/fi";
import { lightTheme, darkTheme } from "../styles";

const fetcher = (url) => fetch(url).then((response) => response.json());

const SwitchLabel = styled.label`
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
  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const isValidTheme = ["light", "dark"].includes(storedTheme);
    const defaultTheme = isValidTheme ? storedTheme : "light";
    
    setTheme(defaultTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

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
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          toggleTheme={toggleTheme}
          theme={theme}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
        <SwitchLabel onClick={toggleTheme}>
          {theme === "light" ? <FiSun /> : <FiMoon />}
          <SwitchInput
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
        </SwitchLabel>
      </SWRConfig>
    </ThemeProvider>
  );
}
