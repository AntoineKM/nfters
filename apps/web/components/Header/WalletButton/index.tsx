import React from "react";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import useBreakpoint from "../../../hooks/useBreakpoint";
import { formatAdress, formatBalance } from "../../../utils/collections";
import Button from "../../Button";

const WalletButton: React.FC = () => {
  const defaultChainId = 1;
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
  });
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { connectors } = useConnect();
  const { isMobile } = useBreakpoint();

  const handleClick = () => {
    if (isConnected) {
      if (chain.id !== defaultChainId) {
        switchNetwork(defaultChainId);
      } else {
        disconnect();
      }
    } else {
      if (connectors.length === 0) {
        window.open("https://metamask.io/download", "_blank");
      } else {
        connect();
      }
    }
  };

  return (
    <Button variant={"secondary"} onClick={handleClick} size={"small"}>
      {isConnected
        ? chain.id === 1
          ? `${formatAdress(ensName ?? address)} (${
              balance
                ? `${formatBalance(parseInt(balance.formatted, 10))} ${
                    balance.symbol
                  }`
                : "-"
            })`
          : "Wrong Network"
        : isMobile
        ? "Wallet"
        : "Connect Wallet"}
    </Button>
  );
};

export default WalletButton;
