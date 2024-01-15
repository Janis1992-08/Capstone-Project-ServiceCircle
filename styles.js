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

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
  }
  h2, h3 {
    color: ${(props) => props.theme.headerColor};
  }
  /* mobile iPhone SE */
  @media (max-width: 375px) and (max-height: 667px) {
    width: calc(100% - 40px); 
    margin: 10px;
  }
`;
