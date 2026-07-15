import { createEmbedding } from "./embeddings";
import { getAllChunks } from "./repository/vectorRepository";

export interface RetrievedChunk {
  title: string;
  text: string;
  url: string;
  score: number;
}

export interface RetrievalResult {
  chunks: RetrievedChunk[];
  context: string;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  magA = Math.sqrt(magA);
  magB = Math.sqrt(magB);

  if (magA === 0 || magB === 0) {
    return 0;
  }

  return dot / (magA * magB);
}

export async function retrieveRelevantChunks(
  notebookId: string,
  question: string,
  topK = 5,
): Promise<RetrievalResult> {
  const questionEmbedding = await createEmbedding(question);

  const allChunks = await getAllChunks();

  // ⭐ NEW: only search inside this notebook
  const notebookChunks = allChunks.filter(
    (chunk) => chunk.notebookId === notebookId,
  );

  const scored = notebookChunks
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(questionEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 0.2)
    .slice(0, topK);

  const retrievedChunks: RetrievedChunk[] = scored.map(({ chunk, score }) => ({
    title: chunk.title,
    text: chunk.text,
    url: chunk.url,
    score,
  }));

  const context = retrievedChunks
    .map(
      (chunk, index) => `
Source ${index + 1}

Title: ${chunk.title}

URL: ${chunk.url}

${chunk.text}
`,
    )
    .join("\n-------------------------\n");

  return {
    chunks: retrievedChunks,
    context,
  };
}
