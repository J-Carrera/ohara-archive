import { Notebook } from "@/lib/types";

import {
  getAllNotebooks,
  saveNotebook,
} from "@/lib/rag/repository/notebookRepository";

export async function listNotebooks(): Promise<Notebook[]> {
  return await getAllNotebooks();
}

export async function createNotebook(
  title: string,
  description: string = "",
): Promise<Notebook> {
  const notebook: Notebook = {
    id: crypto.randomUUID(),

    title,

    description,

    summary: "",

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };

  await saveNotebook(notebook);

  return notebook;
}
