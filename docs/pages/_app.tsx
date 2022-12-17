import Head from "next/head";
import type { AppProps } from "next/app";
import AppLayout from "ui/layout/AppLayout";
import { Nunito as FontHelper, Ubuntu_Mono as FontMonoHelper } from "@next/font/google";
import "styles/startbootstrap-new-age.css";
import "styles/prism.min.css";
import "public/prism.min.js";

const font = FontHelper({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const fontMono = FontMonoHelper({ subsets: ["latin"], weight: ["400"], display: "swap" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="React dumb form documentation, APIs and examples" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        html {
          font-size: 18px;
        }
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
        #mainNav .navbar-brand,
        body {
          letter-spacing: 0.2px;
          font-family: ${font.style.fontFamily};

          --bs-font-monospace: ${fontMono.style.fontFamily};
        }
        code,
        .font-monospace {
          letter-spacing: 0.3px;
        }
        code {
          font-size: 110%;
          color: rgba(var(--bs-secondary-rgb), var(--bs-text-opacity));
        }
        pre,
        code[class*="language-"],
        pre[class*="language-"] {
          font-family: ${fontMono.style.fontFamily} !important;
          font-size: 0.8rem !important;
          line-height: 1.2 !important;
          background: white !important;
        }

        body {
          background: linear-gradient(to left, hsl(37deg 82% 90%), hsl(282deg 83% 95%));
        }
        ol.breadcrumb {
          margin-bottom: 0;
        }
        .nav-tabs .nav-link {
          font-size: 0.8em;
          font-weight: bold;
        }
      `}</style>

      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}
