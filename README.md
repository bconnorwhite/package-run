<div align="center">
  <h1>package-run</h1>
  <a href="https://npmjs.com/package/package-run">
    <img alt="NPM" src="https://img.shields.io/npm/v/package-run.svg">
  </a>
  <a href="https://github.com/bconnorwhite/package-run">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/package-run.svg">
  </a>
  <a href="https://coveralls.io/github/bconnorwhite/package-run?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/bconnorwhite/package-run.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/package-run">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/package-run?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Node API for running package.json scripts.

Scripts will automatically run with the correct package manager (yarn, npm, or pnpm) if a lockfile is present.

For npm, if a the given script exists in packge.json it will be run using `npm run`.  
Otherwise, `npx --no-install` will be used.

## Installation

```bash
yarn add package-run
```

```bash
npm install package-run
```

## API

### Usage

```ts
import run, { executableToString } from "package-run";

run({
  command: "babel",
  args: [
    "./src",
    {
      "out-dir": "./build",
      "config-file": "./babel.config.json",
      "watch": true
    }
  ]
}, {
  slient: false // If true, will not output from yarn/npm/npx.
});

// Equivalent of:
// yarn run babel ./src --out-dir ./build --config-file ./babel.config.json --watch
// npx --no-install babel ./src --out-dir ./build --config-file ./babel.config.json --watch
// pnpm run babel ./src --out-dir ./build --config-file ./babel.config.json --watch

executableToString({
  command: "babel",
  args: [
    "./src"
    {
      "out-dir": "./build",
      "config-file": "./babel.config.json",
      "watch": true
    }
  ]
});

// "yarn run babel ./src --out-dir ./build --config-file ./babel.config.json --watch"
```

### Types

```ts
function run(executable: Executable, options?: RunOptions): Promise<ExecResult>;

function getString(executable: Executable, options?: RunOptions): Promise<string>;

type Executable = {
  command: string;
  args?: Args;
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  silent?: boolean;
}

type Args = Arg | Arg[];

type Arg = string | Flags;

type Flags = {
  [flag: string]: string | number | boolean  | string[] | undefined;
}

type ExecResult = {
  output: string;
  error: string;
  textOutput: string; // output stripped on ANSI colors
  textError: string; // error stripped on ANSI colors
  jsonOutput: () => JSONObject | JSONArray | undefined; // First JSON object or array in output
  jsonError: () => JSONObject | JSONArray | undefined; // First JSON object or array in error
}

type RunOptions = {
  silent?: boolean | undefined;
}
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/package-run.svg"></h2>

- [@bconnorwhite/exec](https://www.npmjs.com/package/@bconnorwhite/exec): Execute commands while keeping flags easily configurable as an object
- [as-typed-array](https://www.npmjs.com/package/as-typed-array): Make any value an array, and maintain types
- [has-script](https://www.npmjs.com/package/has-script): Check if package.json contains a script
- [which-pm-lockfile](https://www.npmjs.com/package/which-pm-lockfile): Check if a project uses yarn, npm, or pnpm. Supports yarn workspaces.

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/package-run.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/package-run.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)
