import { WalkthroughItem } from "../types";

const walkthroughData: WalkthroughItem[] = [
  {
    title: "Property",
    subtitle: "Diversity",
    image: require("../assets/diversity.png"),
  },
  {
    title: "Safe",
    subtitle: "Security",
    image: require("../assets/security.png"),
  },
  {
    title: "Convenient",
    subtitle: "Transaction",
    image: require("../assets/convenient.png"),
    inverted: true,
  },
];

export default walkthroughData;
