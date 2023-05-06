import styled from "styled-components";

import Card from "./Card";
import collections from "../../data/collections.json";

const Collection: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Title>{"Collection Featured NFTs"}</Title>
        <Cards>
          {collections.map((collection, i) => (
            <Card
              key={i}
              title={collection.title}
              owner={collection.owner}
              count={collection.count}
              thumbnails={collection.thumbnails}
            />
          ))}
        </Cards>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 32px 0 96px;
  background-color: ${({ theme }) => theme.colors.background.lighter};
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoint.laptop};
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.text.size.title};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    text-align: center;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  margin-left: -30px;
`;

export default Collection;
