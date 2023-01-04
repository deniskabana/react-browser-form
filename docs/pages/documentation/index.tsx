import Head from "next/head";
import Separator from "ui/Separator";

export default function Page() {
  return (
    <>
      <Head>
        <title>Documentation - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Documentation</h1>
        <p>Lorem ipsum dolor sit amet consectetur edipiscing elit.</p>

        <Separator />

        <div>
          <h2 className="mb-4">How it works</h2>
          <p>Lorem ipsum dolor sit amet consectetur edipiscing elit.</p>
        </div>
      </main>
    </>
  );
}
