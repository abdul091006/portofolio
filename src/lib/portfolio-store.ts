import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  defaultPortfolioContent,
  normalizePortfolioContent,
  type PortfolioContent,
} from "@/lib/portfolio-content";

const dataFilePath = path.join(
  process.cwd(),
  "src",
  "data",
  "portfolio-content.json",
);

export async function getPortfolioContent(): Promise<PortfolioContent> {
  try {
    const content = await readFile(dataFilePath, "utf-8");
    return normalizePortfolioContent(JSON.parse(content));
  } catch {
    return defaultPortfolioContent;
  }
}

export async function savePortfolioContent(
  input: unknown,
): Promise<PortfolioContent> {
  const content = normalizePortfolioContent(input);

  await mkdir(path.dirname(dataFilePath), { recursive: true });
  await writeFile(dataFilePath, `${JSON.stringify(content, null, 2)}\n`);

  return content;
}
