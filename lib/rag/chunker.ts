import { Chunk } from "../types";

const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 150;

export function chunkDocument(text: string): Chunk[] {
  const cleaned = text.trim();

  if (!cleaned) return [];

  const chunks: Chunk[] = [];

  let start = 0;
  let id = 1;

  while (start < cleaned.length) {
    let end = start + CHUNK_SIZE;

    // Don't cut words in half
    if (end < cleaned.length) {
      while (end > start && cleaned[end] !== " " && cleaned[end] !== "\n") {
        end--;
      }

      // If we couldn't find a space,
      // just cut at the chunk size.
      if (end === start) {
        end = start + CHUNK_SIZE;
      }
    }

    chunks.push({
      id: id++,
      text: cleaned.slice(start, end).trim(),
    });

    start = end - CHUNK_OVERLAP;

    if (start < 0) {
      start = 0;
    }
  }

  return chunks;
}
