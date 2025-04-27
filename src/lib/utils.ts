import { readFileSync } from "node:fs";
import { join } from "node:path";

export const renderName = (name: string) => {
  return name;
};

export function convertTxtToJson(content: string) {
  const lines = content.split("\n").filter((line) => line.trim() !== "");
  return {
    content: lines,
    lineCount: lines.length,
    timestamp: new Date().toISOString(),
  };
}

export function readFileContent(fileName: string) {
  const filePath = join(process.cwd(), fileName);
  const fileContent = readFileSync(filePath, "utf-8");

  if (!fileContent) {
    throw new Error("File is empty");
  }

  return convertTxtToJson(fileContent);
}
