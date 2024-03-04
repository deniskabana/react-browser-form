<div align="center">
  🚫 This project is no longer maintained - cue React v19 form handling.
</div>

---

<div align="center">
  <a href="https://deniskabana.github.io/react-browser-form/introduction" title="React Browser Form - Form management in React made simple for browsers.">
    <img src="https://raw.githubusercontent.com/deniskabana/react-browser-form/main/docs/public/github-logo.png" alt="🌐📝 React Browser Form - React hook for form management in web browsers." />
  </a>
</div>

<div align="center">

![Build status](https://img.shields.io/github/actions/workflow/status/deniskabana/react-browser-form/main.yml?branch=main&style=for-the-badge)
![Size](https://img.shields.io/bundlephobia/minzip/react-browser-form?style=for-the-badge)
![Version](https://img.shields.io/npm/v/react-browser-form?style=for-the-badge)
![License](https://img.shields.io/github/license/deniskabana/react-browser-form?style=for-the-badge)

</div>

---

React Browser Form is a small React library designed as a single hook intended to handle form usage in React while incentivizing the usage of [web forms](https://developer.mozilla.org/en-US/docs/Learn/Forms). It is designed to be flexible, performant, easy to learn and use and to handle even very complex forms while providing full type safety and an amazing developer experience. [Read more in FAQ](https://deniskabana.github.io/react-browser-form/frequently-asked-questions).

---

## Features

1. Written with performance 💡, developer experience 🧑‍💻 and browser standards 🌐 in mind.
2. TypeScript-first with full type safety.
3. Comes with a [TSDoc documentation](https://github.com/deniskabana/react-browser-form/blob/main/src/types.ts) including links to examples and docs.
4. [Small size](https://bundlephobia.com/result?p=react-browser-form@latest) and no [dependencies](./package.json).
5. Non-opinionated, flexible and extensible.
6. Built-in [validation and transformation](https://deniskabana.github.io/react-browser-form/documentation/validation-and-transformation) support.
7. Minimal API with emphasis on best practices.

## Docs & examples
Visit the [Documentation for 🌐📝 React Browser Form](https://deniskabana.github.io/react-browser-form/).

## Install

    npm install --save react-browser-form
    # OR
    yarn add react-browser-form

## Quickstart

See the [Getting started](https://deniskabana.github.io/react-browser-form/getting-started) page in our Docs for more information.

```tsx
const defaultValues = { title: "" };
export type Form = typeof defaultValues;

export default function FormComponent() {
  const onSubmit = React.useCallback((values: Form) => {
    console.log(values);
  }, []);

  const { formProps, names } = useBrowserForm<Form>({
    name: "new-form",
    defaultValues,
    onSubmit,
  });

  return (
    <form {...formProps}>
      <input name={names.title} type="text" />
      <button type="submit">Subscribe</button>
    </form>
  );
}
```
