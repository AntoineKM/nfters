import dayjs from "dayjs";
import styled from "styled-components";

import EthereumIcon from "../../Icons/Ethereum";

export type CardProps = {
  name: string;
  thumbnail: string;
  bid: number;
  timeLeft: Date;
};

const Card: React.FC<CardProps> = ({
  name,
  thumbnail,
  bid,
  timeLeft,
}: CardProps) => {
  return (
    <Container>
      <Thumbnail src={thumbnail} />
      <Name>{name}</Name>
      <Bid>
        <StyledEthereumIcon green /> {`${bid} ETH`}
      </Bid>
      <Separator />
      <Footer>
        <Time>{`${dayjs(timeLeft).format("hh")}h ${dayjs(timeLeft).format(
          "mm"
        )}m left`}</Time>
        <PlaceBid>{"Place a bid"}</PlaceBid>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  width: calc(25% - 16px);
  margin-left: 16px;
  margin-top: 32px;
  background-color: ${({ theme }) => theme.colors.background.lightest};
  padding: 16px;
  border-radius: 12px;
`;

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 12px;
  height: 200px;
  object-fit: cover;
`;

const Name = styled.h4`
  margin-top: 16px;
  font-size: ${({ theme }) => theme.text.size.medium};
  font-weight: ${({ theme }) => theme.text.weight.bold};
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.primary};
  margin: 16px 0;
`;

const Bid = styled.span`
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: ${({ theme }) => theme.text.size.small};
  font-weight: ${({ theme }) => theme.text.weight.bold};
  color: ${({ theme }) => theme.colors.text.green};
`;

const StyledEthereumIcon = styled(EthereumIcon)`
  width: 16px;
  height: 16px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Time = styled.span`
  font-size: ${({ theme }) => theme.text.size.small};
  font-weight: ${({ theme }) => theme.text.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.lighter};
`;

const PlaceBid = styled.span`
  font-size: ${({ theme }) => theme.text.size.small};
  font-weight: ${({ theme }) => theme.text.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
`;

export default Card;
