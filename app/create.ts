import fs from "fs";
import path from "path";
import { prune } from "./prune";

export function createApp(args: Array<string>): () => void {
  const prunePath =
    args.length > 0 ? args[0] : path.join(process.cwd(), "/node_modules");

  if (!fs.existsSync(prunePath)) {
    throw new Error(`${prunePath} was not found`);
  }

  return () => {
    void prune(prunePath);
  };
}
