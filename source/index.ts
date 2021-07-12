import asArray from "as-typed-array";
import { hasScript } from "has-script";
import { getPackageManagerName } from "which-pm-lockfile";
import { exec, executableToString as execExecutableToString, Executable, ExecResult, Arg } from "@bconnorwhite/exec";

export type RunOptions = {
  silent?: boolean;
};

function getArgs(args: Arg[], executable: Executable) {
  return args.concat(asArray(executable.command)).concat(asArray(executable.args ?? []));
}

async function getNPMExecutable(executable: Executable, options: RunOptions = {}): Promise<Executable> {
  return hasScript(executable.command).then((result) => {
    if(result) {
      return {
        ...executable,
        command: "npm",
        args: getArgs(["run", { silent: options.silent }], executable)
      };
    } else {
      return {
        ...executable,
        command: "npx",
        args: getArgs([{ "no-install": true, "quiet": options.silent }], executable)
      };
    }
  });
}

export async function getExecutable(executable: Executable, options?: RunOptions): Promise<Executable> {
  return getPackageManagerName().then((name = "yarn") => {
    if(name === "npm") {
      return getNPMExecutable(executable, options);
    } else {
      return {
        ...executable,
        command: name,
        args: getArgs(["run", { silent: options?.silent }], executable)
      };
    }
  });
}

export async function executableToString(executable: Executable, options?: RunOptions) {
  return getExecutable(executable, options).then(execExecutableToString);
}

export default async function run(executable: Executable, options?: RunOptions): Promise<ExecResult> {
  return getExecutable(executable, options).then((result) => exec(result));
}

export {
  ExecResult
};
