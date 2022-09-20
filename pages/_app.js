import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

/**
 *  We will be using Following things for our  task
 *
 * Next JS - for setting up entire app
 * Wagmi / Rainbow Wallet -  Connecting the Different Wallets
 * Chakra UI - Using Clean Composeable React Components to keep code Clean
 * Alchemy SDK
 *
 */

/**
 *   Wagmi and Rainbow Wallet Connection Setup things Boilerplate
 *
 *        STARTED
 */

 const Polygon = {
  id: 137,
  name: "Matic Mainnet",
  network: "polygon",
  nativeCurrency: {
    decimals: 18,
    name: "Matic",
    symbol: "MATIC",
  },
  rpcUrls: {
    default: " https://polygon-rpc.com",
  },
  blockExplorers: {
    default: {
      name: "polygonscan",
      url: "https://polygonscan.com/",
    },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [Polygon],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== Polygon.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Lw3 Task ",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
/**
 *   Wagmi and Rainbow Wallet Connection Setup things Boilerplate
 *
 *        Ended
 */

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          {/*Wrapping Each Component inside Chakra , Wagmi and Rainbow Toolki to Access their Features  */}

          <Navbar />
          {/* We Wanted to Show Navbar On Each Route of the Navbar */}

          <Component {...pageProps} />
          {/* Showing Each Component with Above Line */}
          
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
