export function printToken(token, index) {
console.log("\n====================");
console.log(`#${index + 1} ${token.token}`);

console.log("Volume:", token.totalVolume);
console.log("Buyers:", token.uniqueBuyers);
console.log("Smart Wallets:", token.smartWalletCount);

let label = "❄️ WEAK";
if (token.confidence >= 80) label = "🔥 STRONG";
else if (token.confidence >= 60) label = "⚡ GOOD";

console.log(`Confidence: ${token.confidence}% ${label}`);

console.log("Reasons:");
(token.reasons || []).forEach(r => console.log("-", r));

console.log("====================\n");
}
