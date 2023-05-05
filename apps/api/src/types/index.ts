export type Auction = {
  title: string;
  startingPrice: number;
  category: string;
  owner: string;
  path: string;
  endingAt: Date;
  createdAt: Date;
  bids: AuctionBid[];
};

export type AuctionBid = {
  address: string;
  amount: number;
  createdAt: Date;
};
