import { NextResponse } from "next/server";
import { retrieveRelevantChunks } from "@/lib/rag/retriever";

export async function GET() {
  const results = await retrieveRelevantChunks("What is the strongest lion");

  return NextResponse.json(results);
}
