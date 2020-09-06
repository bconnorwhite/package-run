import { getPackageManagerName } from "which-pm-lockfile";
import exec, { commandToString, Command, ExecResult } from "@bconnorwhite/exec";

export async function getString(command: Command) {
  return getCommand(command).then(commandToString);
}

export async function getCommand(command: Command): Promise<Command> {
  return getPackageManagerName().then((name) => {
    return {
      ...command,
      command: name ?? "yarn",
      args: ["run", command.command].concat(command.args ?? [])
    };
  });
}

const run = async (command: Command) => {
  return getCommand(command).then((result) => exec(result));
}

export default run;

export {
  ExecResult
}
