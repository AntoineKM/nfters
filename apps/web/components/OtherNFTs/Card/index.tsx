import styled from "styled-components";

import useModal from "../../../hooks/useModal";
import { NFT, NFTMetadata } from "../../../types";
import {
  convertIPFStoHTTP,
  getOpenSeaAssetUrl,
} from "../../../utils/collections";
import Modal from "../../Modal";

export type CardProps = {
  data: NFT;
};

const Card: React.FC<CardProps> = ({ data }: CardProps) => {
  const metadata: NFTMetadata = JSON.parse(data.metadata);
  const [active, open, close] = useModal();

  return (
    <>
      <Container onClick={open}>
        <Thumbnail
          src={convertIPFStoHTTP(metadata.image)}
          alt={metadata.name}
        />
        <Name>{metadata.name}</Name>
        <Separator />
      </Container>
      <Modal.Modal active={active} onClickOutside={close}>
        <Modal.Body>
          <Thumbnail
            src={convertIPFStoHTTP(metadata.image)}
            alt={metadata.name}
            large
          />
          <Modal.Header>
            <Modal.Title>{metadata.name}</Modal.Title>
          </Modal.Header>

          <ModalList>
            {metadata.attributes
              .sort((a, b) => a.trait_type.localeCompare(b.trait_type))
              .map((attribute) => {
                return (
                  <ModalListItem key={attribute.trait_type}>
                    <ModalListItemTitle>
                      {attribute.trait_type}
                    </ModalListItemTitle>
                    <ModalListItemValue>{attribute.value}</ModalListItemValue>
                  </ModalListItem>
                );
              })}
          </ModalList>
        </Modal.Body>

        <Modal.Actions>
          <Modal.Action onClick={close}>{"Cancel"}</Modal.Action>

          <Modal.Action
            onClick={() => {
              window.open(
                getOpenSeaAssetUrl(data.token_address, data.token_id),
                "_blank"
              );
            }}
          >
            {"View on OpenSea"}
          </Modal.Action>
        </Modal.Actions>
      </Modal.Modal>
    </>
  );
};

const Thumbnail = styled.img<{
  large?: boolean;
}>`
  width: 100%;
  border-radius: 12px;
  height: ${({ large }) => (large ? "auto" : "200px")};
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

const ModalList = styled.ul`
  list-style: inside;
`;

const ModalListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ModalListItemTitle = styled.span`
  font-size: ${({ theme }) => theme.text.size.small};
  font-weight: ${({ theme }) => theme.text.weight.bold};
`;

const ModalListItemValue = styled.span`
  font-size: ${({ theme }) => theme.text.size.small};
  font-weight: ${({ theme }) => theme.text.weight.regular};
`;

export default Card;
