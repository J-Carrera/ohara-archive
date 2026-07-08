export type SourceStatus = "pending" | "processing" | "indexed" | "failed";

export interface Chunk {
  id: number;
  text: string;
}

export interface Source {
  id: string;

  url: string;

  title: string;

  preview: string;

  text: string;

  chunks: Chunk[];

  wordCount: number;

  characterCount: number;

  chunkCount: number;

  status: SourceStatus;

  createdAt: string;
}
