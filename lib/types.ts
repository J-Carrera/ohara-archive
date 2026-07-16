export type SourceStatus = "pending" | "processing" | "indexed" | "failed";

export interface Chunk {
  id: number;
  text: string;
}

export interface Source {
  id: string;

  // NEW
  notebookId: string;

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

export interface StoredChunk {
  id: string;

  // NEW
  notebookId: string;

  sourceId: string;

  title: string;

  url: string;

  chunkIndex: number;

  text: string;

  embedding: number[];
}

export interface Notebook {
  id: string;

  title: string;

  description: string;

  summary: string;

  notes: string[];

  openQuestions: string[];

  researchTimeline: string[];

  createdAt: string;

  updatedAt: string;
}

export interface ConversationMessage {
  id: string;

  notebookId: string;

  role: "user" | "assistant";

  content: string;

  createdAt: string;
}
