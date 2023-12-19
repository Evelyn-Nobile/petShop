import { Inter, Jomhuria } from "next/font/google";
import favicon from "../public/favicon.ico";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const jomhuria = Jomhuria({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favicon.src} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
