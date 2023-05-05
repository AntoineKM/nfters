export type NFT = { metadata: string; token_id: string; token_address: string };

export type NFTMetadata = {
  name: string;
  image: string;
  description: string;
  attributes: NFTMetadataAttribute[];
};

export type NFTMetadataAttribute = {
  trait_type: string;
  value: string;
};

export type Document = {
  _id: string;
  __v: number;
};

export type Auction = {
  title: string;
  startingPrice: number;
  category: string;
  owner: string;
  path: string;
  endingAt: Date;
  createdAt: Date;
  bids: AuctionBid[];
} & Document;

export type AuctionBid = {
  address: string;
  amount: number;
  createdAt: Date;
} & Document;
