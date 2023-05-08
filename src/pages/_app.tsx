import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "andrewdaotran/utils/api";

import "andrewdaotran/styles/globals.css";

// import { MessageProvider } from "andrewdaotran/context/MessageContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      {/* <MessageProvider> */}
      <Component {...pageProps} />
      {/* </MessageProvider> */}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
