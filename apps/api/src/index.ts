import cors from "cors";
import dotenv from "dotenv-flow";
import express from "express";
import Moralis from "moralis";
import { AddressInfo } from "net";

import uwucrewRouter from "./routes/uwucrew";
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
  app.get("/", (_req, res) => {
    res.send({
      health: "ok",
    });
  });

  app.use("/uwucrew", uwucrewRouter);

  Log.wait("starting moralis");
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
