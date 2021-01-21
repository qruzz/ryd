import fs from "fs";
import { Stats } from "./types";

const pfs = fs.promises;

export async function isDirectory(stringPath: string): Promise<boolean> {
  return await (await pfs.lstat(stringPath)).isDirectory();
}

export async function isFile(stringPath: string): Promise<boolean> {
  return await (await pfs.lstat(stringPath)).isFile();
}

export function logStats(stats: Stats) {
  console.log("Total files in node_modules:", stats["filesTotal"]);
  console.log("Total files deleted:", stats["filesDeleted"]);
  console.log("Total size deleted:", `${stats["sizeDeleted"] / 1000000}mb`);
}
