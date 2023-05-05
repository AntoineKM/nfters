import { WsProvider, ApiPromise } from "@polkadot/api";
import React from "react";
import { useLocalStorage } from "usehooks-ts";

import { endpoint } from "../../../services/polkadot";
import { formatAdress, formatBalance } from "../../../utils/collections";
import Button from "../../Button";

export type PolkadotAccount = {
  address: string;
  balance: string;
};

const PolkadotButton: React.FC = () => {
  const [account, setAccount] = useLocalStorage<PolkadotAccount | null>(
    "polkadot_account",
    null
  );

  const disconnect = () => {
    setAccount(null);
  };

  const connect = async () => {
    const provider = new WsProvider(endpoint);
    const api = await ApiPromise.create({ provider });
    const { web3Accounts, web3Enable } = await import(
      "@polkadot/extension-dapp"
    );
    const extensions = await web3Enable("nfters");
    if (extensions.length === 0) {
      window.open("https://polkadot.js.org/extension/", "_blank");
      return;
    }

    const allAccounts = await web3Accounts();
    await api.query.system.account(
      allAccounts[0].address,
      (balance: { data: { free: { toHuman: () => string } } }) => {
        setAccount({
          address: allAccounts[0].address,
          balance: balance.data.free.toHuman(),
        });
      }
    );
  };

  const handleClick = () => {
    if (account) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <Button variant={"secondary"} onClick={handleClick} size={"small"}>
      {account
        ? `${formatAdress(account.address)} (${formatBalance(
            parseFloat(account.balance)
          )} DOT)`
        : "Connect Polkadot"}
    </Button>
  );
};

export default PolkadotButton;
