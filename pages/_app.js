import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { FiSun, FiMoon } from "react-icons/fi";
import { lightTheme, darkTheme } from "../styles";
import { SessionProvider } from "next-auth/react";

const fetcher = (url) => fetch(url).then((response) => response.json());

const SwitchLabel = styled.label`
  position: absolute;
  top: 7px;
  right: 5px;
  display: flex;
  align-items: center;
`;

const SwitchInput = styled.input`
  margin-left: 10px;
  appearance: none;
  width: 50px;
  height: 25px;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#3498db" : "#9c9fa1"};
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  outline: none;

  &:before {
    content: "";
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: white;
    transition: transform 0.3s ease;
    transform: ${({ checked }) =>
      checked ? "translateX(25px)" : "translateX(0)"};
  }
`;

const SwitchIcon = styled.div`
  position: absolute;
  top: 55%;
  left: ${({ theme }) => (theme === "dark" ? "75%" : "35%")};
  transform: translate(-50%, -50%);
  z-index: ${({ theme }) => (theme === "light" ? 1 : 2)};
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

      <SessionProvider session={pageProps.session}>
        <SWRConfig value={{ fetcher }}>
          <Component
            {...pageProps}
            toggleTheme={toggleTheme}
            theme={theme}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
          <SwitchLabel>
            <SwitchIcon theme={theme}>
              {theme === "light" ? (
                <FiSun color="black" />
              ) : (
                <FiMoon color="black" />
              )}
            </SwitchIcon>
            <SwitchInput
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              theme={theme}
            />
          </SwitchLabel>
        </SWRConfig>
      </SessionProvider>
    </ThemeProvider>
  );
}
