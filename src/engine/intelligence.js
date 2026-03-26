// src/engine/intelligence.js

function groupByToken(transactions) {
  const map = {};
  transactions.forEach(tx => {
    if (!map[tx.token]) map[tx.token] = [];
    map[tx.token].push({
      token: tx.token,
      wallet: tx.wallet,
      amount: Number(tx.amount || tx.value || tx.amount_usd || tx.volume || 0),
      timestamp: Number(tx.timestamp || tx.time || Date.now())
    });
  });
  return map;
}

function buildWalletStats(tokenTxns) {
  const wallets = {};

  tokenTxns.forEach(tx => {
    if (!wallets[tx.wallet]) {
      wallets[tx.wallet] = {
        address: tx.wallet,
        totalVolume: 0,
        txCount: 0,
        repeatBuys: false,
        earlyBuyer: false,
        score: 0
      };
    }

    wallets[tx.wallet].totalVolume += tx.amount;
    wallets[tx.wallet].txCount += 1;
  });

  Object.values(wallets).forEach(w => {
    if (w.txCount >= 2) w.repeatBuys = true;
  });

  return wallets;
}

function scoreWallet(wallet, tokenTxns) {
  let score = 0;

  if (wallet.totalVolume >= 50000) score += 3;
  else if (wallet.totalVolume >= 20000) score += 2;
  else if (wallet.totalVolume >= 10000) score += 1;

  if (wallet.txCount >= 5) score += 2;
  else if (wallet.txCount >= 3) score += 1;

  if (wallet.repeatBuys) score += 2;

  const sorted = [...tokenTxns].sort((a, b) => a.timestamp - b.timestamp);
  const firstBuyers = sorted.slice(0, 5).map(t => t.wallet);

  if (firstBuyers.includes(wallet.address)) {
    score += 3;
    wallet.earlyBuyer = true;
  }

  return Math.min(score, 10);
}

function detectAccumulation(tokenTxns) {
  const sorted = [...tokenTxns].sort((a, b) => a.timestamp - b.timestamp);

  const buyerCounts = {};
  let accumulationWallets = 0;

  sorted.forEach(tx => {
    if (!buyerCounts[tx.wallet]) buyerCounts[tx.wallet] = 0;
    buyerCounts[tx.wallet]++;
  });

  Object.values(buyerCounts).forEach(count => {
    if (count >= 2) accumulationWallets++;
  });

  const isAccumulating =
    accumulationWallets >= 2 && tokenTxns.length >= 4;

  return {
    isAccumulating,
    accumulationWallets,
    buyerCounts
  };
}

function generateReason(token) {
  const reasons = [];

  if (token.smartWalletCount >= 2)
    reasons.push("Multiple smart wallets accumulating");

  if (token.accumulation?.isAccumulating)
    reasons.push("Repeated accumulation pattern detected");

  if (token.totalVolume >= 10000)
    reasons.push("High transaction volume");

  if (token.uniqueBuyers >= 4)
    reasons.push("Broad buyer participation");

  if (token.topWalletScore >= 8)
    reasons.push("High-quality smart wallet detected");

  if (reasons.length === 0)
    reasons.push("No strong signal yet");

  return reasons;
}

export function analyzeTokens(data) {
  return data.map(token => {

    const reasons = [];

    if (token.smartMoneyInterest >= 2) {
      reasons.push("Smart money actively buying");
    }

    if (token.totalVolume >= 10000) {
      reasons.push("High trading volume");
    }

    if (token.uniqueBuyers >= 4) {
      reasons.push("Strong buyer participation");
    }

    if (token.avgBuySize >= 2000) {
      reasons.push("Large average buy size");
    }

    if (reasons.length === 0) {
      reasons.push("No strong signal yet");
    }

    // 🔥 CONFIDENCE
    const confidence =
      (token.smartMoneyInterest * 15) +
      (token.totalVolume >= 10000 ? 25 : 0) +
      (token.uniqueBuyers >= 4 ? 20 : 0) +
      (token.avgBuySize >= 2000 ? 15 : 0);

    const finalConfidence = Math.min(confidence, 100);

    // 🔥 WAJIB RETURN
    return {
      token: token.token,
      totalVolume: token.totalVolume,
      uniqueBuyers: token.uniqueBuyers,
      smartWalletCount: token.smartMoneyInterest,
      topWalletScore: token.avgBuySize / 1000,
      accumulation: {
        isAccumulating: token.smartMoneyInterest >= 2,
        accumulationWallets: token.smartMoneyInterest
      },
      wallets: [],
      reasons,
      confidence: finalConfidence
    };

  });
}