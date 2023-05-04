import React from "react";
import styled from "styled-components";
import useSWR from "swr";

import Card from "./Card";
import { endpoint, fetcher } from "../../services/api";
import { Auction } from "../../types";
import Button from "../Button";

const MoreNFTs: React.FC = () => {
  const limit = 8;

  const [cursor, setCursor] = React.useState<number | null>(0);
  const { data } = useSWR(
    `${endpoint}/auctions?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`,
    fetcher
  ) as { data: { auctions: Auction[]; cursor: number | undefined } };

  const [auctions, setAuctions] = React.useState<Auction[]>([]);

  React.useEffect(() => {
    if (
      data &&
      data.auctions &&
      data.auctions.length > 0 &&
      !data.auctions.some(
        (fetchedAuction) =>
          auctions.some(
            (currentAuction) => currentAuction._id === fetchedAuction._id
          ) && auctions.length > 0
      )
    ) {
      setAuctions([...auctions, ...data.auctions]);
    }
  }, [data]);

  const handleLoadMore = React.useCallback(() => {
    if (data?.cursor) {
      setCursor(data.cursor);
    }
  }, [data]);

  console.log(data);

  return (
    <Wrapper>
      <Container>
        <Title>{"Discover more NFTs"}</Title>
        <Cards>
          {auctions &&
            auctions.length > 0 &&
            auctions.map((auction) => {
              return <Card key={auction._id} data={auction} />;
            })}
        </Cards>
        {data?.cursor && (
          <StyledButton variant={"secondary"} onClick={handleLoadMore}>
            {"More NFTs"}
          </StyledButton>
        )}
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
