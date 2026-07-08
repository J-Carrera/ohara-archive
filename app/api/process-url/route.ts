import { NextRequest, NextResponse } from "next/server";
import { processSource } from "@/lib/rag/pipeline";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    const source = await processSource(url);

    return NextResponse.json(source);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to process article.",
      },
      {
        status: 500,
      },
    );
  }
}
