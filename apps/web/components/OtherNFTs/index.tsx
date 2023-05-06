import React from "react";
import styled from "styled-components";
import useSWR from "swr";

import Card from "./Card";
import { endpoint, fetcher } from "../../services/api";
import { NFT } from "../../types";
import Button from "../Button";

const OtherNFTs: React.FC = () => {
  const limit = 8;

  const [cursor, setCursor] = React.useState<string | null>(null);
  const { data } = useSWR(
    `${endpoint}/uwucrew?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`,
    fetcher
  ) as { data: { result: NFT[]; cursor: string } };

  const [arts, setArts] = React.useState<NFT[]>([]);

  React.useEffect(() => {
    if (
      data &&
      data.result &&
      data.result.length > 0 &&
      !data.result.some(
        (nft) =>
          arts.some((art) => art.token_id === nft.token_id) && arts.length > 0
      )
    ) {
      setArts([...arts, ...data.result]);
    }
  }, [data]);

  const handleLoadMore = React.useCallback(() => {
    if (data?.cursor) {
      setCursor(data.cursor);
    }
  }, [data]);

  return (
    <Wrapper>
      <Container>
        <Title>{"Discover other NFTs"}</Title>
        <Cards>
          {arts &&
            arts.length > 0 &&
            arts.map((nft) => {
              return <Card key={nft.token_id} data={nft} />;
            })}
        </Cards>
        <StyledButton variant={"secondary"} onClick={handleLoadMore}>
          {"More NFTs"}
        </StyledButton>
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

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    text-align: center;
  }
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

export default OtherNFTs;
