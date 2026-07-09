import { extractArticle } from "./scraper";
import { chunkDocument } from "./chunker";
import { createEmbedding } from "./embeddings";
import { Source } from "../types";
import { saveChunks, StoredChunk } from "./repository/vectorRepository";

export async function processSource(url: string): Promise<Source> {
  const article = await extractArticle(url);

  if (!article.success) {
    throw new Error("Unable to process article.");
  }

  const chunks = chunkDocument(article.text);

  const sourceId = crypto.randomUUID();

  const storedChunks: StoredChunk[] = [];

  for (const chunk of chunks) {
    const embedding = await createEmbedding(chunk.text);

    storedChunks.push({
      id: crypto.randomUUID(),

      sourceId,

      title: article.title,

      url,

      chunkIndex: chunk.id,

      text: chunk.text,

      embedding,
    });
  }

  await saveChunks(storedChunks);

  return {
    id: sourceId,

    url,

    title: article.title,

    preview: article.preview,

    text: article.text,

    chunks,

    wordCount: article.text.split(/\s+/).length,

    characterCount: article.text.length,

    chunkCount: chunks.length,

    status: "indexed",

    createdAt: new Date().toISOString(),
  };
}
