import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ThemeContextProvider from "@/context/theme-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vidhan Solanki | Portfolio",
  description:
    "Full-stack developer building web applications. Portfolio of Vidhan Solanki.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeContextProvider>
          <Toaster position="top-right" />
          <Navbar />
          {children}
          <Footer />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
