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

test("executableToString", async (done) => {
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
    done?.();
  });
});

test("run", async (done) => {
  run({
    command: "bob",
    args: {
      version: true
    },
    silent: true
  }).then((result) => {
    expect(result.textOutput.split("\n")[0].endsWith("node_modules/.bin/bob --version")).toBe(true);
    done?.();
  });
});

test("has script", async (done) => {
  executableToString({
    command: "test"
  }).then((string) => {
    expect(string).toBe("yarn run test");
    done?.();
  });
});
