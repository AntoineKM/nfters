import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useAccount, useNetwork } from "wagmi";

import useModal from "../../../hooks/useModal";
import { endpoint } from "../../../services/api";
import { Auction } from "../../../types";
import {
  convertIPFSPathtoHTTP,
  formatAdress,
} from "../../../utils/collections";
import EthereumIcon from "../../Icons/Ethereum";
import Modal from "../../Modal";

export type CardProps = {
  data: Auction;
};

type Inputs = {
  amount: number;
};

const Card: React.FC<CardProps> = ({ data }: CardProps) => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [active, open, close] = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (bid) => {
    console.log(errors);
    if (!isConnected || chain.id !== 1) return;

    const res = await fetch(`${endpoint}/auctions/${data._id}/bids/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: bid.amount.toString(),
        address: address.toString(),
      }),
    });

    const json = await res.json();
    console.log(json);

    close();
  };

  return (
    <>
      <Container onClick={open}>
        <Thumbnail src={convertIPFSPathtoHTTP(data.path)} />
        <Name>{data.title}</Name>
        <Bid>
          <StyledEthereumIcon green />{" "}
          {`${
            data.bids.length > 0
              ? data.bids.sort((a, b) => b.amount - a.amount)[0].amount
              : data.startingPrice
          } ETH`}
        </Bid>
        <Separator />
        <Footer>
          <Time>{`${dayjs(data.endingAt).format("DD")}d ${dayjs(
            data.endingAt
          ).format("hh")}h ${dayjs(data.endingAt).format("mm")}m left`}</Time>
          <PlaceBid>{"Place a bid"}</PlaceBid>
        </Footer>
      </Container>
      <Modal.Modal active={active} onClickOutside={close}>
        <Modal.Body>
          <Thumbnail
            src={convertIPFSPathtoHTTP(data.path)}
            alt={data.title}
            large
          />
          <Modal.Header>
            <Modal.Title>{data.title}</Modal.Title>
          </Modal.Header>

          <Modal.Inset>
            <ModalListItem>
              <ModalListItemTitle>{"Current owner"}</ModalListItemTitle>
              <ModalListItemValue>
                {formatAdress(data.owner)}
              </ModalListItemValue>
            </ModalListItem>
            <ModalListItem>
              <ModalListItemTitle>{"Starting price"}</ModalListItemTitle>
              <ModalListItemValue>
                {`${data.startingPrice} ETH`}
              </ModalListItemValue>
            </ModalListItem>
            <ModalListItem>
              <ModalListItemTitle>{"Category"}</ModalListItemTitle>
              <ModalListItemValue>{data.category}</ModalListItemValue>
            </ModalListItem>
            <ModalListItem>
              <ModalListItemTitle>{"Duration"}</ModalListItemTitle>
              <ModalListItemValue>{`${dayjs(data.endingAt).format(
                "DD"
              )}d ${dayjs(data.endingAt).format("hh")}h ${dayjs(
                data.endingAt
              ).format("mm")}m left`}</ModalListItemValue>
            </ModalListItem>
          </Modal.Inset>
          <Modal.Inset>
            <ModalList>
              {data.bids.length > 0 ? (
                data.bids.map(
                  (bid) =>
                    bid.amount > 0 && (
                      <ModalListItem key={bid._id}>
                        <ModalListItemTitle>
                          {formatAdress(bid.address)}
                        </ModalListItemTitle>
                        <ModalListItemValue>
                          {`${bid.amount} ETH`}
                        </ModalListItemValue>
                      </ModalListItem>
                    )
                )
              ) : (
                <ModalListItem>
                  <ModalListItemTitle>{"Starting Bid"}</ModalListItemTitle>
                  <ModalListItemValue>
                    {`${data.startingPrice} ETH`}
                  </ModalListItemValue>
                </ModalListItem>
              )}
            </ModalList>
          </Modal.Inset>
          <Modal.Inset>
            <Modal.Input
              placeholder={"Enter your bid"}
              type={"number"}
              min={
                data.bids.length > 0
                  ? data.bids.sort((a, b) => b.amount - a.amount)[0].amount
                  : data.startingPrice
              }
              step={0.01}
              {...register("amount", { required: true })}
            />
            {errors.amount && <span>{"This field is required"}</span>}
          </Modal.Inset>
        </Modal.Body>

        <Modal.Actions>
          <Modal.Action onClick={close}>{"Cancel"}</Modal.Action>

          <Modal.Action
            disabled={!isConnected || chain.id !== 1}
            onClick={() => handleSubmit(onSubmit)()}
          >
            {"Place a bid"}
          </Modal.Action>
        </Modal.Actions>
      </Modal.Modal>
    </>
  );
};

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

const Thumbnail = styled.img<{
  large?: boolean;
}>`
  width: 100%;
  border-radius: 12px;
  height: ${({ large }) => (large ? "auto" : "200px")};
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
