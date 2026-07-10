import fs from "fs/promises";
import path from "path";

import { Notebook } from "@/lib/types";

const DATABASE_DIR = path.join(process.cwd(), "database", "notebooks");

const DB_PATH = path.join(DATABASE_DIR, "notebooks.json");

async function ensureDatabaseExists() {
  await fs.mkdir(DATABASE_DIR, { recursive: true });

  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, "[]");
  }
}

export async function getAllNotebooks(): Promise<Notebook[]> {
  await ensureDatabaseExists();

  const file = await fs.readFile(DB_PATH, "utf8");

  return JSON.parse(file);
}

export async function saveNotebook(notebook: Notebook): Promise<void> {
  const notebooks = await getAllNotebooks();

  notebooks.push(notebook);

  await fs.writeFile(DB_PATH, JSON.stringify(notebooks, null, 2));
}

export async function updateNotebook(updatedNotebook: Notebook): Promise<void> {
  const notebooks = await getAllNotebooks();

  const updated = notebooks.map((notebook) =>
    notebook.id === updatedNotebook.id ? updatedNotebook : notebook,
  );

  await fs.writeFile(DB_PATH, JSON.stringify(updated, null, 2));
}

export async function deleteNotebook(notebookId: string): Promise<void> {
  const notebooks = await getAllNotebooks();

  const filtered = notebooks.filter((notebook) => notebook.id !== notebookId);

  await fs.writeFile(DB_PATH, JSON.stringify(filtered, null, 2));
}
