export function detectSignals(data) {
  // ambil transaksi di atas $10,000
  const signals = data.filter(tx => tx.value_usd > 10000);

  // warning kalau tidak ada signal
  if (signals.length === 0) {
    console.log("⚠️ No smart money signals detected");
  } else {
    console.log(`✅ Found ${signals.length} potential signals`);
  }

  return signals;
}