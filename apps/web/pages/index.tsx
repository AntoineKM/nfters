import Head from "next/head";
import styled from "styled-components";

import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>{"nfters"}</title>
      </Head>
      <Header />
      <Content>
        <Hero />
      </Content>
    </>
  );
}

const Content = styled.main`
  display: flex;
  flex-direction: column;
  max-width: ${({ theme }) => theme.breakpoint.laptop};
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
`;
