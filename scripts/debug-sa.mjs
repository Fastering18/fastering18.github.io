import { readFileSync, existsSync } from "fs";

const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "";
const localPath = ".private/blackerz-416717-60247203b699.json";
const local = existsSync(localPath) ? readFileSync(localPath, "utf8") : "";

console.log("env len", raw.length, "local len", local.length);
console.log("env has BEGIN", raw.includes("BEGIN PRIVATE KEY"));
console.log("env has real newlines in key area", /PRIVATE KEY-----\r?\n/.test(raw));
console.log("env has \\n escapes", raw.includes("\\n"));

// Count quotes
const quotes = (raw.match(/"/g) || []).length;
console.log("double quotes count", quotes, "even?", quotes % 2 === 0);

// Try fixing common vercel/env issues
const candidates = [
  ["raw", raw],
  ["trim", raw.trim()],
  ["unwrap single layer stringified", (() => { try { return JSON.parse(raw); } catch { return null; } })()],
];

// If the whole thing was double-encoded as a JSON string
try {
  const once = JSON.parse(raw);
  if (typeof once === "string") {
    console.log("double-encoded string, len", once.length);
    const obj = JSON.parse(once);
    console.log("double decode ok", obj.client_email);
  } else if (once?.client_email) {
    console.log("direct parse ok", once.client_email);
  }
} catch (e) {
  console.log("direct:", e.message);
}

// Fix unescaped newlines inside private_key value
try {
  // replace actual newlines that appear between quotes incorrectly
  let fixed = raw.trim();
  // If private_key has real newlines, re-escape them
  fixed = fixed.replace(
    /("private_key"\s*:\s*")([\s\S]*?)("\s*,\s*"client_email")/,
    (_m, a, key, b) => a + key.replace(/\r?\n/g, "\\n").replace(/\\n/g, "\\n") + b
  );
  // simpler: escape all real newlines that aren't already part of \n
  // Actually for JSON, real newlines in strings are invalid. Escape them:
  let inString = false;
  let escaped = "";
  for (let i = 0; i < fixed.length; i++) {
    const c = fixed[i];
    const prev = fixed[i - 1];
    if (c === '"' && prev !== "\\") inString = !inString;
    if (inString && c === "\n") escaped += "\\n";
    else if (inString && c === "\r") continue;
    else escaped += c;
  }
  const obj = JSON.parse(escaped);
  console.log("escaped-newlines parse ok", obj.client_email);
  console.log("project", obj.project_id);
} catch (e) {
  console.log("escaped fail", e.message);
  // show around error position if possible
  const m = String(e.message).match(/position\s+(\d+)/i);
  if (m) {
    const pos = Number(m[1]);
    console.log("around", JSON.stringify(raw.slice(Math.max(0, pos - 40), pos + 40)));
  }
}

if (local) {
  try {
    const o = JSON.parse(local);
    console.log("local ok", o.client_email);
  } catch (e) {
    console.log("local fail", e.message);
  }
}
