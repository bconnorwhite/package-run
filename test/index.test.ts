import { test, expect, beforeEach, afterEach } from "@jest/globals";
import mock, { restore } from "mock-fs";
import run, { executableToString } from "../source/index.js";

beforeEach(() => {
  mock({
    "package.json": JSON.stringify({
      scripts: {
        test: "TEST"
      }
    })
  }, {
    createCwd: false
  });
});

afterEach(restore);

test("executableToString", async () => {
  const string = await executableToString({
    command: "babel",
    args: [
      "./src",
      {
        "out-dir": "./build",
        "config-file": "./babel.config.json",
        "watch": true
      }
    ]
  });
  expect(string).toBe("yarn run babel ./src --out-dir ./build --config-file ./babel.config.json --watch");
});

test("run", async () => {
  const result = await run({
    command: "auto",
    args: {
      help: true
    },
    silent: true
  });
  expect(result.textOutput.split("\n")[0].endsWith("node_modules/.bin/auto --help")).toBe(true);
});

test("has script", async () => {
  const string = await executableToString({
    command: "test"
  });
  expect(string).toBe("yarn run test");
});
