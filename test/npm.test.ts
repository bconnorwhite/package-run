import { test, expect, beforeEach, afterEach } from "@jest/globals";
import mock, { restore } from "mock-fs";
import { executableToString } from "../source/index.js";

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
  expect(string).toBe("npx --no-install babel ./src --out-dir ./build --config-file ./babel.config.json --watch");
});

test("has script", async () => {
  const string = await executableToString({
    command: "test"
  });
  expect(string).toBe("npm run test");
});
