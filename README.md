<div align="center">
  <a href="https://deniskabana.github.io/react-browser-form/introduction" title="React Browser Form - Form management in React made simple for browsers.">
    <img src="https://raw.githubusercontent.com/deniskabana/react-browser-form/main/docs/public/github-logo.png" alt="🌐📝 React Browser Form - React hook for form management in web browsers." />
  </a>
</div>

<div align="center">

![Build status](https://img.shields.io/github/actions/workflow/status/deniskabana/react-browser-form/main.yml?branch=main&style=for-the-badge)
![Size](https://img.shields.io/bundlephobia/minzip/react-browser-form?style=for-the-badge)
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
4. Compatible with UI libraries and framework
5. Flexible, extensible, unopinionated
6. Validation and transformation support

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
  const { formProps, names } = useBrowserForm<Form>{ name: "example", defaultValues };

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
