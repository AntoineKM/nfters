import { EvmChain } from "@moralisweb3/common-evm-utils";
import { Router } from "express";
import Moralis from "moralis";

const address = "0xf75140376d246d8b1e5b8a48e3f00772468b3c0c";
const chain = EvmChain.ETHEREUM;
const uwucrewRouter = Router();

uwucrewRouter.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const cursor = req.query.cursor ? (req.query.cursor as string) : undefined;

  const response = await Moralis.EvmApi.nft.getContractNFTs({
    address,
    chain,
    limit,
    cursor,
  });

  res.send(response.toJSON());
});

export default uwucrewRouter;
