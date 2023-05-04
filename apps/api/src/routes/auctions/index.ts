import { Router } from "express";
import { create } from "ipfs-http-client";
import multer from "multer";

import Auction from "../../models/Auction";
import { host, port, protocol, apiKey, apiSecret } from "../../services/ipfs";
import Log from "../../utils/log";

const auctionsRouter = Router();
const authorization =
  "Basic " + Buffer.from(apiKey + ":" + apiSecret).toString("base64");

const ipfs = create({
  host,
  port,
  protocol,
  headers: {
    authorization,
  },
});

const categories = ["art", "gaming", "pfps", "photography"];

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(_req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(null, true);
  },
});

auctionsRouter.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const cursor = req.query.cursor ? parseInt(req.query.limit as string, 10) : 0;

  try {
    const auctions = await Auction.find({}).limit(limit).skip(cursor);

    res.send({
      auctions,
      cursor:
        (await Auction.countDocuments()) <= (cursor === 0 ? 1 : cursor) * limit
          ? undefined
          : cursor + 1,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
    Log.error(error);
  }
});

auctionsRouter.get("/categories", async (_req, res) => {
  res.send({
    categories,
  });
});

auctionsRouter.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, startingPrice = 0, endingPrice, category } = req.body;
    const file = req.file as Express.Multer.File;
    const auctionsCount = await Auction.countDocuments();
    if (auctionsCount >= 48) {
      throw new Error("You can only have 48 auctions at a time");
    }

    if (!title || !endingPrice || !category || !file) {
      throw new Error(
        "Please provide a title, ending price, category and image"
      );
    }

    if (!categories.includes(category)) {
      throw new Error(
        `Please provide a valid category, one of ${categories.join(", ")}`
      );
    }

    const ipfsFile = await ipfs.add(file.buffer);

    const samePathAuctions = await Auction.find({
      path: ipfsFile.path,
    });
    if (samePathAuctions.length > 0) {
      throw new Error("This image has already been uploaded");
    }

    const auction = await Auction.create({
      title: title.trim(),
      startingPrice: parseFloat(startingPrice),
      endingPrice: parseFloat(endingPrice),
      category: category.trim(),
      path: ipfsFile.path,
    });

    res.send({
      auction,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
    Log.error(error);
  }
});

export default auctionsRouter;
