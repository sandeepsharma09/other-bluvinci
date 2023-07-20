import AnalyticsProvider, {
  initializeAnalytics,
} from 'components/AnalyticsProvider'
initializeAnalytics()

import { Inter } from '@next/font/google'
import type { AppContext, AppProps } from 'next/app'
import { default as NextApp } from 'next/app'
import { ThemeProvider, useTheme } from 'next-themes'
import { darkTheme, globalReset } from 'stitches.config'
import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  getDefaultWallets,
  midnightTheme,
  darkTheme as rainbowDarkTheme,
  lightTheme as rainbowLightTheme,
} from '@rainbow-me/rainbowkit'

import * as Tooltip from '@radix-ui/react-tooltip'

import { alchemyProvider } from 'wagmi/providers/alchemy'

import {
  ReservoirKitProvider,
  darkTheme as reservoirDarkTheme,
  lightTheme as reservoirLightTheme,
  ReservoirKitTheme,
  CartProvider,
} from '@reservoir0x/reservoir-kit-ui'
import { FC, useEffect, useState } from 'react'
import { HotkeysProvider } from 'react-hotkeys-hook'
import ToastContextProvider from 'context/ToastContextProvider'
import supportedChains from 'utils/chains'
import { useMarketplaceChain } from 'hooks'
import ChainContextProvider from 'context/ChainContextProvider'

// import { Mumbai, Goerli,Ethereum, Arbitrum, ArbitrumGoerli } from "@thirdweb-dev/chains";
//CONFIGURABLE: Use nextjs to load your own custom font: https://nextjs.org/docs/basic-features/font-optimization
const inter = Inter({
  subsets: ['latin'],
})
////////////////////start/////////////////
import {

  configureChains,
  createClient,
  WagmiConfig,
  useSigner,
  mainnet,goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import {
  connectorsForWallets,

} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ThirdwebSDKProvider, ChainId } from "@thirdweb-dev/react";

import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

const { chains,provider } = configureChains(
   [mainnet,goerli],
  [
    alchemyProvider({ apiKey: 'GS2JRF2yxRsx3IqL0eZzUFfVl5qOmFIN' }),
    publicProvider(),
  ]
);

//////////////////end
export const NORMALIZE_ROYALTIES = process.env.NEXT_PUBLIC_NORMALIZE_ROYALTIES
  ? process.env.NEXT_PUBLIC_NORMALIZE_ROYALTIES === 'true'
  : false

// const { chains, provider } = configureChains(supportedChains, [
//   alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || '' }),
//   publicProvider(),
// ])

// const { connectors } = getDefaultWallets({
//   appName: 'Reservoir Marketplace',
//   chains,
// })

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
// })

//CONFIGURABLE: Here you can override any of the theme tokens provided by RK: https://docs.reservoir.tools/docs/reservoir-kit-theming-and-customization
const reservoirKitThemeOverrides = {
  headlineFont: inter.style.fontFamily,
  font: inter.style.fontFamily,
  primaryColor: '#6E56CB',
  primaryHoverColor: '#644fc1',
}
/////////////////////////////////start/////////




// const { chains, provider } = configureChains(
//   [chain.goerli],
//   [
//     jsonRpcProvider({
//       rpc: () => {
//         return {
//           http: "https://rpc.ankr.com/eth_goerli",
//         };
//       },
//     }),
//     publicProvider(),
//   ]
// );

// const connectors = connectorsForWallets([
//   {
//     groupName: "Recommended",
//     wallets: [
//       wallet.metaMask({ chains, shimDisconnect: true }),
//       wallet.walletConnect({ chains }),
//       wallet.coinbase({ appName: "probably nothing", chains }),
//       wallet.rainbow({ chains }),
//     ],
//   },
//   {
//     groupName: "Others",
//     wallets: [
//       wallet.argent({ chains }),
//       wallet.brave({
//         chains,
//         shimDisconnect: true,
//       }),
//       wallet.imToken({ chains }),
//       wallet.injected({
//         chains,
//         shimDisconnect: true,
//       }),
//       wallet.ledger({
//         chains,
//       }),
//       wallet.steak({ chains }),
//       wallet.trust({ chains, shimDisconnect: true }),
//     ],
//   },
// ]);
// const connectors = connectorsForWallets([
//   {
//     groupName: 'Recommended',
//     wallets: [
//       injectedWallet({ chains }),
//       rainbowWallet({ projectId, chains }),
//       walletConnectWallet({ projectId, chains }),
//     ],
//   },
// ]);




