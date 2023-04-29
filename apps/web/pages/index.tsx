import Head from "next/head";
import styled from "styled-components";

import Amaze from "../components/Amaze";
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
    </>
  );
}
