import fs, { Stats } from "fs";
import { RydStats } from "./types";

const pfs = fs.promises;

export async function safeStat(stringPath: string): Promise<Stats | null> {
  try {
    const stat = await pfs.lstat(stringPath);
    return stat;
  } catch (error) {
    return null;
  }
}

export async function isDirectory(stringPath: string): Promise<boolean> {
  const stat = await safeStat(stringPath);

  if (stat && (await stat.isDirectory())) {
    return true;
  }

  return false;
}

export async function isFile(stringPath: string): Promise<boolean> {
  const stat = await safeStat(stringPath);

  if (stat && (await stat.isFile())) {
    return true;
  }

  return false;
}

export function logStats(stats: RydStats) {
  console.log("Total files in node_modules:", stats["filesTotal"]);
  console.log("Total files deleted:", stats["filesDeleted"]);
  console.log("Total size deleted:", `${stats["sizeDeleted"] / 1000000}mb`);
}
