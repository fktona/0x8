import localFont from "next/font/local";

const aktive = localFont({
  src: "./aktiv-reg.ttf",
  variable: "--font-aktiv",
});

const aktiveBold = localFont({
  src: "./aktiv-bold.woff",
  variable: "--font-aktiv-bold",
});
const aktiveMedium = localFont({
  src: "./aktiv-medium.woff",
  variable: "--font-aktiv-medium",
});

const aktivThin = localFont({
  src: "./aktiv-thin.woff",
  variable: "--font-aktiv-thin",
});

export { aktive, aktiveBold, aktiveMedium, aktivThin };
