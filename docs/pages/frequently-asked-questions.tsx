import Head from "next/head";
import Separator from "ui/Separator";

export default function Page() {
  return (
    <>
      <Head>
        <title>FAQ - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Frequently asked questions</h1>
        <p>
          This page is meant to be updated continually based on discussions, GitHub issues, denied PRs and any other
          communication with developers.
        </p>

        <Separator />

        <div>
          <ol>
            <li>
              <h5>Can React Dumb Form be used outside of React?</h5>
              <p className="text-muted">
                It has been specifically designed for React - as a React hooks that implements other React hooks. We do
                not advise trying to use React Dumb Form outside of React.
              </p>
            </li>

            <li>
              <h5>Can React Dumb Form be used in React native?</h5>
              <p className="text-muted">
                Unfortunately not. The whole point of this library is to utilize what web browsers already have
                implemented. This is a design decision that is not a subject to change anytime soon.
              </p>
            </li>

            <li>
              <h5>Can I build forms of any complexity?</h5>
              <p className="text-muted">
                <strong>Yes.</strong> They will also be written in a declarative way, with a small amount of code and be
                very performant.
              </p>
            </li>
          </ol>
        </div>
      </main>
    </>
  );
}
