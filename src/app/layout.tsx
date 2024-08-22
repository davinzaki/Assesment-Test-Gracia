import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";

import GlobalProvider from "./components/GlobalProvider";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark">
          <GlobalProvider>{children}</GlobalProvider>
        </Theme>
      </body>
    </html>
  );
}
