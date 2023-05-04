import useModal from "../../../hooks/useModal";
import Button from "../../Button";
import Modal from "../../Modal";

const Upload: React.FC = () => {
  const [active, open, close] = useModal();
  return (
    <>
      <Button onClick={open}>{"Upload"}</Button>
      <Modal.Modal active={active} onClickOutside={close}>
        <Modal.Body>
          <Modal.Header>
            <Modal.Title>{"Upload your NFT"}</Modal.Title>
            <Modal.Subtitle>
              {"Upload your NFT to our marketplace."}
            </Modal.Subtitle>
          </Modal.Header>

          <p>{"Some content contained within the modal."}</p>
        </Modal.Body>

        <Modal.Actions>
          <Modal.Action onClick={close}>{"Cancel"}</Modal.Action>

          <Modal.Action onClick={close}>{"Submit"}</Modal.Action>
        </Modal.Actions>
      </Modal.Modal>
    </>
  );
};

export default Upload;
