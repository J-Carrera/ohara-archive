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
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
}

export async function retrieveRelevantChunks(
  question: string,
  topK: number = 5,
): Promise<RetrievalResult> {
  // Create an embedding for the user's question
  const questionEmbedding = await createEmbedding(question);

  // Load every indexed chunk
  const chunks = await getAllChunks();

  // Calculate similarity score for every chunk
  const scoredChunks = chunks
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(questionEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    // Ignore obviously unrelated chunks
    .filter((item) => item.score > 0.2)
    .slice(0, topK);

  const retrievedChunks: RetrievedChunk[] = scoredChunks.map(
    ({ chunk, score }) => ({
      title: chunk.title,
      text: chunk.text,
      url: chunk.url,
      score,
    }),
  );

  // Build one large context string for the LLM
  const context = retrievedChunks
    .map(
      (chunk, index) => `
Source ${index + 1}
Title: ${chunk.title}
URL: ${chunk.url}

${chunk.text}
`,
    )
    .join("\n-----------------------------\n");

  return {
    chunks: retrievedChunks,
    context,
  };
}
