import { NextRequest, NextResponse } from "next/server";

import { listNotebooks, createNotebook } from "@/lib/rag/notebookManager";

export async function GET() {
  try {
    const notebooks = await listNotebooks();

    return NextResponse.json({
      success: true,
      notebooks,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load notebooks.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    const notebook = await createNotebook(title);

    return NextResponse.json({
      success: true,
      notebook,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to create notebook.",
      },
      { status: 500 },
    );
  }
}
