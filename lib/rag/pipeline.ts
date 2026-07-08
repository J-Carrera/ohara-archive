import { extractArticle } from "./scraper";
import { chunkDocument } from "./chunker";
import { Source } from "../types";

export async function processSource(url: string): Promise<Source> {
  const article = await extractArticle(url);

  if (!article.success) {
    throw new Error("Unable to process article.");
  }

  const chunks = chunkDocument(article.text);

  return {
    id: crypto.randomUUID(),

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
