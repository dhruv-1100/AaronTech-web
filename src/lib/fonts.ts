import { Chivo, Roboto_Mono } from "next/font/google";

export const chivo = Chivo({
  subsets: ["latin"],
  variable: "--font-chivo",
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
  weight: ["400", "500"],
});
