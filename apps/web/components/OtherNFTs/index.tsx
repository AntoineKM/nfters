import styled from "styled-components";

import Card from "./Card";
import Button from "../Button";

const OtherNFTs: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Title>{"Discover other NFTs"}</Title>
        <Cards>
          <Card
            name={"CryptoPunks"}
            thumbnail={"https://picsum.photos/500/700?random=1"}
          />
          <Card
            name={"CryptoPunks"}
            thumbnail={"https://picsum.photos/500/700?random=1"}
          />
          <Card
            name={"CryptoPunks"}
            thumbnail={"https://picsum.photos/500/700?random=1"}
          />
          <Card
            name={"CryptoPunks"}
            thumbnail={"https://picsum.photos/500/700?random=1"}
          />
          <Card
            name={"CryptoPunks"}
            thumbnail={"https://picsum.photos/500/700?random=1"}
          />
        </Cards>
        <Button variant={"secondary"}>{"More NFTs"}</Button>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 96px 0;
  background-color: ${({ theme }) => theme.colors.background.lighter};
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoint.laptop};
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.text.size.title};
`;

const Cards = styled.div`
  display: flex;
  margin-top: 16px;
  margin-left: -16px;
  flex-wrap: wrap;
  width: 100%;
`;

export default OtherNFTs;
