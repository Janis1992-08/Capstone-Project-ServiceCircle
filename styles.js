import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#FFF",
  //text: "#363537",
  headerColor: "#333"
};

export const darkTheme = {
  body: "#363537",
  //text: "#FAFAFA",
  headerColor: "#FAFAFA"
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
  h1, label {
    color: ${(props) => props.theme.headerColor};
  }
  .star-rating {
    color: black;
  }
  .edit-labels {
    color: black;
  }
  /* mobile iPhone SE */
  @media (max-width: 375px) and (max-height: 667px) {
    body {
    width: calc(100% - 40px); 
    margin: 10px;
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
