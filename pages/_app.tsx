import { RootState, store, wrapper } from "@/context/store";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "styles/theme";
import GlobalStyles from "../styles/globals";

function MyApp({ Component, pageProps }: AppProps) {
  const { theme } = useSelector((state: RootState) => state.session);
  return (
    <>
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <Component {...pageProps} />
          <GlobalStyles />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
