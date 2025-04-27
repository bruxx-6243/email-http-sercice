import { readFileSync } from "node:fs";
import { join } from "node:path";
export function convertTxtToJson(content) {
    const lines = content.split("\n").filter((line) => line.trim() !== "");
    return {
        content: lines,
        lineCount: lines.length,
        timestamp: new Date().toISOString(),
    };
}
export function readFileContent(fileName) {
    const filePath = join(process.cwd(), fileName);
    const fileContent = readFileSync(filePath, "utf-8");
    if (!fileContent) {
        throw new Error("File is empty");
    }
    return convertTxtToJson(fileContent);
}
