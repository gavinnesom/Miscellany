import {
  defaultGradingModel,
  gradePrompt,
  sanitizeGradeResult,
  type GradeResult,
  type GraderPayload,
} from "./grading.ts";

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      text?: string;
      type?: string;
    }>;
  }>;
};

export async function gradeWithOpenAI(input: GraderPayload): Promise<GradeResult> {
  if (!input.userAnswer.trim()) {
    return {
      correct: false,
      rating: "again",
      label: "Not quite",
      explanation: "No answer submitted.",
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw Object.assign(new Error("OPENAI_API_KEY is not configured."), { status: 503 });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_GRADING_MODEL || defaultGradingModel,
      input: [
        {
          role: "system",
          content: "You are a strict but fair quiz grader for Gavin's private learning app.",
        },
        {
          role: "user",
          content: gradePrompt(input),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "miscellany_quiz_grade",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              correct: { type: "boolean" },
              rating: { type: "string", enum: ["again", "hard", "good", "easy"] },
              label: { type: "string" },
              explanation: { type: "string" },
            },
            required: ["correct", "rating", "label", "explanation"],
          },
        },
      },
    }),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = result && typeof result === "object" && "error" in result
      ? String((result as { error?: { message?: string } }).error?.message ?? "OpenAI grading failed.")
      : "OpenAI grading failed.";
    throw new Error(message);
  }

  return sanitizeGradeResult(JSON.parse(extractOutputText(result)));
}

function extractOutputText(body: OpenAIResponse) {
  if (typeof body.output_text === "string") return body.output_text;

  for (const item of body.output ?? []) {
    for (const content of item.content ?? []) {
      if (typeof content.text === "string") return content.text;
    }
  }

  throw new Error("OpenAI response did not include grade JSON.");
}
