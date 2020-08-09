# package-run
Programmatically run package.json scripts. Supports yarn, npm, and pnpm.

```ts
run(command: Command) => Promise<SpawnSyncReturns<Buffer>>

type Command = {
  command: string;
  args?: string | string[];
  flags?: Flags;
  env?: NodeJS.ProcessEnv;
}
```

```ts
import run from "package-run";

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
```
