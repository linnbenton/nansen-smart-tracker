import fs from "fs";
import { detectSignals } from "./detector.js";

// baca data dari file JSON
const raw = fs.readFileSync("./data/sample.json");
const data = JSON.parse(raw);

// jalankan detector
const signals = detectSignals(data);

// tampilkan hasil akhir
console.log("\n🔥 FINAL SIGNALS:");
console.log(signals);