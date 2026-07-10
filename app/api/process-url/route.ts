import { NextRequest, NextResponse } from "next/server";
import { processSource } from "@/lib/rag/pipeline";

export async function POST(request: NextRequest) {
  try {
    const { url, notebookId } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "A valid URL is required.",
        },
        { status: 400 },
      );
    }

    if (!notebookId || typeof notebookId !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "A notebook ID is required.",
        },
        { status: 400 },
      );
    }

    const source = await processSource(notebookId, url);

    return NextResponse.json({
      success: true,
      source,
    });
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
