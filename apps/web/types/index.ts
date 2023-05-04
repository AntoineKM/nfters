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

export type Auction = {
  title: string;
  startingPrice: number;
  endingPrice: number;
  category: string;
  owner: string;
  path: string;
  createdAt: Date;
  _id: string;
  __v: number;
};
