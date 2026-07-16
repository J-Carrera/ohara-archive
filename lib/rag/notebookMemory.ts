import { Notebook } from "@/lib/types";

import {
  getAllNotebooks,
  updateNotebook,
} from "./repository/notebookRepository";

async function getNotebook(notebookId: string): Promise<Notebook> {
  const notebooks = await getAllNotebooks();

  const notebook = notebooks.find((n) => n.id === notebookId);

  if (!notebook) {
    throw new Error("Notebook not found.");
  }

  return notebook;
}

export async function recordQuestion(
  notebookId: string,
  question: string,
): Promise<void> {
  const notebook = await getNotebook(notebookId);

  const timestamp = new Date().toLocaleString();

  notebook.researchTimeline.push(`Asked: "${question}" (${timestamp})`);

  notebook.updatedAt = new Date().toISOString();

  await updateNotebook(notebook);
}

export async function addResearchNote(
  notebookId: string,
  note: string,
): Promise<void> {
  const notebook = await getNotebook(notebookId);

  notebook.notes.push(note);

  notebook.updatedAt = new Date().toISOString();

  await updateNotebook(notebook);
}

export async function addOpenQuestion(
  notebookId: string,
  question: string,
): Promise<void> {
  const notebook = await getNotebook(notebookId);

  notebook.openQuestions.push(question);

  notebook.updatedAt = new Date().toISOString();

  await updateNotebook(notebook);
}

export async function updateSummary(
  notebookId: string,
  summary: string,
): Promise<void> {
  const notebook = await getNotebook(notebookId);

  notebook.summary = summary;

  notebook.updatedAt = new Date().toISOString();

  await updateNotebook(notebook);
}
