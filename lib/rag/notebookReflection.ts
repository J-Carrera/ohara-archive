import { generateAnswer } from "./ollama";

export interface ReflectionResult {
  notes: string[];
  openQuestions: string[];
  summary: string;
}

export async function reflectOnResearch(
  question: string,
  answer: string,
): Promise<ReflectionResult> {
  const prompt = `
You are organizing research notes.

Given the user's question and the AI's answer, return ONLY valid JSON.

Do not include markdown.

Do not wrap the JSON in triple backticks.

Do not explain anything.

Do not include any text before or after the JSON.

Format:

{
  "notes": [
    "...",
    "...",
    "..."
  ],
  "openQuestions": [
    "..."
  ],
  "summary": "One sentence summarizing what was learned."
}

Rules:

- notes should contain only important factual information.
- Do not repeat the question.
- If there are no open questions, return an empty array.
- Return ONLY JSON.

Question:
${question}

Answer:
${answer}
`;

  const response = await generateAnswer(prompt);

  try {
    let cleaned = cleanJson(response);

    // Local models sometimes forget the final closing brace.
    if (!cleaned.trim().endsWith("}")) {
      cleaned += "\n}";
    }

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Reflection parse error:", error);

    console.log("Original Reflection Response:");
    console.log(response);

    return {
      notes: [],
      openQuestions: [],
      summary: "",
    };
  }
}

function cleanJson(text: string): string {
  // Remove markdown fences if present
  text = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // Keep only the JSON object
  const start = text.indexOf("{");

  if (start !== -1) {
    text = text.substring(start);
  }

  return text.trim();
}
