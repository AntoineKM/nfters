import Head from "next/head";

import Amaze from "../components/Amaze";
import Collection from "../components/Collection";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>{"nfters"}</title>
      </Head>
      <Header />
      <Hero />
      <Amaze />
      <Collection />
    </>
  );
}
