import React from "react";
import styled from "styled-components";
import useSWR from "swr";

import Card from "./Card";
import { endpoint, fetcher } from "../../services/api";
import { Auction } from "../../types";
import Button from "../Button";

const MoreNFTs: React.FC = () => {
  const limit = 8;

  const [cursor, setCursor] = React.useState<number>(0);
  const [currentCategory, setCurrentCategory] = React.useState<string>("all");

  const { data, mutate } = useSWR(
    `${endpoint}/auctions?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}${
      currentCategory !== "all" ? `&category=${currentCategory}` : ""
    }`,
    fetcher
  ) as {
    data: { auctions: Auction[]; cursor: number | undefined };
    mutate: () => void;
  };

  const { data: auctionsCategories } = useSWR(
    `${endpoint}/auctions/categories`,
    fetcher
  ) as { data: { categories: string[] } };

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

  const handleCategoryChange = React.useCallback((c: string) => {
    setCurrentCategory(c);
    setCursor(0);
    setAuctions([]);
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>{"Discover more NFTs"}</Title>
        <Categories>
          {auctionsCategories &&
            auctionsCategories.categories &&
            auctionsCategories.categories.length > 0 &&
            ["all", ...auctionsCategories.categories].map((category) => {
              return (
                <Category
                  key={category}
                  active={currentCategory === category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Category>
              );
            })}
        </Categories>
        <Cards>
          {auctions &&
            auctions.length > 0 &&
            auctions.map((auction) => {
              return <Card key={auction._id} data={auction} mutate={mutate} />;
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

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    text-align: center;
  }
`;

const Categories = styled.div`
  display: flex;
  width: 100%;
  margin-top: 16px;
  flex-wrap: wrap;
  gap: 8px;
`;

const Category = styled.div<{
  active?: boolean;
}>`
  font-weight: ${({ theme }) => theme.text.weight.bold};
  color: ${({ theme, active }) =>
    active ? theme.colors.text.white : theme.colors.text.darkGrey};
  background-color: ${({ theme, active }) =>
    active ? theme.colors.background.primary : "transparent"};
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  text-transform: capitalize;
  font-weight: ${({ theme }) => theme.text.weight.bold};
  transition: all 0.2s ease-in-out;
  user-select: none;

  :hover {
    background-color: ${({ active }) => !active && "rgba(0, 0, 0, 0.1)"};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    background-color: ${({ active }) => !active && "rgba(0, 0, 0, 0.05)"};
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

export default MoreNFTs;
