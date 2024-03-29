import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "andrewdaotran/utils/api";

import superjson from "superjson";

import "andrewdaotran/styles/globals.css";

import { MessageProvider } from "andrewdaotran/context/MessageContext";
import { MobileMenuProvider } from "andrewdaotran/context/MobileMenuContext";
import { Toaster } from "react-hot-toast";
import { BasicInforomationProvider } from "andrewdaotran/context/BasicInformationContext";
import { DescriptionProvider } from "andrewdaotran/context/DescriptionContext";
import { HobbyProvider } from "andrewdaotran/context/HobbyContext";
import WindowSizeContext, {
  WindowSizeContextType,
  WindowSizeProvider,
} from "andrewdaotran/context/ScreenSizeContext";
import { LoginButtonProvider } from "andrewdaotran/context/EditButtonContext";
import { LoginModalProvider } from "andrewdaotran/context/LoginModalContext";
import { AppRouter } from "andrewdaotran/server/api/root";

import { SidebarProvider } from "andrewdaotran/context/SidebarContext";
import Navbar from "andrewdaotran/components/Navbar";
import { useContext } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <LoginModalProvider>
        <WindowSizeProvider>
          <SidebarProvider>
            <BasicInforomationProvider>
              <DescriptionProvider>
                <HobbyProvider>
                  <MobileMenuProvider>
                    <MessageProvider>
                      {/* Navbar */}

                      <Component {...pageProps} />
                      <Toaster />
                    </MessageProvider>
                  </MobileMenuProvider>
                </HobbyProvider>
              </DescriptionProvider>
            </BasicInforomationProvider>
          </SidebarProvider>
        </WindowSizeProvider>
      </LoginModalProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
