import { getPackageManagerName } from "@bconnorwhite/package";
import exec, { Command } from "@bconnorwhite/exec";

const run = async ({ command, args = [], flags, env }: Command) => {
  return getPackageManagerName().then((name) => {
    return exec({
      command: name ?? "yarn",
      args: ["run", command].concat(args),
      flags,
      env
    });
  });
}

export default run;
