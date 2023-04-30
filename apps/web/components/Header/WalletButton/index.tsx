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

import { formatAdress, reduceString } from "../../../utils/layout";
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

  const handleClick = () => {
    if (isConnected) {
      if (chain.id !== defaultChainId) {
        switchNetwork(defaultChainId);
      } else {
        disconnect();
      }
    } else {
      connect();
    }
  };

  return (
    <Button variant={"secondary"} onClick={handleClick}>
      {isConnected
        ? chain.id === 1
          ? `${formatAdress(ensName ?? address)} (${
              balance
                ? `${reduceString(balance.formatted, 4, false)} ${
                    balance.symbol
                  }`
                : "-"
            })`
          : "Wrong Network"
        : "Connect Wallet"}
    </Button>
  );
};

export default WalletButton;
