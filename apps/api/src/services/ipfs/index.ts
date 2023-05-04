import dotenv from "dotenv-flow";
dotenv.config({
  silent: true,
});

export const host = process.env.IPFS_API_HOST || "ipfs.infura.io";

export const port = process.env.IPFS_API_PORT
  ? parseInt(process.env.IPFS_API_PORT, 10)
  : 5001;

export const protocol = process.env.IPFS_API_PROTOCOL || "https";

export const apiKey = process.env.IPFS_API_KEY || "";

export const apiSecret = process.env.IPFS_API_SECRET || "";
