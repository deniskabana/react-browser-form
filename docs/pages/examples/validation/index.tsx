import Head from "next/head";
import Separator from "ui/Separator";
import Tip from "ui/Tip";

export default function Page() {
  return (
    <>
      <Head>
        <title>Validation examples - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Validation examples</h1>

        <Separator />

        <p>
          Validation is made to be very easy, effective and minimal with React Dumb Form. These examples will guide you
          through the easiest to the most complex usage of validation so you can see it in action.
        </p>

        <Tip variant="info">
          We currently do not support 3rd-party validation libraries, although there is a plan for that. However, our
          validation is so satisfying to use, you will want to use it.
        </Tip>
      </main>
    </>
  );
}