const projectId= 'c28900418b22d03c12085ee6f997708c';
const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({  chains }),
      metaMaskWallet({  chains }),
      coinbaseWallet({ chains, appName: 'My RainbowKit App' }),
      walletConnectWallet({  chains }),
    ],
  },
]);


const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

const activeChainId = ChainId.Goerli;

function ThirdwebProvider({ wagmiClient, children }: any) {
  const { data: signer } = useSigner();
  return (
    <ThirdwebSDKProvider
      desiredChainId={activeChainId}
      signer={signer as any}
      provider={wagmiClient.provider}
      queryClient={wagmiClient.queryClient as any}
    >
      {children}
    </ThirdwebSDKProvider>
  );
}

////////////////////////////////end///////////
function AppWrapper(props: AppProps & { baseUrl: string }) {

  const activeChain = "mumbai"; 
  const activeChain1 = "goerli"; 
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      value={{
        dark: darkTheme.className,
        light: 'light',
      }}
    >
      {/* // activeChain={activeChain} */}
       <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={midnightTheme()} coolMode>
          <ThirdwebProvider wagmiClient={wagmiClient}>
        <ChainContextProvider>
          
          <AnalyticsProvider>
            <MyApp {...props} />
          </AnalyticsProvider>
         
        </ChainContextProvider>
      </ThirdwebProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}

function MyApp({
  Component,
  pageProps,
  baseUrl,
}: AppProps & { baseUrl: string }) {
  globalReset()

  const { theme } = useTheme()
  const marketplaceChain = useMarketplaceChain()
  const [reservoirKitTheme, setReservoirKitTheme] = useState<
    ReservoirKitTheme | undefined
  >()

  const [rainbowKitTheme, setRainbowKitTheme] = useState<
    | ReturnType<typeof rainbowDarkTheme>
    | ReturnType<typeof rainbowLightTheme>
    | undefined
  >()

  useEffect(() => {
    if (theme == 'dark') {
      setReservoirKitTheme(reservoirDarkTheme(reservoirKitThemeOverrides))
      setRainbowKitTheme(
        rainbowDarkTheme({
          borderRadius: 'small',
        })
      )
    } else {
      setReservoirKitTheme(reservoirLightTheme(reservoirKitThemeOverrides))
      setRainbowKitTheme(
        rainbowLightTheme({
          borderRadius: 'small',
        })
      )
    }
  }, [theme])

  const FunctionalComponent = Component as FC

  let source = process.env.NEXT_PUBLIC_MARKETPLACE_SOURCE

  if (!source && process.env.NEXT_PUBLIC_HOST_URL) {
    try {
      const url = new URL(process.env.NEXT_PUBLIC_HOST_URL)
      source = url.host
    } catch (e) {}
  }

  return (
    <HotkeysProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        value={{
          dark: darkTheme.className,
          light: 'light',
        }}
      >
        <ReservoirKitProvider
          options={{
            //CONFIGURABLE: Override any configuration available in RK: https://docs.reservoir.tools/docs/reservoirkit-ui#configuring-reservoirkit-ui
            // Note that you should at the very least configure the source with your own domain
            chains: supportedChains.map(({ proxyApi, id }) => {
              return {
                id,
                baseApiUrl: `${baseUrl}${proxyApi}`,
                default: marketplaceChain.id === id,
              }
            }),
            source: source,
            normalizeRoyalties: NORMALIZE_ROYALTIES,
          }}
          theme={reservoirKitTheme}
        >
          <CartProvider>
            <Tooltip.Provider>
               <RainbowKitProvider chains={chains} theme={midnightTheme()} coolMode>
          <ThirdwebProvider wagmiClient={wagmiClient}>
                <ToastContextProvider>
                  <FunctionalComponent {...pageProps} />
                </ToastContextProvider>
                   </ThirdwebProvider>
              </RainbowKitProvider>
            </Tooltip.Provider>
          </CartProvider>
        </ReservoirKitProvider>
      </ThemeProvider>
    </HotkeysProvider>
  )
}

AppWrapper.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await NextApp.getInitialProps(appContext)
  let baseUrl = ''

  if (appContext.ctx.req?.headers.host) {
    const host = appContext.ctx.req?.headers.host
    baseUrl = `${host.includes('localhost') ? 'http' : 'https'}://${host}`
  } else if (process.env.NEXT_PUBLIC_HOST_URL) {
    baseUrl = process.env.NEXT_PUBLIC_HOST_URL || ''
  }
  baseUrl = baseUrl.replace(/\/$/, '')

  return { ...appProps, baseUrl }
} 

export default AppWrapper

