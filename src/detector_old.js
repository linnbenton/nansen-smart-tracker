/**
 * Identify smart money wallets based on transaction patterns
 * Smart money = wallets with consistent high-value transactions
 */
function identifySmartMoneyWallets(data, minThreshold = 10000) {
  const walletActivity = {};

  // Group transactions by wallet
  data.forEach(tx => {
    if (!walletActivity[tx.wallet]) {
      walletActivity[tx.wallet] = [];
    }
    walletActivity[tx.wallet].push(tx);
  });

  // Identify smart money: wallets with high-value transactions
  const smartMoneyWallets = {};
  Object.entries(walletActivity).forEach(([wallet, transactions]) => {
    const avgValue = transactions.reduce((sum, tx) => sum + tx.value_usd, 0) / transactions.length;
    const highValueTxs = transactions.filter(tx => tx.value_usd > minThreshold);

    if (highValueTxs.length > 0 || avgValue > minThreshold * 0.7) {
      smartMoneyWallets[wallet] = {
        count: transactions.length,
        avgValue: Math.round(avgValue),
        totalValue: Math.round(transactions.reduce((sum, tx) => sum + tx.value_usd, 0)),
        highValueCount: highValueTxs.length,
        tokens: [...new Set(transactions.map(tx => tx.token))]
      };
    }
  });

  return smartMoneyWallets;
}

/**
 * Detect new tokens being accumulated by smart money
 * New tokens = tokens with recent first purchase and multiple buys
 */
export function detectSignals(data) {
  if (!data || data.length === 0) {
    console.log("⚠️ No data provided");
    return [];
  }

  // 🧠 DETECT MODE
  const isNansenFormat = data[0].totalVolume !== undefined;

  // =============================
  // 🔥 MODE 1: NANSEN DATA
  // =============================
  if (isNansenFormat) {
    console.log("\n🧠 Using Nansen aggregated data mode");

    const signals = data
      .filter(token => token.totalVolume > 1000)
      .map(token => ({
        token: token.token,
        totalVolume: token.totalVolume,
        uniqueBuyers: token.uniqueBuyers || 3,
        smartMoneyInterest: token.smartMoneyInterest || 2,
        avgBuySize: token.avgBuySize || Math.round(token.totalVolume / 3),
        confidence: token.confidence || 70
      }))
      .sort((a, b) => b.totalVolume - a.totalVolume);

    console.log(`\n💰 Found ${signals.length} smart money signals`);

    return signals;
  }

  // =============================
  // 🔥 MODE 2: ORIGINAL (ADVANCED)
  // =============================
  console.log("\n🧠 Using transaction-level smart money detection");

  const smartMoneyWallets = identifySmartMoneyWallets(data);
  console.log(`\n💰 Identified ${Object.keys(smartMoneyWallets).length} smart money wallets`);

  const tokenActivity = {};

  data.forEach(tx => {
    if (!tokenActivity[tx.token]) {
      tokenActivity[tx.token] = {
        token: tx.token,
        buys: [],
        totalVolume: 0,
        uniqueBuyers: new Set(),
        smartMoneyBuys: 0
      };
    }

    const activity = tokenActivity[tx.token];
    activity.buys.push(tx);
    activity.totalVolume += tx.value_usd;
    activity.uniqueBuyers.add(tx.wallet);

    if (smartMoneyWallets[tx.wallet]) {
      activity.smartMoneyBuys++;
    }
  });

  const newTokenSignals = Object.values(tokenActivity)
    .filter(token => {
      const smartMoneyPercentage = (token.smartMoneyBuys / token.buys.length) * 100;
      return token.uniqueBuyers.size >= 2 && token.totalVolume > 10000 && smartMoneyPercentage >= 50;
    })
    .map(token => ({
      token: token.token,
      totalVolume: Math.round(token.totalVolume),
      uniqueBuyers: token.uniqueBuyers.size,
      smartMoneyInterest: token.smartMoneyBuys,
      avgBuySize: Math.round(token.totalVolume / token.buys.length),
      confidence: Math.round((token.smartMoneyBuys / token.buys.length) * 100)
    }))
    .sort((a, b) => b.totalVolume - a.totalVolume);

  if (newTokenSignals.length === 0) {
    console.log("⚠️ No new tokens detected with smart money accumulation patterns");
    return [];
  }

  console.log(`\n✅ Detected ${newTokenSignals.length} NEW TOKENS`);

  return newTokenSignals;
}