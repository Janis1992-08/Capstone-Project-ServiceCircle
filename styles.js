import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#FFF",
  headerColor: "#333",
};

export const darkTheme = {
  body: "#363537",
  headerColor: "#FAFAFA",
};

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: system-ui;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
  
  }
  h1, h3, label {
    color: ${(props) => props.theme.headerColor};
  }

  .edit-labels {
    color: black;
  }
  .subtitles {
  color: ${(props) => props.theme.headerColor};
  }

  .login{
  color: ${(props) => props.theme.headerColor};
  }

  /* mobile iPhone SE */
  @media (max-width: 375px) and (max-height: 926px) {
    body {
    padding: 0;
  }
 
  img {
    width: 100%;
    object-fit: cover;
  }
  h1 {
    font-size: 30px;
    padding: 0;
  }
}
`;
