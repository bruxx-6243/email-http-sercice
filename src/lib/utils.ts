import * as fs from "fs/promises";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import * as path from "path";

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

async function writeToFile(content: string, directory: string): Promise<void> {
  try {
    await fs.mkdir(directory, { recursive: true });

    const timestamp = new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .replace("T", "_")
      .slice(0, 15);

    const fileName = `log_${timestamp}.txt`;
    const filePath = path.join(directory, fileName);

    await fs.writeFile(filePath, content, "utf8");
    console.log(`Successfully wrote to ${filePath}`);
  } catch (error) {
    console.error("Error writing to file:", error);
    throw error;
  }
}

export function createLog(content: string) {
  const directory = "./logs";
  return writeToFile(content, directory);
}

export async function readTxtFiles(directory: string): Promise<string[]> {
  try {
    const files = await fs.readdir(directory);

    const txtFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".txt"
    );

    const contents: string[] = [];
    for (const file of txtFiles) {
      const filePath = path.join(directory, file);
      const content = await fs.readFile(filePath, "utf8");
      contents.push(content);
    }

    console.log(
      `Successfully read ${txtFiles.length} .txt files from ${directory}`
    );

    return contents;
  } catch (error) {
    console.error("Error reading .txt files:", error);
    throw error;
  }
}
