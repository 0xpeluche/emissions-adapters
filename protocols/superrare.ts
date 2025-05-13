import { balance, latest } from "../adapters/balance";
import { manualCliff, manualLinear, manualStep } from "../adapters/manual";
import { Protocol } from "../types/adapters";
import { periodToSeconds } from "../utils/time";

const start = 1629154800;
const qty = 1e9;
const token = "0xba5bde662c17e2adff1075610382b9b691296350";
const chain = "ethereum";

const superrare: Protocol = {
  "Retroactive airdrop": manualCliff(
    start + periodToSeconds.day * 90,
    qty * 0.15,
  ),
  "Community treasury": [
    manualCliff(start, qty * 0.4 * 0.25),
    manualStep(start, periodToSeconds.month, 96, (qty * 0.4 * 0.75) / 96),
  ],
  "Team, Investors, Strategic Partners & Future Contributors": (
    backfill: boolean,
  ) =>
    balance(
      ["0x860a80d33E85e97888F1f0C75c6e5BBD60b48DA9"],
      token,
      chain,
      "superrare",
      start + periodToSeconds.day,
      backfill,
    ),
  documented: {
    replaces: ["Team, Investors, Strategic Partners & Future Contributors"],
    Team: manualLinear(
      start + periodToSeconds.year,
      start + periodToSeconds.year * 4,
      qty * 0.255,
    ),
    Investors: [
      manualCliff(start, qty * 0.145 * 0.25),
      manualLinear(
        start + periodToSeconds.year,
        start + periodToSeconds.year * 4,
        qty * 0.145 * 0.75,
      ),
    ],
  },
  meta: {
    token: `coingecko:superrare`,
    sources: [
      `https://docs.superrare.com/whitepapers/master/the-rare-token/token-distribution`,
      `https://discord.com/channels/666318003972997136/868174870389878865/950417363801624626`,
    ],
    protocolIds: ["3144"],
    total: qty,
    incompleteSections: [
      {
        key: "Team, Investors, Strategic Partners & Future Contributors",
        allocation: 0.35 * qty,
        lastRecord: (backfill: boolean) =>
          latest("superrare", start + periodToSeconds.day, backfill),
      },
    ],
  },
  categories: {
    noncirculating: ["Community treasury"],
    airdrop: ["Retroactive airdrop"],
    privateSale: ["Investors"],
    insiders: [
      "Team",
      "Team, Investors, Strategic Partners & Future Contributors",
    ],
  },
};

export default superrare;
