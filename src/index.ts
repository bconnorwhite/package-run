import { getPackageManagerName } from "which-pm-lockfile";
import exec, { commandToString, Command, ExecResult } from "@bconnorwhite/exec";
import { removeTerminatingNewline } from "terminating-newline";

export type RunResult = {
  command?: string;
  runOutput: string;
} & ExecResult;

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

const infoString = "info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.";

export default async function(command: Command) {
  return getCommand(command).then((result) => exec(result).then((execResult) => {
    let command: string = undefined;
    let runOutput = execResult.output;
    if(execResult.output.startsWith("$ ")) {
      command = removeTerminatingNewline(execResult.output.slice(2, execResult.output.indexOf("\n")));
      runOutput = execResult.output.slice(execResult.output.indexOf("\n") + 1)
    }
    return {
      ...execResult,
      command,
      runOutput: removeTerminatingNewline(runOutput.replace(infoString, ""))
    }
  }));
}

export {
  ExecResult
}
