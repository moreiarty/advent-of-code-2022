import { readFile } from "fs/promises";
import { join } from "path";

export const getFile = async (dotDirName: string, filePath: string): Promise<string> => {
    return await readFile(join(dotDirName, filePath), {
        encoding: "utf-8",
    });
};
