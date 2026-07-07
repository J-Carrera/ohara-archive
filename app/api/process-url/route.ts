import { NextRequest, NextResponse } from "next/server";
import { extractArticle } from "@/lib/rag/scraper";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  const article = await extractArticle(url);

  return NextResponse.json(article);
}
