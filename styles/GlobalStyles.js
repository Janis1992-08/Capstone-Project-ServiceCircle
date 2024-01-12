import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#FFF",
  text: "#363537",
  headerColor: "#333",
};

export const darkTheme = {
  body: "#363537",
  text: "#FAFAFA",
  headerColor: "#333",
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
  }

   h2, h3 {
    color: ${(props) => props.theme.headerColor};
  }

`;
