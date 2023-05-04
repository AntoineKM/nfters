import cors from "cors";
import dotenv from "dotenv-flow";
import express from "express";
import mongoose from "mongoose";
import Moralis from "moralis";
import { AddressInfo } from "net";

import auctionsRouter from "./routes/auctions";
import uwucrewRouter from "./routes/uwucrew";
import { databaseUri } from "./services/mongodb";
import Log from "./utils/log";

dotenv.config({
  silent: true,
});

const main = async () => {
  Log.wait("loading env files");
  dotenv
    .listDotenvFiles(".", {
      node_env: process.env.NODE_ENV,
    })
    .forEach((file: string) => Log.info(`loaded env from ${file}`));

  const app = express();
  const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
  const host: string =
    process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";

  app.use(cors());
  app.use(express.json());
  app.get("/", (_req, res) => {
    res.send({
      health: "ok",
    });
  });

  app.use("/uwucrew", uwucrewRouter);
  app.use("/auctions", auctionsRouter);

  Log.wait("connecting to mongodb...");
  try {
    await mongoose.connect(databaseUri);
    Log.event("connected to mongodb");
  } catch (error) {
    Log.error("failed to connect to mongodb", error);
    process.exit(1);
  }

  Log.wait("starting moralis...");
  try {
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    });

    Log.event("started moralis");
  } catch (error) {
    Log.error("failed to start moralis", error);
    process.exit(1);
  }

  const server = app.listen(port, host, () => {
    const { address, port } = server.address() as AddressInfo;
    Log.ready(
      `started server on ${address}:${port}, url: http://${address}:${port}`
    );
  });
};

main();
