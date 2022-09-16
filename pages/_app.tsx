import type { AppProps } from "next/app";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Context } from "../src/context";
import GlobalStyles from "../styles/globals";
import { darkTheme, lightTheme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [context, setContext] = useState({ theme: "light" });

  const toggleTheme = () => {
    setContext((prev) => ({
      ...prev,
      theme: context.theme === "light" ? "dark" : "light",
    }));
  };

  return (
    <>
      <Context.Provider value={{ theme: context.theme, toggleTheme }}>
        <ThemeProvider
          theme={context.theme === "light" ? lightTheme : darkTheme}
        >
          <Component {...pageProps} />
          <GlobalStyles />
        </ThemeProvider>
      </Context.Provider>
    </>
  );
}

export default MyApp;
