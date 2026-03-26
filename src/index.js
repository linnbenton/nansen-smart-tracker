import fs from "fs";
import { analyzeTokens } from "./engine/intelligence.js";
import { printToken } from "./utils/formatter.js";

// ambil file dari CLI
const filePath = process.argv[2] || "./data/sample.json";

// validasi file
if (!fs.existsSync(filePath)) {
  console.error(`❌ File not found: ${filePath}`);
  process.exit(1);
}

// baca data
const raw = fs.readFileSync(filePath);
const transactions = JSON.parse(raw);

// jalankan engine baru (3 layer intelligence)
const results = analyzeTokens(transactions);

// tampilkan hasil
console.log("\n🔥 SMART MONEY SIGNAL DETECTION RESULTS\n");

// sort terbaik
results.sort((a, b) => b.confidence - a.confidence);

// print
results.forEach((token, i) => {
  printToken(token, i);
});