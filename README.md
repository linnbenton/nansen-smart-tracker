# 🚀 Nansen Smart Money Tracker

> Smart money signal detector built for the Nansen CLI Challenge — designed to uncover early alpha from on-chain activity.

---

## ✨ Overview

**Nansen Smart Money Tracker** is a lightweight yet powerful tool that analyzes blockchain transaction data to identify **high-value movements**, **smart money behavior**, and **early-stage token accumulation**.

Built with a focus on **signal clarity**, this tool helps surface opportunities before they become obvious to the broader market.

---

## 🔥 Key Features

* 🔍 Detect high-value transactions (**>$10,000**)
* 🧠 Identify smart money wallets based on behavior patterns
* 📈 Discover early token accumulation trends
* ⚡ Dual detection engine:

  * Transaction-level analysis
  * Aggregated Nansen CLI data
* 🏆 Signal ranking with confidence scoring
* 🔗 Works with real Nansen CLI outputs
* 🧩 Modular and easy to extend

---

## 🧠 Detection Engine

The system operates using two complementary approaches:

### 🔹 1. Transaction-Level Mode

Analyzes raw transaction data:

* Groups transactions by wallet
* Tracks accumulation patterns
* Identifies repeat high-value buyers
* Detects early entry into new tokens

👉 Best for: **micro-level alpha detection**

---

### 🔹 2. Nansen Data Mode

Processes aggregated Nansen CLI output:

* Filters tokens by:

  * Total volume
  * Smart money participation
* Scores signals using weighted metrics
* Ranks tokens by confidence level

👉 Best for: **macro-level signal validation**

---

## ▶️ Usage

### 🔸 Run with Default Dataset

```bash
npm start
```

---

### 🔸 Run with Custom Dataset

```bash
node src/index.js data/nansen-output.json
```

You can replace `nansen-output.json` with any compatible dataset.

---

## 📊 Example Output

```bash
🔥 SMART MONEY NEW TOKEN DETECTION RESULTS

1. FAF 🏆 TOP SIGNAL
   Total Volume: $15,000
   Unique Buyers: 5
   Smart Money Buys: 3
   Confidence: 80% (Strong)

2. WOJAK
   Total Volume: $12,820
   Confidence: 75% (Strong)
```

---

## ⚙️ Installation

```bash
git clone https://github.com/linnbenton/nansen-smart-tracker.git
cd nansen-smart-tracker
npm install
```

---

## 📁 Project Structure

```bash
nansen-smart-tracker/
│
├── data/
│   └── nansen-output.json     # Sample dataset
│
├── src/
│   └── index.js               # Core logic
│
├── package.json
└── README.md
```

---

## 🛠 Tech Stack

* **Node.js**
* **Nansen CLI**
* JavaScript (ES6+)

---

## 🧪 How Signals Are Scored

Each token is evaluated based on:

* 💰 Total transaction volume
* 👥 Number of unique buyers
* 🧠 Smart money wallet participation
* 🔁 Repeated accumulation behavior

A confidence score is then generated:

| Score Range | Strength  |
| ----------- | --------- |
| 80%+        | 🔥 Strong |
| 60–79%      | ⚡ Medium  |
| <60%        | ❄️ Weak   |

---

## ⚠️ Disclaimer

This project is for **research and educational purposes only**.

It does **NOT** constitute financial advice.
Always do your own research (DYOR) before making any investment decisions.

---

## ⭐ Support

If you find this project useful:

* ⭐ Star the repository
* 🐦 Share it on Twitter / X
* 🛠 Contribute or suggest improvements

---