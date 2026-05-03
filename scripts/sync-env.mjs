import { copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "../moltbot_clipai/.env");
const target = resolve(root, ".env.local");

if (!existsSync(source)) {
  console.error(`Missing source env file: ${source}`);
  process.exit(1);
}

copyFileSync(source, target);
console.log(`Copied API configuration to ${target}`);
console.log("Secrets were not printed. .env.local is ignored by git.");
