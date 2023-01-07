import Head from "next/head";
import Separator from "ui/Separator";

export default function Page() {
  return (
    <>
      <Head>
        <title>Examples - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Examples</h1>

        <Separator />

        <p>
          React Dumb Form aims to provide a lot of examples to showcase every feature and options there is to use.
          Browse these examples to get a good idea of how everything works and how it was meant to be used.
        </p>

        <p>Follow the links through the sidebar menu to discover more examples.</p>
      </main>
    </>
  );
}
