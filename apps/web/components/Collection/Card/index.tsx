import Image from "next/image";
import styled from "styled-components";

import Button from "../../Button";

export type CardProps = {
  title: string;
  owner: {
    name: string;
    avatar: string;
  };
  count: number;
  thumbnails: string[];
};

const Card: React.FC<CardProps> = ({
  title,
  owner,
  count,
  thumbnails,
}: CardProps) => {
  return (
    <Container>
      <ThumbnailContainer>
        {thumbnails[0] && (
          <Thumbnail
            alt={`${title} featured nft`}
            featured
            src={thumbnails[0]}
          />
        )}
        <ThumbnailWrapperInner>
          {thumbnails[1] && (
            <Thumbnail alt={`${title} nft`} src={thumbnails[1]} />
          )}
          {thumbnails[2] && (
            <Thumbnail alt={`${title} nft`} src={thumbnails[2]} />
          )}
          {thumbnails[3] && (
            <Thumbnail alt={`${title} nft`} src={thumbnails[3]} />
          )}
        </ThumbnailWrapperInner>
      </ThumbnailContainer>
      <Content>
        <Title>{title}</Title>
        <Row>
          <Owner>
            <OwnerAvatar alt={owner.name} src={owner.avatar} />
            <OwnerName>{`by ${owner.name}`}</OwnerName>
          </Owner>
          <Button size={"small"} variant={"secondary"}>{`Total ${count} Item${
            count > 1 ? "s" : ""
          }`}</Button>
        </Row>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: calc(33.3% - 30px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 30px;
  margin-top: 16px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  height: 275px;
  gap: 10px;
`;

const Thumbnail = styled.img<{ featured?: boolean }>`
  width: ${({ featured }) => (featured ? "70%" : "100%")};
  height: ${({ featured }) => (featured ? "100%;" : "33.3%")};
  border-radius: ${({ featured }) => (featured ? "24px" : "16px")};
  object-fit: cover;
`;

const ThumbnailWrapperInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 30%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.text.size.medium};
  font-weight: ${({ theme }) => theme.text.weight.bold};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Owner = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const OwnerAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

const OwnerName = styled.p`
  font-size: ${({ theme }) => theme.text.size.small};
  font-weight: ${({ theme }) => theme.text.weight.medium};
`;

export default Card;
