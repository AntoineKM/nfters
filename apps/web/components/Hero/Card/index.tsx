import styled from "styled-components";

import EthereumIcon from "../../Icons/Ethereum";

export type CardProps = {
  src: string;
  title: string;
  owner: {
    name: string;
    avatar: string;
  };
  bid: number;
  timeLeft: string;
};

const Card: React.FC<CardProps> = ({
  src,
  title,
  owner,
  bid,
  timeLeft,
}: CardProps) => {
  return (
    <Container src={src}>
      <Header>
        <Title>{title}</Title>
        <Owner>
          <OwnerAvatar src={owner.avatar} />
          <OwnerName>{owner.name}</OwnerName>
        </Owner>
      </Header>
      <Content>
        <Row>
          <RowLabel>{"Current Bid"}</RowLabel>
          <RowValue>
            <EthereumIcon /> {`${bid} ETH`}
          </RowValue>
        </Row>
        <Row>
          <RowLabel>{"Ends in"}</RowLabel>
          <RowValue>{timeLeft}</RowValue>
        </Row>
      </Content>
    </Container>
  );
};

const Container = styled.div<{ src: string }>`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 400px;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  background: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  color: ${({ theme }) => theme.colors.text.white};
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.text.size.title};
  font-weight: ${({ theme }) => theme.text.weight.bold};
`;

const Owner = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const OwnerAvatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const OwnerName = styled.span`
  font-size: ${({ theme }) => theme.text.size.medium};
  font-weight: ${({ theme }) => theme.text.weight.bold};
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(25px);
  border-radius: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const RowLabel = styled.span`
  font-size: ${({ theme }) => theme.text.size.tiny};
  font-weight: ${({ theme }) => theme.text.weight.medium};
`;

const RowValue = styled.span`
  font-size: ${({ theme }) => theme.text.size.normal};
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-weight: ${({ theme }) => theme.text.weight.bold};
`;

export default Card;
