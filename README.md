# Nansen Smart Money Tracker

A smart money signal detector built for the Nansen CLI Challenge.

This tool analyzes on-chain activity to detect high-value transactions and surface early alpha signals based on smart money behavior.

---

## 🚀 Features

- Detects high-value transactions (> $10k)
- Identifies smart money accumulation patterns
- Highlights potential trending tokens
- Supports both simulated and real Nansen data
- Dual-mode detection (transaction-level + aggregated data)

---

## 🧠 How It Works

This project uses two detection modes:

### 🔹 Transaction-Level Mode
- Groups transactions by wallet
- Identifies smart money wallets based on behavior
- Detects new tokens with strong accumulation patterns

### 🔹 Nansen Data Mode
- Uses aggregated data from Nansen CLI
- Filters tokens by volume and smart money activity
- Generates confidence-based signals

---

## 🛠 Tech Stack

- Node.js
- Nansen CLI

---

## 📦 Installation

```bash
git clone https://github.com/linnbenton/nansen-smart-tracker.git
cd nansen-smart-tracker
npm install

## ⚠️ Disclaimer

This tool is for research and educational purposes only.

It does not constitute financial advice. Always do your own research before making any investment decisions.