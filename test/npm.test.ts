import { test, expect, beforeEach, afterEach } from "@jest/globals";
import mock, { restore } from "mock-fs";
import { executableToString } from "../source";

beforeEach(() => {
  mock({
    "package-lock.json": "TEST",
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
    expect(string).toBe("npx --no-install babel ./src --out-dir ./build --config-file ./babel.config.json --watch");
    done?.();
  });
});

test("has script", async (done) => {
  executableToString({
    command: "test"
  }).then((string) => {
    expect(string).toBe("npm run test");
    done?.();
  });
});
