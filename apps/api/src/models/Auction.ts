import { model, Schema } from "mongoose";

import AuctionBidModel from "./AuctionBid";
import { Auction } from "../types";

const auctionSchema = new Schema({
  title: { type: String, required: true },
  startingPrice: { type: Number, required: false, default: 0 },
  category: { type: String, required: true },
  owner: { type: String, required: true },
  path: { type: String, required: true },
  endingAt: { type: Date, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  bids: [{ type: Schema.Types.ObjectId, ref: AuctionBidModel }],
});

const AuctionModel = model<Auction>("Auction", auctionSchema);

export default AuctionModel;
