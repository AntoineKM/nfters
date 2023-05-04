import { model, Schema } from "mongoose";

import Auction from "./Auction";

const auctionBidSchema = new Schema({
  address: { type: String, required: true },
  amount: { type: Number, required: true },
  auction: { type: Schema.Types.ObjectId, ref: Auction, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const AuctionBid = model("AuctionBid", auctionBidSchema);

export default AuctionBid;
