export const isBrowser = (): boolean => {
  return Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  );
};

export const formatBalance = (num: number) => {
  return num.toFixed(2);
};

export const formatAdress = (address: string) => {
  if (address.length < 8) return "";
  return `${address.substr(0, 4)}...${address.substr(address.length - 4, 4)}`;
};
