import { Hydrate, QueryClientProvider } from "react-query";

import { queryClient } from "../api";
import Layout from "../components/Layout";

import "../styles/globals.css";
import type { AppProps } from "next/app";


function App({ Component, pageProps }:AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;