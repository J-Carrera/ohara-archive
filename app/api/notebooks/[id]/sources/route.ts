import { NextRequest, NextResponse } from "next/server";

import { getChunksForNotebook } from "@/lib/rag/repository/vectorRepository";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: notebookId } = await params;

    const chunks = await getChunksForNotebook(notebookId);

    // Convert chunks into unique sources
    const sourcesMap = new Map();

    for (const chunk of chunks) {
      if (!sourcesMap.has(chunk.sourceId)) {
        sourcesMap.set(chunk.sourceId, {
          id: chunk.sourceId,
          notebookId,

          title: chunk.title,
          url: chunk.url,

          preview: chunk.text.substring(0, 250),

          text: "",

          chunks: [],

          wordCount: 0,
          characterCount: 0,
          chunkCount: 0,

          status: "indexed",

          createdAt: "",
        });
      }

      const source = sourcesMap.get(chunk.sourceId);

      source.chunks.push({
        id: chunk.chunkIndex,
        text: chunk.text,
      });

      source.chunkCount++;
    }

    return NextResponse.json({
      success: true,
      sources: Array.from(sourcesMap.values()),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load notebook sources.",
      },
      {
        status: 500,
      },
    );
  }
}
