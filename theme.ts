import { extendTheme } from "@chakra-ui/react";
import "@fontsource/sanchez";
import "@fontsource/albert-sans";

export const theme = extendTheme({
  fonts: {
    body: "Albert Sans, sans-serif",
    heading: "Sanchez, serif",
    mono: "Menlo, monospace",
  },
  colors: {
    offWhite: "rgba(250, 250, 250, 0.9)",
    offWhiteDarker: "rgba(245, 245, 245, 1)",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  sizes: {
    maxWidth: "1200px",
    md: "1rem",
  },
  breakpoints: {
    base: "0px",
    xs: "20em",
    sm: "30em",
    "sm-m": "35em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
    heroImageBP: "540px",
  },
});
