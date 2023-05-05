import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import usePortal from "../../hooks/usePortal";

export type ModalProps = {
  active: boolean;
  onAnimationDone?: () => void;
  onClickOutside?: () => void;
  onEnterKeyPress?: () => void;
  children?: React.ReactNode;
};

const ModalComponent = styled(
  ({
    active,
    children,
    onClickOutside,
    onAnimationDone,
    ...props
  }: ModalProps) => {
    const portal = usePortal("modal");
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [animationState, setAnimationState] = React.useState<
      "entrance" | "exit" | null
    >(null);

    const handleDismiss = React.useCallback(
      (isClickOutside = true) => {
        if (animationState) setAnimationState("exit");
        if (isClickOutside && onClickOutside) onClickOutside();
        setTimeout(() => {
          setAnimationState(null);
          if (onAnimationDone) onAnimationDone();
        }, 210);
      },
      [animationState, onClickOutside, onAnimationDone]
    );

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        handleDismiss();
      }
    };

    React.useEffect(() => {
      if (active) {
        document.body.style.overflow = "hidden";
        setAnimationState("entrance");

        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.focus();
          }
        }, 100);
      } else {
        document.body.style.overflow = "unset";
        handleDismiss(false);
      }
    }, [active, animationState, handleDismiss, onAnimationDone]);

    if (!portal) return null;

    return createPortal(
      (active && animationState) || animationState ? (
        <div
          onClick={handleContainerClick}
          ref={containerRef}
          tabIndex={-1}
          {...props}
        >
          <ModalContent animationState={animationState}>
            <ModalOverflow>{children}</ModalOverflow>
          </ModalContent>
        </div>
      ) : null,
      portal
    );
  }
)`
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.div<{
  animationState: "entrance" | "exit";
}>`
  width: 420px;
  max-height: 85vh;
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.background.lightest};
  color: ${({ theme }) => theme.colors.text.black};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  overflow: hidden;
  overflow-y: auto;
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-name: ${({ animationState }) =>
    animationState === "entrance" ? "fadeInDown" : "fadeOutUp"};

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translate3d(0, -70%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeOutUp {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(0, -70%, 0);
    }
  }
`;

const ModalOverflow = styled.div`
  overflow: auto;
  display: block;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const ModalHeader = styled.header`
  padding: 15px 5px;
  text-align: center;
  text-transform: uppercase;
`;

const ModalTitle = styled.h3`
  font-size: ${({ theme }) => theme.text.size.large};
  font-weight: ${({ theme }) => theme.text.weight.bold};
`;

const ModalSubtitle = styled.p`
  margin-top: 5px;
  font-size: ${({ theme }) => theme.text.size.small};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ModalActions = styled.footer`
  position: sticky;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  display: flex;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  overflow: hidden;
`;

export type ModalActionProps = {
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
};

const ModalAction = styled((props: ModalActionProps) => (
  <button type={"button"} {...props} />
))<ModalActionProps>`
  color: ${({ theme }) => theme.colors.text.black};
  background-color: ${({ theme }) => theme.colors.background.lightest};
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.text.size.small};
  outline: none;
  padding: 20px 0;
  margin: 0;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.2s;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid ${({ theme }) => theme.colors.border.primary};

  ${({ theme, disabled }) =>
    disabled &&
    `
    color: ${theme.colors.text.black};
    background-color: ${theme.colors.background.lightest};
    cursor: not-allowed;
  `}

  :first-child {
    border-left: none;
    color: ${({ theme }) => theme.colors.text.grey};
  }

  :hover {
    ${({ disabled, theme }) =>
      !disabled &&
      `
      background-color: ${theme.colors.background.lighter};
      color: ${theme.colors.text.black};
    `}
  }
`;

const ModalInset = styled.div`
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  background-color: ${({ theme }) => theme.colors.background.lighter};
  margin: 0 -20px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.text.size.small};
  outline: none;
  transition: all 0.2s;
`;

const Modal = {
  Modal: ModalComponent,
  Body: ModalBody,
  Header: ModalHeader,
  Title: ModalTitle,
  Subtitle: ModalSubtitle,
  Actions: ModalActions,
  Action: ModalAction,
  Inset: ModalInset,
  Input: ModalInput,
};

export default Modal;
