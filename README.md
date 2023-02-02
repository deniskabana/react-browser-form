## NOT READY FOR PRODUCTION USE YET!

**Wait until the release of version `1.0.0` before adopting React Browser Form into your codebase.**

There might be some breaking changes introduced before an official release statement is put out. Current usage is only recommended for testing, developing or contributing.

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

<p align="center">
  <a href="https://deniskabana.github.io/react-browser-form/introduction">Introduction</a> | 
  <a href="https://deniskabana.github.io/react-browser-form/getting-started">Getting started</a> |
  <a href="https://deniskabana.github.io/react-browser-form/documentation">API & docs</a> |
  <a href="https://deniskabana.github.io/react-browser-form/frequently-asked-questions">FAQs</a> |
  <a href="https://deniskabana.github.io/react-browser-form/examples">Examples</a>
</p>

### Features

1. Written with performance, developer experience and UX in mind
2. TypeScript-first. Type safety, hints and checks
3. [Small size](https://bundlephobia.com/result?p=react-browser-form@latest) and no [dependencies](./package.json)
4. Compatible with UI libraries and frameworks and 3rd party validators *(coming soon...)*
5. Validation and transformation support
6. Minimal API with focus on best practices, flexible usage

### Install

    npm install react-browser-form
    # OR
    yarn add react-browser-form

### Quickstart

See the [Getting started](https://deniskabana.github.io/react-browser-form/getting-started) page in our Docs for more information.

```jsx
const defaultValues = {
  email: "roberta_warren@znation.com",
};
type Form = typeof defaultValues;

function Component() {
  const [data, setData] = React.useState<Form>();
  const { formProps, names } = useBrowserForm<Form>({ name: "example", defaultValues, onSubmit: setData });

  return (
    <form {...formProps}>
      <input type="email" placeholder="E-mail address" name={names.email} />
      <button type="submit">Subscribe</button>
    </form>
  );
}
```

### Sponsors

**Proudly sponsored by:**

<a href='https://nekastores.eu/'>
  <img src='https://nekastores.eu/logo-letter.jpeg' height='96' />
</a>
