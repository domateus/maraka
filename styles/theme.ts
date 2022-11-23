export type MarakaTheme = {
  colors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    quaternary?: string;
    quinary?: string;
    senary?: string;
    septenary?: string;
    octonary?: string;
    nonary?: string;
    denary?: string;
    myMessage?: string;
    theirMessage?: string;
    myMessageColor?: string;
    theirMessageColor?: string;
  };
  fonts?: {
    primary?: string;
    secondary?: string;
  };
  fontSizes?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  fontWeights?: {
    light?: number;
    regular?: number;
    bold?: number;
  };
  lineHeights?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  letterSpacings?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  space?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  sizes?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  radii?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  shadows?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  zIndices?: {
    small?: number;
    medium?: number;
    large?: number;
  };
};

export const darkTheme: MarakaTheme = {
  colors: {
    primary: "#000000",
    secondary: "#FFFFFF",
    tertiary: "#F5F5F5",
    quaternary: "#E0E0E0",
    quinary: "#BDBDBD",
    senary: "#9E9E9E",
    septenary: "#757575",
    octonary: "#616161",
    nonary: "#424242",
    denary: "#212121",
    myMessage: "#248bf5",
    theirMessage: "#e5e5ea",
    myMessageColor: "#E0E0E0",
    theirMessageColor: "#424242",
  },
  fonts: {
    primary: "Roboto, sans-serif",
    secondary: "Roboto Mono, monospace",
  },
  fontSizes: {
    small: "0.75rem",
    medium: "1rem",
    large: "1.25rem",
  },
  fontWeights: {
    light: 300,
    regular: 400,
    bold: 700,
  },
  lineHeights: {
    small: "1rem",
    medium: "1.5rem",
    large: "2rem",
  },
  letterSpacings: {
    small: "0.05rem",
    medium: "0.1rem",
    large: "0.15rem",
  },
  space: {
    small: "0.5rem",
    medium: "1rem",
    large: "1.5rem",
  },
  sizes: {
    small: "1rem",
    medium: "2rem",
    large: "3rem",
  },
  radii: {
    small: "0.25rem",
    medium: "0.5rem",
    large: "0.75rem",
  },
  shadows: {
    small: "0 0 0.5rem rgba(0, 0, 0, 0.25)",
    medium: "0 0 1rem rgba(0, 0, 0, 0.25)",
    large: "0 0 1.5rem rgba(0, 0, 0, 0.25)",
  },
  zIndices: {
    small: 1,
    medium: 2,
    large: 3,
  },
};

export const lightTheme: MarakaTheme = {
  colors: {
    primary: "#FFFFFF",
    secondary: "#000000",
    tertiary: "#212121",
    quaternary: "#424242",
    quinary: "#616161",
    senary: "#757575",
    septenary: "#9E9E9E",
    octonary: "#BDBDBD",
    nonary: "#E0E0E0",
    denary: "#F5F5F5",
    myMessage: "#248bf5",
    theirMessage: "#e5e5ea",
    myMessageColor: "#E0E0E0",
    theirMessageColor: "#424242",
  },
  fonts: {
    primary: "Roboto, sans-serif",
    secondary: "Roboto Mono, monospace",
  },
  fontSizes: {
    small: "0.75rem",
    medium: "1rem",
    large: "1.25rem",
  },
  fontWeights: {
    light: 300,
    regular: 400,
    bold: 700,
  },
  lineHeights: {
    small: "1rem",
    medium: "1.5rem",
    large: "2rem",
  },
  letterSpacings: {
    small: "0.05rem",
    medium: "0.1rem",
    large: "0.15rem",
  },
  space: {
    small: "0.5rem",
    medium: "1rem",
    large: "1.5rem",
  },
  sizes: {
    small: "1rem",
    medium: "2rem",
    large: "3rem",
  },
  radii: {
    small: "0.25rem",
    medium: "0.5rem",
    large: "0.75rem",
  },
  shadows: {
    small: "0 0 0.5rem rgba(0, 0, 0, 0.25)",
    medium: "0 0 1rem rgba(0, 0, 0, 0.25)",
    large: "0 0 1.5rem rgba(0, 0, 0, 0.25)",
  },
  zIndices: {
    small: 1,
    medium: 2,
    large: 3,
  },
};
