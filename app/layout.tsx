import { FC, PropsWithChildren } from "react";
import "./globals.scss";
import styles from "./layout.module.scss";
import Sidebar from "@/components/sidebar/Sidebar";
import Providers from "@/components/Providers";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <div className={styles.layout}>
            <Sidebar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
