import fs from "fs";
import path from "path";
import { DIRECTORIES, FILES, EXTENSIONS } from "./consts";
import { Stats } from "./types";
import { isDirectory, isFile, logStats } from "./utils";

const pfs = fs.promises;

export async function prune(stringPath: string): Promise<void> {
  const [major, minor] = (process.versions.node.split(
    "."
  ) as unknown) as Array<number>;

  const paths = await walk(stringPath);

  const stats: Stats = {
    filesTotal: 0,
    filesDeleted: 0,
    sizeDeleted: 0,
  };

  await Promise.all(
    paths.map(async (each) => {
      stats["filesTotal"] = stats["filesTotal"] + 1;

      if (await shouldPrune(each)) {
        if (await isDirectory(each)) {
          const files = await pfs.readdir(each);

          // @ts-ignore
          const size = (await files.reduce(async (acc, file) => {
            const filePath = path.join(each, file);
            const stat = await pfs.lstat(filePath);
            return (await acc) + stat.size;
          }, 0)) as number;

          stats["filesDeleted"] = stats["filesDeleted"] + (files.length + 1);
          stats["sizeDeleted"] = stats["sizeDeleted"] + Number(size);

          if (major > 14 || (major === 14 && minor >= 14)) {
            await pfs.rm(each, { force: true, recursive: true });
          } else {
            await pfs.rmdir(each, { recursive: true });
          }
        }

        if (await isFile(each)) {
          const stat = await pfs.lstat(each);

          stats["filesDeleted"] = stats["filesDeleted"] + 1;
          stats["sizeDeleted"] = stats["sizeDeleted"] + stat.size;

          await pfs.unlink(each);
        }
      }
    })
  );

  logStats(stats);
}

async function shouldPrune(stringPath: string): Promise<boolean> {
  if (
    (await isDirectory(stringPath)) &&
    DIRECTORIES.includes(path.basename(stringPath))
  ) {
    return true;
  }

  if (await isFile(stringPath)) {
    if (
      FILES.includes(path.basename(stringPath)) ||
      EXTENSIONS.includes(path.extname(stringPath))
    ) {
      return true;
    }
  }

  return false;
}

async function walk(directory: string): Promise<Array<string>> {
  const paths = await pfs.readdir(directory);
  const directories = new Set<string>();

  const files = await Promise.all(
    paths.map(async (file) => {
      const filePath = path.join(directory, file);
      const stats = await pfs.lstat(filePath);

      if (stats.isDirectory()) {
        directories.add(filePath);
        return walk(filePath);
      }

      return [filePath];
    })
  );

  const withDirectories = files.concat(Array.from(directories));

  return withDirectories.reduce(
    (acc, folderContents) => acc.concat(folderContents),
    []
  );
}
