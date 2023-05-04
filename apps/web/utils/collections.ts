export const formatBalance = (num: number) => {
  return num.toFixed(2);
};

export const formatAdress = (address: string) => {
  if (address.length < 8) return "";
  return `${address.substr(0, 4)}...${address.substr(address.length - 4, 4)}`;
};

export const convertIPFStoHTTP = (ipfs: string) => {
  const imagePath = ipfs.split("://")[1];
  const url = `https://ipfs.io/ipfs/${imagePath}`;
  return url;
};

export const convertIPFSPathtoHTTP = (path: string) => {
  const url = `https://ipfs.io/ipfs/${path}`;
  return url;
};

export const getOpenSeaAssetUrl = (address: string, tokenId: string) => {
  return `https://opensea.io/assets/${address}/${tokenId}`;
};

export const getId = () => {
  return Math.random().toString(32).slice(2, 10);
};
