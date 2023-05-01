import styled from "styled-components";

import { getOpenSeaAssetUrl } from "../../../utils/collections";

export type CardProps = {
  id: string;
  name: string;
  thumbnail: string;
  address: string;
};

const Card: React.FC<CardProps> = ({
  name,
  thumbnail,
  address,
  id,
}: CardProps) => {
  return (
    <Container
      onClick={() => window.open(getOpenSeaAssetUrl(address, id), "_blank")}
    >
      <Thumbnail src={thumbnail} alt={name} />
      <Name>{name}</Name>
      <Separator />
    </Container>
  );
};

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 12px;
  height: 200px;
  object-fit: cover;
`;

const Container = styled.div`
  width: calc(25% - 16px);
  margin-left: 16px;
  margin-top: 32px;
  background-color: ${({ theme }) => theme.colors.background.lightest};
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :hover {
    box-shadow: 3px 5px 4px 2px #e5e5e5;
    transform: scale(1.01);
  }
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
  margin: 32px 0;
`;

export default Card;
