import Head from "next/head";
import Link from "next/link";
import { Card } from "react-bootstrap";
import Separator from "ui/Separator";
import Tip from "ui/Tip";

export default function Page() {
  return (
    <>
      <Head>
        <title>Validation and transformation - React Browser Form Docs</title>
      </Head>

      <main>
        <h1>Validation and transformation</h1>
        <p>
          React Browser Form provides a <strong>minimal, but powerful</strong> first class API for helping with
          validation and data and/or type transformations.
        </p>

        <Separator />

        <div>
          <h2 className="mb-4">Validation</h2>
          <Tip variant="danger">
            Validation does not currently support 3rd-party libraries like Yup, Zod or Joi. Check introduction to
            understand if it is planned.
          </Tip>
          <p>
            Validation in React Browser Form is done in the easiest meaningful way possible. We aimed to make it
            type-safe, intuitive and re-usable. Using validation like this you can end up with a small amount of code
            that is just as powerful as using complex schemas. The error you throw with <code>ValidationError</code>{" "}
            will be used as error message.
          </p>
          <p>This is an example validation:</p>

          <Card className="my-3 shadow-sm">
            <pre className="m-0 line-numbers language-tsx" tabIndex={-1}>
              <code className="language-tsx">
                {`const validationSchema: ValidationSchema<Form> = {
  // Required fields
  required: { fields: ["firstName", "lastName"], message: "An optional custom message" },

  validators: {
    // Basic validation
    age: age => if (age < 18) throw new ValidationError("You must be at least 18 years old.");

    // Composed validation
    jobTitle: [validatorFunction, anotherValidatorFunction],

    // Access all form data
    phoneNumber: (phoneNumber, data) =>
      if (!phoneNumber && !data.email) throw new ValidationError("Phone number is required if no e-mail provided."),
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
                  This is a list of fields by name that you consider required. By default, there is an error message in
                  English - <code>"This field is required."</code>. Any field provided with <code>fields</code> is
                  checked for nullish values or empty strings.
                </li>
              </ul>
            </li>
            <li>
              <code>validators</code>
              <ul>
                <li>
                  This is where you can harness the power of React Browser Form's type safety. Validators accepts named
                  keys that correspond to your schema and should be a function that receives 2 arguments - current field
                  and all form data. The field's data has a type you provided to React Browser Form when initializing.
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
            There are built-in transformations that happen based on the <code>input.type</code> React Browser Forms
            finds in DOM.
          </Tip>

          <p>
            When using input types that correspons to your schema, like <code>type="number"</code>, automatic
            transformation take place. You can prevent this by passing <code>disableDefaultTransformation: true</code>{" "}
            to the transformation schema. To see this in action, see{" "}
            <Link href="/examples/advanced/automatic-value-types">Automatic value types</Link> example.
          </p>

          <Card className="my-3 shadow-sm">
            <pre className="m-0 line-numbers language-tsx" tabIndex={-1}>
              <code className="language-tsx">{`const transformationSchema: TransformationSchema<Form> = {
  // Optionally disable default transformation based on input.type
  disableDefaultTransformation: true,

  // Transform fields manually by name
  fields: {
    // Primitive type shorthands
    authorName: "string",
    authorAge: "number",

    // Type transformation
    authorBirthDate: value => new Date(Number(value)),

    // Value transformation
    authorUsername: value => String(value).toLowerCase().replaceAll(/[^a-z]/g, ""),
  },
}`}</code>
            </pre>
          </Card>

          <p>
            You can provide your own transformations using the <code>fields</code> object on transformation schema. Here
            you can use shorthands (string <code>"number" | "string" | "boolean"</code>) or a function, that takes in a
            field value and returns your new, transformed value.
          </p>
          <p>
            You can easily transform just the types of the values or even mutate and change the data that is stored in
            form data. See <Link href="/examples/advanced/value-transformation">Value transformation</Link> example to
            get an idea how it works.
          </p>
        </div>
      </main>
    </>
  );
}
