import { NextResponse } from "next/server";

import {
  saveChunks,
  getAllChunks,
} from "@/lib/rag/repository/vectorRepository";

export async function GET() {
  await saveChunks([
    {
      id: crypto.randomUUID(),

      sourceId: "demo",

      title: "Test",

      url: "https://example.com",

      chunkIndex: 0,

      text: "Hello Ohara",

      embedding: [1, 2, 3],
    },
  ]);

  const chunks = await getAllChunks();

  return NextResponse.json(chunks);
}
