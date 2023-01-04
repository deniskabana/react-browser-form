import Head from "next/head";
import { Card } from "react-bootstrap";
import Separator from "ui/Separator";
import Tip from "ui/Tip";

export default function Page() {
  return (
    <>
      <Head>
        <title>Validation and transformation - React Dumb Form Docs</title>
      </Head>

      <main>
        <h1>Validation and transformation</h1>
        <p>React Dumb Form provides a first class API for helping with validation and data or type transformations.</p>

        <Separator />

        <div>
          <h2 className="mb-4">Validation</h2>
          <Tip variant="danger">
            Validation does not currently support 3rd-party libraries like Yup, Zod or Joi. Check introduction to
            understand if it is planned.
          </Tip>
          <p>
            Validation in React Dumb Form is done in the easiest meaningful way possible. We aimed to make it type-safe,
            intuitive and re-usable. Using validation like this you can end up with a small amount of code that is just
            as powerful as using complex schemas. The error you throw with <code>ValidationError</code>
          </p>
          <p>This is an example validation:</p>

          <Card className="my-3 shadow-sm">
            <pre className="m-0 line-numbers language-tsx" tabIndex={-1}>
              <code className="language-tsx">
                {`const validationSchema: ValidationSchema<Form> = {
  required: { fields: ["firstName", "lastName"], message: "An optional custom message" },

  validators: {
    age: age => if (age < 18) throw new ValidationError("You must be at least 18 years old.");
    jobTitle: [validatorFunction, anotherValidatorFunction],
  },
}`}
              </code>
            </pre>
          </Card>

          <p>
            There are 2 optional keys on the <code>validationSchema</code> that you need to be aware of:
          </p>

          <ul>
            <li>
              <code>required</code>
              <ul>
                <li>
                  This is a shorthand for required field. By default, there is an error message in English -{" "}
                  <code>"This field is required."</code>. Any field provided with <code>fields</code> is checked for
                  nullish values or empty strings.
                </li>
              </ul>
            </li>
            <li>
              <code>validators</code>
              <ul>
                <li>
                  This is where you can harness the power of React Dumb Form's type safety. Validators accepts named
                  keys that correspond to your schema and should be a function that receives 2 arguments - current field
                  and all form data. The field's data has a type you provided to React Dumb Form when initializing.
                </li>
                <li>
                  You can also compose your validators by providing an array of functions instead of a single function.
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <Separator />

        <div>
          <h2 className="mb-4">Transformation</h2>
          <Tip variant="info">
            There are built-in transformations that happen based on the <code>input.type</code> React Dumb Forms finds
            in DOM.
          </Tip>
        </div>
      </main>
    </>
  );
}
