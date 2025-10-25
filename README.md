# eslint-plugin-require-relative-imports

## Install

```bash
npm install eslint-plugin-require-relative-imports --save-dev
```

or

```bash
pnpm install eslint-plugin-require-relative-imports --save-dev
```

or

```bash
yarn add eslint-plugin-require-relative-imports --dev
```

## Usage (`.eslintrc.cjs`)

**Requires ESLint `>=8.56.0`.**

### CommonJS

```js
module.exports = [
  {
    plugins: ["require-relative-imports"],
    rules: {
      "require-relative-imports/restrict": "error",
    },
  },
  // …
];
```
