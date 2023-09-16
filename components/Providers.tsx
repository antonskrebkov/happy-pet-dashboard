"use client";

import { FC, PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <main>{children}</main>
      </Provider>
    </SessionProvider>
  );
};

export default Providers;
