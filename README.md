# eslint-plugin-require-relative-imports

An ESLint plugin that enforces relative imports within your project, with configurable exceptions for external packages.

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

## Usage

**Requires ESLint `>=8.56.0`.**

### Basic configuration

By default, the plugin only allows **Node.js built-ins** (`node:*`) and **scoped packages** (`@*`) as absolute imports. All other imports must be relative.

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

This allows the following:
- ✅ `import fs from "node:fs"` - Node.js built-ins
- ✅ `import { Button } from "@company/ui"` - Scoped packages
- ✅ `import { utils } from "./utils"` - Relative imports
- ✅ `import { helper } from "../shared/helper"` - Relative imports
- ❌ `import React from "react"` - Not allowed (use configuration)
- ❌ `import debounce from "lodash/debounce"` - Not allowed (use configuration)

### Configuration options

You can use the `allowedImports` option to allow additional patterns:

```js
module.exports = [
  {
    plugins: ["require-relative-imports"],
    rules: {
      "require-relative-imports/restrict": [
        "error",
        {
          allowedImports: [
            "node:",           // Node.js built-ins
            "@",               // Scoped packages
            "react",           // Specific package
            "lodash",          // Lodash and subpaths like lodash/debounce
            "/^storybook/",    // Regex: everything starting with "storybook"
          ],
        },
      ],
    },
  },
];
```

#### Pattern types

1. **Prefix match (string)**: Checks if the import starts with the string
   - `"react"` → Matches `react`, `react-dom`, and `react/jsx-runtime`
   - `"lodash"` → Matches `lodash` and `lodash/debounce`
   - `"@company"` → Matches `@company/ui` and `@company/utils`

2. **Regex pattern**: Wrap with `/` for regex matching
   - `"/^react$/"` → Matches only exact `react`, not `react-dom`
   - `"/^(react|vue)/"` → Matches imports starting with `react` or `vue`
   - `"/lodash$/"` → Matches only `lodash`, not `lodash/debounce`

### Examples

#### Allow only npm packages (no subpaths)

```js
{
  "require-relative-imports/restrict": [
    "error",
    {
      allowedImports: [
        "node:",
        "@",
        "/^[^/]+$/",  // Regex: matches only bare imports without /
      ],
    },
  ],
}
```

#### Storybook project configuration

If you use Storybook and want to allow storybook imports:

```js
{
  "require-relative-imports/restrict": [
    "error",
    {
      allowedImports: [
        "node:",
        "@",
        "react",
        "react-dom",
        "/^storybook/",  // All storybook imports
      ],
    },
  ],
}
```

#### Strict configuration (only Node.js built-ins)

```js
{
  "require-relative-imports/restrict": [
    "error",
    {
      allowedImports: ["node:"],
    },
  ],
}
```

#### Allow everything except specific patterns

If you want to allow almost all packages:

```js
{
  "require-relative-imports/restrict": [
    "error",
    {
      allowedImports: [
        "node:",
        "@",
        "/^(?!internal-)/",  // Everything except imports starting with "internal-"
      ],
    },
  ],
}
```

## Why use this plugin?

This plugin helps to:
- Enforce consistent import style within your project
- Prevent accidental absolute imports to project files
- Make the codebase more reusable and relocatable
- Clearly distinguish between external dependencies and internal modules

## License

MIT
