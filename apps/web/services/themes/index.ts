import { Theme } from "../../types/themes";

export const lightTheme: Theme = {
  colors: {
    text: {
      primary: "rgb(61, 0, 183)",
      black: "rgb(0, 0, 0)",
      white: "rgb(255, 255, 255)",
      green: "rgb(0, 172, 79)",
      darkGrey: "rgb(86, 86, 86)",
      grey: "rgb(117, 117, 117)",
      lightGrey: "rgb(192, 192, 192)",
    },
    background: {
      primary: "rgb(61, 0, 183)",
      secondary: "#F0F0F0",
      lightest: "rgb(255, 255, 255)",
      lighter: "#F0F0F0",
      light: "#D3D3D3",
    },
    border: {
      primary: "rgb(239, 239, 239)",
    },
  },
  text: {
    size: {
      extraTitle: "40px",
      title: "28px",
      large: "24px",
      medium: "20px",
      normal: "16px",
      small: "12px",
    },
    weight: {
      thin: 100,
      extraLight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
  },
  breakpoint: {
    desktop: "1824px",
    laptop: "1224px",
    tablet: "1024px",
    mobile: "768px",
  },
};
