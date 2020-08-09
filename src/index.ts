import getPreferred from "preferred-pm";
import exec, { Command } from "@bconnorwhite/exec";

const run = ({ command, args = [], flags, env }: Command) => {
  const { name } = (getPreferred(process.cwd()) ?? { name: "yarn" });
  return exec({
    command: name,
    args: ["run", command].concat(args),
    flags,
    env
  });
}

export default run;
