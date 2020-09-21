const run = require("../build/index.js")["default"];
const { executableToString } = require("../build/index.js");

test("executableToString", () => {
  executableToString({
    command: "babel",
    args: [
      "./src",
      {
        "out-dir": "./build",
        "config-file": "./babel.config.json",
        "watch": true
      }
    ]
  }).then((string) => {
    expect(string).toBe("yarn run babel ./src --out-dir ./build --config-file ./babel.config.json --watch");
  });
});

test("run", () => {
  run({
    command: "bob",
    args: {
      version: true
    },
    silent: true
  }).then((result) => {
    expect(result.textOutput.split("\n")[0].endsWith("node_modules/.bin/bob --version")).toBe(true);
  });
});
