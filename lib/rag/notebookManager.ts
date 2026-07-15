import crypto from "crypto";

import { Notebook } from "@/lib/types";

import { getAllNotebooks, saveNotebook } from "./repository/notebookRepository";

export async function listNotebooks(): Promise<Notebook[]> {
  return await getAllNotebooks();
}

export async function createNotebook(title: string): Promise<Notebook> {
  const now = new Date().toISOString();

  const notebook: Notebook = {
    id: crypto.randomUUID(),

    title,

    description: "",

    summary: "",

    createdAt: now,

    updatedAt: now,
  };

  await saveNotebook(notebook);

  return notebook;
}
