import { NextRequest, NextResponse } from "next/server";
import { retrieveRelevantChunks } from "@/lib/rag/retriever";
import { generateAnswer } from "@/lib/rag/ollama";

export async function POST(request: NextRequest) {
  try {
    // Read the user's question
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "A valid question is required.",
        },
        { status: 400 },
      );
    }

    // Search the knowledge base
    const retrieval = await retrieveRelevantChunks(question);

    // Nothing relevant found
    if (retrieval.chunks.length === 0) {
      return NextResponse.json({
        success: true,
        answer:
          "I couldn't find any relevant information in the uploaded sources.",
        sources: [],
      });
    }

    // Build the prompt (this will be sent to Ollama next)
    const prompt = `
You are Ohara Archive, an AI research assistant.

Your job is to answer ONLY using the supplied context.

If the answer cannot be found in the context, reply exactly:

"I couldn't find that information in the uploaded sources."

==========================
CONTEXT
==========================

${retrieval.context}

==========================
QUESTION
==========================

${question}

==========================
ANSWER
==========================
`;

    const answer = await generateAnswer(prompt);

    return NextResponse.json({
      success: true,

      answer,

      sources: retrieval.chunks,
    });
  } catch (error) {
    console.error("ASK ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to answer question.",
      },
      { status: 500 },
    );
  }
}
