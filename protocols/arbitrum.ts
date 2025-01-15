import { balance } from "../adapters/balance";
import { latest } from "../adapters/balance";
import { manualCliff, manualLinear, manualStep } from "../adapters/manual";
import { Protocol } from "../types/adapters";
import { periodToSeconds } from "../utils/time";

const start = 1679533271;
const qty = 10000000000;
const qty_advisors = 2694000000;
const qty_investors = 1753000000;
const end_team_investors_1year = 1710550800;
const token = "0x912ce59144191c1204e64559fe8253a0e49e6548";
const chain = "arbitrum";
const arbitrum: Protocol = {
  Airdrop: manualCliff(start, qty * 0.1162),
  Foundation: manualLinear("2023-04-17", "2027-04-17", 75e7),
  "Arbitrum DAO Treasury": () =>
    balance(
      ["0xF3FC178157fb3c87548bAA86F9d24BA38E649B58"],
      token,
      chain,
      "arbitrum",
      1686132532, // no outflows at this time
    ),
  "Advisors Team OffchainLabs": [
    manualCliff(end_team_investors_1year, qty_advisors * 0.25), // 25% cliff after 1 year
    manualStep(
      end_team_investors_1year,
      periodToSeconds.month,
      36,
      (qty_advisors * 0.75) / 36,
    ), // monthly steps for the next 3 years
  ],
  Investors: [
    manualCliff(end_team_investors_1year, qty_investors * 0.25), // 25% cliff after 1 year
    manualStep(
      end_team_investors_1year,
      periodToSeconds.month,
      36,
      (qty_investors * 0.75) / 36,
    ), // monthly steps for the next 3 years
  ],
  meta: {
    token: `${chain}:${token}`,
    sources: [
      "https://docs.arbitrum.foundation/airdrop-eligibility-distribution#initial-token-allocation--airdrop-distribution",
    ],
    protocolIds: ["2785"],
    total: qty,
    incompleteSections: [
      {
        key: "Arbitrum DAO Treasury",
        allocation: qty * 0.4278,
        lastRecord: () => latest("arbitrum", 1686132532), // no outflows at this time
      },
    ],
  },
  categories: {
    insiders: ["Investors", "Advisors Team OffchainLabs"],
    noncirculating: ["Arbitrum DAO Treasury", "Ecosystem Development Fund"],
    airdrop: ["Airdrop"],
  },
};

export default arbitrum;
