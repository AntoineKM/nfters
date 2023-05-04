import { model, Schema } from "mongoose";

const auctionSchema = new Schema({
  title: { type: String, required: true },
  startingPrice: { type: Number, required: false, default: 0 },
  endingPrice: { type: Number, required: true },
  category: { type: String, required: true },
  owner: { type: String, required: false },
  path: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Auction = model("Auction", auctionSchema);

export default Auction;
