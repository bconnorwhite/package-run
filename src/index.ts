import { getPackageManagerName } from "@bconnorwhite/package";
import exec, { Command } from "@bconnorwhite/exec";

export async function getCommand({ command, args = [], flags, env }: Command): Promise<Command> {
  return getPackageManagerName().then((name) => {
    return {
      command: name ?? "yarn",
      args: ["run", command].concat(args),
      flags,
      env
    };
  });
}

const run = async (command: Command) => {
  return getCommand(command).then((result) => {
    exec(result);
  });
}

export default run;
