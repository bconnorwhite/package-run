<!--BEGIN HEADER-->
<div id="top" align="center">
  <h1>package-run</h1>
  <a href="https://npmjs.com/package/package-run">
    <img alt="npm" src="https://img.shields.io/npm/v/package-run.svg">
  </a>
  <a href="https://github.com/bconnorwhite/package-run">
    <img alt="typescript" src="https://img.shields.io/github/languages/top/bconnorwhite/package-run.svg">
  </a>
  <a href="https://coveralls.io/github/bconnorwhite/package-run?branch=master">
    <img alt="Coveralls Status" src="https://img.shields.io/coveralls/github/bconnorwhite/package-run.svg?branch=master">
  </a>
</div>

<br />

<blockquote align="center">Node API for running package.json scripts.</blockquote>

<br />

_If I should maintain this repo, please ⭐️_
<a href="https://github.com/bconnorwhite/package-run">
  <img align="right" alt="GitHub stars" src="https://img.shields.io/github/stars/bconnorwhite/package-run?label=%E2%AD%90%EF%B8%8F&style=social">
</a>

_DM me on [Twitter](https://twitter.com/bconnorwhite) if you have questions or suggestions._
<a href="https://twitter.com/bconnorwhite">
  <img align="right" alt="Twitter Follow" src="https://img.shields.io/twitter/url?label=%40bconnorwhite&style=social&url=https%3A%2F%2Ftwitter.com%2Fbconnorwhite">
</a>

---
<!--END HEADER-->

Scripts will automatically run with the correct package manager (yarn, npm, or pnpm) if a lockfile is present.

For npm, if a the given script exists in packge.json it will be run using `npm run`.  
Otherwise, `npx --no-install` will be used.

## Installation

```sh
yarn add package-run
```

```sh
npm install package-run
```

```sh
pnpm install package-run
```

## Usage

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

<!--BEGIN FOOTER-->

<br />

<h2 id="dependencies">Dependencies<a href="https://www.npmjs.com/package/package-run?activeTab=dependencies"><img align="right" alt="dependencies" src="https://img.shields.io/librariesio/release/npm/package-run.svg"></a></h2>

- [@bconnorwhite/exec](https://www.npmjs.com/package/@bconnorwhite/exec): Execute commands while keeping flags easily configurable as an object
- [as-typed-array](https://www.npmjs.com/package/as-typed-array): Make any value an array
- [has-script](https://www.npmjs.com/package/has-script): Check if package.json contains a script
- [which-pm-lockfile](https://www.npmjs.com/package/which-pm-lockfile): Check if a project uses yarn, npm, or pnpm


<br />

<h3>Dev Dependencies</h3>

- [@types/mock-fs](https://www.npmjs.com/package/@types/mock-fs): TypeScript definitions for mock-fs
- [autorepo](https://www.npmjs.com/package/autorepo): Autorepo abstracts away your dev dependencies, providing a single command to run all of your scripts.
- [mock-fs](https://www.npmjs.com/package/mock-fs): A configurable mock file system.  You know, for testing.


<br />

<h2 id="license">License <a href="https://opensource.org/licenses/MIT"><img align="right" alt="license" src="https://img.shields.io/npm/l/package-run.svg"></a></h2>

[MIT](https://opensource.org/licenses/MIT) - _The MIT License_
<!--END FOOTER-->
