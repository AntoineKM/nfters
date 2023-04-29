import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import "@fontsource/dm-sans";
import GlobalStyle from "../components/GlobalStyle";
import { lightTheme } from "../services/themes";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
