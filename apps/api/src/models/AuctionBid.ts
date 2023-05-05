import { model, Schema } from "mongoose";

import { AuctionBid } from "../types";

const auctionBidSchema = new Schema({
  address: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const AuctionBidModel = model<AuctionBid>("AuctionBid", auctionBidSchema);

export default AuctionBidModel;
