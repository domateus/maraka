import { createGlobalStyle } from "styled-components";
import type { MarakaTheme } from "./theme";

export default createGlobalStyle<{ theme: MarakaTheme }>`
  body {
    margin: 0;
    padding: 1rem;
    color: ${(props) => props.theme.colors?.quaternary};
    background-color: ${(props) => props.theme.colors?.denary};
  }
`;
