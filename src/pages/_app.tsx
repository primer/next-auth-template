import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ThemeProvider, BaseStyles, Box } from "@primer/react";
import "@/styles/reset.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider colorMode="auto" preventSSRMismatch>
      <BaseStyles>
        <SessionProvider session={session}>
          <Box
            backgroundColor={"canvas.default"}
            height={"100vh"}
            width={"100vw"}
            position={"absolute"}
            top={0}
            left={0}
          >
            <Component {...pageProps} />
          </Box>
        </SessionProvider>
      </BaseStyles>
    </ThemeProvider>
  );
}
