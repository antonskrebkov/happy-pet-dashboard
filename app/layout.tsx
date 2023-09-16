import { FC, PropsWithChildren } from "react";
import "./globals.scss";
import styles from "./layout.module.scss";
import Sidebar from "@/components/sidebar/Sidebar";
import Providers from "@/components/Providers";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
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
