import styled from "styled-components";

import Card from "./Card";
import Button from "../Button";

const MoreNFTs: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Title>{"Discover more NFTs"}</Title>
        <Cards>
          <Card
            name={"CryptoPunks"}
            thumbnail={"https://picsum.photos/500/700?random=1"}
            bid={0.25}
            timeLeft={new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)}
          />
          <Card
            name={"CryptoPunks"}
            thumbnail={"https://picsum.photos/500/700?random=1"}
            bid={0.25}
            timeLeft={new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)}
          />
          <Card
            name={"CryptoPunks"}
            thumbnail={"https://picsum.photos/500/700?random=1"}
            bid={0.25}
            timeLeft={new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)}
          />
          <Card
            name={"CryptoPunks"}
            thumbnail={"https://picsum.photos/500/700?random=1"}
            bid={0.25}
            timeLeft={new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)}
          />
          <Card
            name={"CryptoPunks"}
            thumbnail={"https://picsum.photos/500/700?random=1"}
            bid={0.25}
            timeLeft={new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)}
          />
        </Cards>
        <StyledButton variant={"secondary"}>{"More NFTs"}</StyledButton>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 32px 0 64px;
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
  width: 100%;
`;

const Cards = styled.div`
  display: flex;
  margin-top: 16px;
  margin-left: -16px;
  flex-wrap: wrap;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-top: 32px;
`;

export default MoreNFTs;
