import express from "express";
import { AddressInfo } from "net";

import Log from "./utils/log";

const app = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
const host: string =
  process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, host, () => {
  const { address, port } = server.address() as AddressInfo;
  Log.ready(
    `started server on ${address}:${port}, url: http://${address}:${port}`
  );
});
