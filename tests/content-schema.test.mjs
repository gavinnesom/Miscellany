import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

test("every authored quiz question uses the complete question schema", () => {
  const files = awaitContentFiles();
  return files.then(async (contentFiles) => {
    const ids = new Set();
    let questionCount = 0;

    for (const file of contentFiles) {
      const markdown = await readFile(file, "utf8");
      const slug = frontMatterValue(markdown, "slug");
      const quizItems = quizBlocks(markdown);

      for (const item of quizItems) {
        questionCount += 1;
        const questionId = item.question_id ?? "";
        assert.ok(questionId, `${file} has a missing question_id`);
        assert.ok(questionId.startsWith(`${slug}:`), `${questionId} should be scoped to ${slug}`);
        assert.ok(item.version, `${questionId} has a missing version`);
        assert.ok(Number.isInteger(Number(item.version)) && Number(item.version) > 0, `${questionId} has an invalid version`);
        assert.ok(item.question, `${questionId} has a missing question`);
        assert.ok(item.answer, `${questionId} has a missing answer`);
        assert.ok(item.rubric, `${questionId} has a missing rubric`);
        assert.equal(ids.has(questionId), false, `${questionId} is duplicated`);
        ids.add(questionId);
      }
    }

    assert.equal(contentFiles.length, 121);
    assert.equal(questionCount, 173);
  });
});

test("spring and shock absorber question distinguishes component roles", async () => {
  const markdown = await readFile("content/engineering-machines/car-suspension-basics.md", "utf8");
  const item = quizBlocks(markdown).find((question) =>
    question.question_id === "car-suspension-basics:different-jobs-spring-shock-absorber-perform"
  );

  assert.ok(item);
  assert.equal(item.version, "2");
  assert.match(item.answer, /spring supports the vehicle/i);
  assert.match(item.answer, /stores and returns energy/i);
  assert.match(item.answer, /shock absorber dissipates/i);
  assert.match(item.answer, /damps oscillation/i);
  assert.match(item.rubric, /spring supports/i);
  assert.match(item.rubric, /shock absorber or damper resists/i);
  assert.match(item.rubric, /only the overall goal of suspension/i);
});

async function awaitContentFiles() {
  const root = path.resolve("content");
  const results = [];
  const stack = [root];

  while (stack.length) {
    const current = stack.pop();
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(fullPath);
      else if (entry.isFile() && entry.name.endsWith(".md")) results.push(fullPath);
    }
  }

  return results.sort();
}

function frontMatterValue(markdown, key) {
  const match = markdown.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, "m"));
  return match?.[1] ?? "";
}

function quizBlocks(markdown) {
  const lines = markdown.split("\n");
  const blocks = [];
  let current = null;
  let inQuiz = false;

  for (const line of lines) {
    if (line === "quiz:") {
      inQuiz = true;
      continue;
    }

    if (inQuiz && /^---$/.test(line)) break;
    if (inQuiz && /^[A-Za-z0-9_]+:/.test(line)) break;
    if (!inQuiz) continue;

    const first = line.match(/^\s{2}-\s+([A-Za-z0-9_]+):\s*(.*)$/);
    if (first) {
      current = {};
      blocks.push(current);
      current[first[1]] = cleanValue(first[2]);
      continue;
    }

    const nested = line.match(/^\s{4}([A-Za-z0-9_]+):\s*(.*)$/);
    if (current && nested) {
      current[nested[1]] = cleanValue(nested[2]);
    }
  }

  return blocks;
}

function cleanValue(value) {
  return value.trim().replace(/^["']|["']$/g, "");
}
