import fs from "fs-extra";
import path from "path";

export interface StoredChunk {
  id: string;

  sourceId: string;

  title: string;

  url: string;

  chunkIndex: number;

  text: string;

  embedding: number[];
}

const DATABASE_PATH = path.join(process.cwd(), "database", "knowledge.json");

export async function getAllChunks(): Promise<StoredChunk[]> {
  const exists = await fs.pathExists(DATABASE_PATH);

  if (!exists) {
    await fs.ensureFile(DATABASE_PATH);
    await fs.writeJson(DATABASE_PATH, []);
  }

  return await fs.readJson(DATABASE_PATH);
}

export async function saveChunks(chunks: StoredChunk[]): Promise<void> {
  const existing = await getAllChunks();

  existing.push(...chunks);

  await fs.writeJson(DATABASE_PATH, existing, { spaces: 2 });
}
