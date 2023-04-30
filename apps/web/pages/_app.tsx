import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { createClient, WagmiConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import GlobalStyle from "../components/GlobalStyle";
import { lightTheme } from "../services/themes";

import "@fontsource/dm-sans";

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <WagmiConfig client={client}>
        <GlobalStyle />
        <Component {...pageProps} />
      </WagmiConfig>
    </ThemeProvider>
  );
}
