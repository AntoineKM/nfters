import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import useSWR from "swr";
import { useAccount, useNetwork } from "wagmi";

import useModal from "../../../hooks/useModal";
import { endpoint, fetcher } from "../../../services/api";
import { formatAdress } from "../../../utils/collections";
import Button from "../../Button";
import Modal from "../../Modal";

type Inputs = {
  title: string;
  startingPrice?: number;
  endingAt: string;
  category: string;
  image: FileList;
};

const Upload: React.FC = () => {
  const [active, open, close] = useModal();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const { data } = useSWR(`${endpoint}/auctions/categories`, fetcher) as {
    data: { categories: string[] };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!isConnected || chain.id !== 1) return;
    console.log("form data", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("startingPrice", data.startingPrice?.toString() || "0");
    formData.append("endingAt", data.endingAt);
    formData.append("category", data.category);
    formData.append("image", data.image[0]);
    formData.append("owner", address);

    const res = await fetch(`${endpoint}/auctions/add`, {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    console.log("json", json);

    close();
  };

  return (
    <>
      <Button onClick={open} size={"small"}>
        {"Upload"}
      </Button>
      <Modal.Modal active={active} onClickOutside={close}>
        <Modal.Body>
          <Modal.Header>
            <Modal.Title>{"Upload your NFT"}</Modal.Title>
            <Modal.Subtitle>
              {"Upload your NFT to our marketplace."}
            </Modal.Subtitle>
          </Modal.Header>

          <Modal.Inset>
            <Address>{`Your address: ${
              address ? formatAdress(address) : "-"
            }`}</Address>
            <Group>
              <Label>{"Title*"}</Label>
              <Modal.Input
                placeholder={"Title"}
                {...register("title", { required: true })}
              />
              {errors.title && <span>{"This field is required"}</span>}
            </Group>
            <Group>
              <Label>{"Starting price (ETH)"}</Label>
              <Modal.Input
                placeholder={"0.00"}
                {...register("startingPrice")}
                type={"number"}
                min={0}
              />
              {errors.startingPrice && <span>{"This field is required"}</span>}
            </Group>
            <Group>
              <Label>{"Ending date"}</Label>
              <Modal.Input
                placeholder={"DD/MM/YYYY"}
                type={"date"}
                {...register("endingAt", { required: true })}
              />
              {errors.endingAt && <span>{"This field is required"}</span>}
            </Group>
            <Group>
              <Label>{"Category"}</Label>
              <Modal.Input
                as={"select"}
                defaultValue={"art"}
                {...register("category", { required: true })}
              >
                {data?.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Modal.Input>
              {errors.category && <span>{"This field is required"}</span>}
            </Group>

            <Group>
              <Label>{"Image"}</Label>
              <Modal.Input
                type={"file"}
                {...register("image", { required: true })}
              />
              {errors.image && <span>{"This field is required"}</span>}
            </Group>
          </Modal.Inset>
        </Modal.Body>

        <Modal.Actions>
          <Modal.Action onClick={close}>{"Cancel"}</Modal.Action>

          <Modal.Action
            disabled={!isConnected || chain.id !== 1}
            onClick={() => handleSubmit(onSubmit)()}
          >
            {"Submit"}
          </Modal.Action>
        </Modal.Actions>
      </Modal.Modal>
    </>
  );
};

const Address = styled.p`
  font-size: ${({ theme }) => theme.text.size.small};
  font-weight: ${({ theme }) => theme.text.weight.bold};
  width: 100%;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: ${({ theme }) => theme.text.size.small};
  font-weight: ${({ theme }) => theme.text.weight.bold};
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;

export default Upload;
