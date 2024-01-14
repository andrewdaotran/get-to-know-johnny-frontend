"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export default function ProvidersWrapper({ children }: Props) {
  return <SessionProvider session={null}>{children}</SessionProvider>;
}
