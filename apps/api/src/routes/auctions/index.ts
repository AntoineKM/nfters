import { Router } from "express";
import { create } from "ipfs-http-client";
import multer from "multer";

import AuctionModel from "../../models/Auction";
import AuctionBidModel from "../../models/AuctionBid";
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

const isHexAddress = (address: string) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

auctionsRouter.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const cursor = req.query.cursor ? parseInt(req.query.limit as string, 10) : 0;
  const category = req.query.category ? req.query.category : undefined;

  try {
    const auctions = await AuctionModel.find({
      ...(category && { category: category as string }),
    })
      .limit(limit)
      .skip(cursor)
      .populate("bids");

    res.send({
      auctions,
      cursor:
        (await AuctionModel.countDocuments()) <=
        (cursor === 0 ? 1 : cursor) * limit
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
    const { title, startingPrice = 0, endingAt, category, owner } = req.body;
    const file = req.file as Express.Multer.File;
    const auctionsCount = await AuctionModel.countDocuments();
    if (auctionsCount >= 48) {
      throw new Error("You can only have 48 auctions at a time");
    }

    if (!title || !endingAt || !category || !file || !owner) {
      throw new Error(
        "Please provide a title, ending date, category, image and owner"
      );
    }

    if (!categories.includes(category)) {
      throw new Error(
        `Please provide a valid category, one of ${categories.join(", ")}`
      );
    }

    if (!isHexAddress(owner)) {
      throw new Error("Please provide a valid owner address");
    }

    const ipfsFile = await ipfs.add(file.buffer);

    const samePathAuctions = await AuctionModel.find({
      path: ipfsFile.path,
    });
    if (samePathAuctions.length > 0) {
      throw new Error("This image has already been uploaded");
    }

    const auction = await AuctionModel.create({
      title: title.trim(),
      startingPrice: parseFloat(startingPrice),
      endingAt: new Date(endingAt),
      category: category.trim(),
      owner: owner.trim(),
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

auctionsRouter.get("/:id", async (req, res) => {
  try {
    const auction = await AuctionModel.findById(req.params.id).populate("bids");
    if (!auction) {
      throw new Error("Auction not found");
    }

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

auctionsRouter.get("/:id/bids", async (req, res) => {
  try {
    const auction = await AuctionModel.findById(req.params.id)
      .select("bids")
      .populate("bids");

    if (!auction) {
      throw new Error("Auction not found");
    }

    res.send({
      bids: auction.bids,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
    Log.error(error);
  }
});

auctionsRouter.post("/:id/bids/add", async (req, res) => {
  try {
    const { address, amount } = req.body;
    const auction = await AuctionModel.findById(req.params.id).populate("bids");

    if (!auction) {
      throw new Error("Auction not found");
    }

    console.log(req.body);

    if (!address || !amount) {
      throw new Error("Please provide an address and amount");
    }

    if (
      auction.bids.length > 0 &&
      (parseFloat(amount) < auction.bids[0].amount ||
        parseFloat(amount) < auction.startingPrice)
    ) {
      throw new Error(
        "The bid cannot be lower than the current highest bid or the starting price"
      );
    }

    if (!isHexAddress(address)) {
      throw new Error("Please provide a valid address");
    }

    const bid = await AuctionBidModel.create({
      address: address.trim(),
      amount: parseFloat(amount),
    });

    await AuctionModel.updateOne(
      { _id: req.params.id },
      { $push: { bids: bid } }
    );

    res.send({
      bid,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
    Log.error(error);
  }
});

export default auctionsRouter;
