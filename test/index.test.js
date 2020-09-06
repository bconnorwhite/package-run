const run = require("../build/index.js")["default"];
const { getString } = require("../build/index.js");

test("getString", () => {
  getString({
    command: "babel",
    args: ["./src"],
    flags: {
      "out-dir": "./build",
      "config-file": "./babel.config.json",
      "watch": true
    }
  }).then((string) => {
    expect(string).toBe("yarn run babel ./src --out-dir ./build --config-file ./babel.config.json --watch");
  });
});

test("run", () => {
  run({
    command: "bob",
    flags: {
      version: true
    },
    silent: true
  }).then((result) => {
    expect(result.command.slice(-31)).toBe("node_modules/.bin/bob --version");
    expect(result.runOutput[0] !== "\n").toBe(true);
    expect(result.runOutput[result.runOutput.length-1] !== "\n").toBe(true);
    expect(result.colorRunOutput[0] !== "\n").toBe(true);
    expect(result.colorRunOutput[result.runOutput.length-1] !== "\n").toBe(true);
  });
});
