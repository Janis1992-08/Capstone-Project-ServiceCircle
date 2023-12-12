import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
  }
  /* mobile iPhone SE */
  @media (max-width: 375px) and (max-height: 667px) {
    width: calc(100% - 40px); 
    margin: 10px;
  }
`;
