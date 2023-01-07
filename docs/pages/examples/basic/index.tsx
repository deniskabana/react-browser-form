import Head from "next/head";
import Separator from "ui/Separator";

export default function Page() {
  return (
    <>
      <Head>
        <title>Basic examples - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Basic examples</h1>

        <Separator />

        <p>
          All the examples for basic usage strive to demonstrate the most basic and commonly used features and options
          of React Dumb Form in a way, where you can easily understand how it works.
        </p>
        <p>
          You can monitor what the form is doing with the meta table displayed next to it and can also inspect the code
          used to render the form.
        </p>
      </main>
    </>
  );
}
