import Head from "next/head";
import type { AppProps } from "next/app";
import AppLayout from "ui/layout/AppLayout";
import "styles/startbootstrap-new-age.css";
import { Mulish } from "@next/font/google";

const fontMulish = Mulish({ subsets: ["latin"], display: "swap" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="React dumb form documentation, APIs and examples" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        html,
        body {
          min-height: 100%;
          height: 100%;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        body {
          font-family: ${fontMulish.style.fontFamily};
        }
        body {
          background: linear-gradient(to left, hsl(37deg 82% 90%), hsl(282deg 83% 95%));
        }
      `}</style>

      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}
