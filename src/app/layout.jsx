import { Inter } from "next/font/google";
import ReduxStoreProviders from "@/providers/ReduxStoreProviders";
import Nav from "@/components/Nav";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shayan_Blog",
  description: "blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxStoreProviders>
          <Toaster />
          <Nav />
          {children}
        </ReduxStoreProviders>
      </body>
    </html>
  );
}
