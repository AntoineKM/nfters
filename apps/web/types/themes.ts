export type Theme = {
  colors: {
    text: {
      primary: string;
      black: string;
      white: string;
      green: string;
      darkGrey: string;
      grey: string;
      lightGrey: string;
    };
    background: {
      primary: string;
      secondary: string;
      lightest: string;
      lighter: string;
      light: string;
    };
    border: {
      primary: string;
    };
  };
  text: {
    size: {
      extraTitle: string;
      title: string;
      large: string;
      medium: string;
      normal: string;
      small: string;
    };
    weight: {
      thin: number;
      extraLight: number;
      light: number;
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
      extraBold: number;
      black: number;
    };
  };
  breakpoint: {
    /**
     * Desktops and laptops
     */
    desktop: string;
    /**
     * iPads (landscape)
     */
    laptop: string;
    /**
     * iPads (portrait)
     */
    tablet: string;
    /**
     * Smartphones (landscape)
     */
    mobile: string;
  };
};
