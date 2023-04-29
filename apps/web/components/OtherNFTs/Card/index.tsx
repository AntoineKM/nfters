import styled from "styled-components";

export type CardProps = {
  name: string;
  thumbnail: string;
};

const Card: React.FC<CardProps> = ({ name, thumbnail }: CardProps) => {
  return (
    <Container>
      <Thumbnail src={thumbnail} />
      <Name>{name}</Name>
      <Separator />
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
  margin: 32px 0;
`;

export default Card;
