# React Dumb Form

Motivation:

1. Developer-first experience - from juniors to seniors, start using forms with just 4 lines of code
2. Validation support with reusable functions
3. Performance optimization - only ever do what needs to be done
4. Flexibility - allow developers to take over and implement any custom logic over forms
5. First-class TypeScript support and run-time configuration checking to prevent unnecessary bugs
6. Great, noob-friendly examples & docs to help anyone understand the core mechanics in a matter of seconds
7. Full API coverage, verbose explanations and examples links with inline JSDoc + Docs
8. Only one dependency - React

## To-do

### Bugs

- [x] Form resetting is broken
- [x] `liveChangeFields` is broken
- [x] Example 5 shipping address input. Turn on different shipping address, hit submit, turn it off. Error is not clearable - ever.
- [x] Changing a state variable and re-rendering causes the inputs to be recreated in DOM, losing their intermittent state

### ASAP features

- [x] Rewrite callbacks - create a stored reference and add wrappers like `onChange: (formState: Schema) => options?.onChange && options.onChange({...formState})`
- [x] Add a support for onChange from the user event and test it
- [x] Add support for DOM form reset - reset to default values
- [x] Accept an optional array of functions in the validator to support decoupling and custom validators
- [x] Add run-time options validator
- [x] Increase plugin security and data integrity - use shallow object copies `{...obj}` when exposing data outside RDF

#### In the future

- [ ] Create a legitimate examples/ and a github page (inspiration Hapi.js, bootstrap)
  - [ ] Include an array of forms (kometa sezona)
  - [ ] Include multi-step form
  - [ ] Add extensive junior-friendly examples to appeal to a broader audience
  - [ ] Add a visual cue whether the form was submitted
  - [ ] Add "code display" with syntax highlight and
- [ ] Expose `changeReason` if not in production mode (it will be used in unit tests)
- [ ] Write unit tests
- [ ] Add support for functions instead of strings for error messages (i18n and dynamic string support)
- [ ] Create overloads for the options object to enforce correct settings
- [ ] Set up CI with test results, eslint, etc. on GitHub with badges
- [ ] Write a good documentation for people, not for senior devs
- [ ] Add links to API documentation to inline JSDoc in ./types.ts and ./useDumbForm.ts like MUI
- [ ] Test the library in my own project (Kometa)
- [ ] Docs -> installation, getting started, options, returned methods, usage

#### Ultra long-term

- [ ] Publish to npm
- [ ] Write a Medium article about the motivation and usage after using it extensively
- [ ] Update documentation with the Medium article
- [ ] Add 3rd party validators support, **reluctantly**
- [ ] Add JS support - test the library with vanilla JS and add updates to catch bugs that TS would
