import styled from "styled-components";

import Card from "./Card";
import Button from "../Button";
import LiveIcon from "../Icons/Live";

const Hero: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Content>
          <Title>{"Discover, and collect Digital Art NFTs"}</Title>
          <Description>
            {
              "Digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, Sell, and discover exclusive digital assets."
            }
          </Description>
          <Button size={"large"}>{"Explore Now"}</Button>
          <Achievements>
            <Achievement>
              {"98k+"}
              <span>{"Artwork"}</span>
            </Achievement>
            <Achievement>
              {"12k+"}
              <span>{"Auction"}</span>
            </Achievement>
            <Achievement>
              {"15k+"}
              <span>{"Artist"}</span>
            </Achievement>
          </Achievements>
        </Content>
        <Cards>
          <Card
            src={"/static/images/thumbnails/1.jpg"}
            title={"Abstr Gradient NFT"}
            owner={{
              avatar: "/static/images/avatars/1.png",
              name: "Arkhan17",
            }}
            bid={0.25}
            timeLeft={"12h 43m 42s"}
          />
          <Card
            src={"/static/images/thumbnails/2.jpg"}
            title={"Abstr Gradient NFT"}
            owner={{
              avatar: "/static/images/avatars/1.png",
              name: "Arkhan17",
            }}
            bid={0.25}
            timeLeft={"12h 43m 42s"}
          />
          <Card
            src={"/static/images/thumbnails/3.jpg"}
            title={"Abstr Gradient NFT"}
            owner={{
              avatar: "/static/images/avatars/1.png",
              name: "Arkhan17",
            }}
            bid={0.25}
            timeLeft={"12h 43m 42s"}
          />
          <Icon />
        </Cards>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 64px 0 96px;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoint.laptop};
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  max-width: 60%;
  width: 100%;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.text.size.extraTitle};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.darkGrey};
  font-size: ${({ theme }) => theme.text.size.medium};
  max-width: 70%;
`;

const Achievements = styled.div`
  display: flex;
  gap: 20px;
`;

const Achievement = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.text.size.title};
  font-family: "IntegralCF Bold", sans-serif;
  span {
    font-size: ${({ theme }) => theme.text.size.normal};
    font-family: "DM Sans", sans-serif;
    color: ${({ theme }) => theme.colors.text.darkGrey};
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 40%;
  width: 40%;
  height: 440px;
  position: relative;

  & > div:nth-child(2) {
    left: 20px;
    height: 90%;
    z-index: -1;
    top: 50%;
    transform: translateY(-50%);
  }

  & > div:nth-child(3) {
    left: 40px;
    z-index: -2;
    height: 80%;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Icon = styled(LiveIcon)`
  position: absolute;
  left: 0;
  top: 45%;
  transform: translateX(-50%);
`;

export default Hero;
