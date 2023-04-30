export const isBrowser = (): boolean => {
  return Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  );
};

export const formatAdress = (address: string) => {
  if (address.length < 8) return "";
  return `${address.substr(0, 4)}...${address.substr(address.length - 4, 4)}`;
};

export const reduceString = (str: string, length: number, dots = true) => {
  if (str.length > length) {
    return str.substring(0, length - (dots ? 3 : 0)) + (dots ? "..." : "");
  }
  return str;
};
