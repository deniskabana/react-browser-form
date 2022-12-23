import Head from "next/head";
import type { AppProps } from "next/app";
import AppLayout from "ui/layout/AppLayout";
import { Nunito as FontHelper, Ubuntu_Mono as FontMonoHelper } from "@next/font/google";
import "styles/startbootstrap-new-age.css";
import "styles/prism.min.css";
import "styles/custom-docs-style.css";
import "public/prism.min.js";
import { useRouter } from "next/router";
import { useEffect} from "react";
import { SSRProvider } from "react-bootstrap";

const font = FontHelper({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const fontMono = FontMonoHelper({ subsets: ["latin"], weight: ["400"], display: "swap" });

export default function App({ Component, pageProps}: AppProps ) {
  const { pathname } = useRouter();

  // Re-apply syntax highlighting whenever a page changes
  useEffect(() => {
    if (typeof window !== "undefined" && "Prism" in window) {
      (window as any).Prism.highlightAll();
    }
  }, [pathname]);

  return (
    <SSRProvider>
      <Head>
        <meta name="description" content="React dumb form documentation, APIs and examples" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        /* Apply custom fonts */
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        #mainNav .navbar-brand,
        .tooltip-inner,
        body {
          letter-spacing: 0.2px;
          font-family: ${font.style.fontFamily};
          --bs-font-monospace: ${fontMono.style.fontFamily};
        }
        pre,
        code[class*="language-"],
        pre[class*="language-"] {
          font-family: ${fontMono.style.fontFamily} !important;
        }
      `}</style>

      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SSRProvider>
  );
}