import Header from "@/features/Header";
import Template from "@/layouts/Template";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>관리자</title>
      </Head>
      <Header />
      <Template>
        <Component {...pageProps} />
      </Template>
    </>
  );
}
