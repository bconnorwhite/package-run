# package-run
Programmatically run package.json scripts. Supports yarn, npm, and pnpm.

## API

### Usage

```ts
import run, { getString } from "package-run";

run({
  command: "babel",
  args: ["./src"],
  flags: {
    "out-dir": "./build",
    "config-file": "./babel.config.json",
    "watch": true
  }
});

// Equivalent of:
// yarn run babel ./src --out-dir ./build --config-file ./babel.config.json --watch
// npm run babel ./src --out-dir ./build --config-file ./babel.config.json --watch
// pnpm run babel ./src --out-dir ./build --config-file ./babel.config.json --watch

getString({
  command: "babel",
  args: ["./src"],
  flags: {
    "out-dir": "./build",
    "config-file": "./babel.config.json",
    "watch": true
  }
});

// "yarn run babel ./src --out-dir ./build --config-file ./babel.config.json --watch"
```

### Types

```ts
function run(command: Command): Promise<RunResult>;

function getString(command: Command): Promise<string>;

type Command = {
  command: string;
  args?: string | string[];
  flags?: Flags;
  env?: NodeJS.ProcessEnv;
  cwd?: string;
  silent?: boolean;
}

type RunResult = {
  error: string;
  output: string;
  jsonOutput: () => JSONObject | undefined;
  jsonError: () => JSONObject | undefined;
  command?: string;
  runOutput: string;
}
```
