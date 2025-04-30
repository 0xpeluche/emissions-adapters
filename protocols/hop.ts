import { manualCliff, manualLinear } from "../adapters/manual";
import { Protocol } from "../types/adapters";
import { periodToSeconds } from "../utils/time";

const start: number = 1654642800;
const qty: number = 1000000000;

const vesting = (perc: number) => [
  manualCliff(start + periodToSeconds.year, (qty * perc) / 3),
  manualLinear(
    start + periodToSeconds.year,
    start + periodToSeconds.year * 3,
    (qty * perc * 2) / 3,
  ),
];

const hop: Protocol = {
  Airdrop: manualCliff(start, qty * 0.08),
  //   "DAO treasury": 60.5%
  "Initial team": vesting(0.2245),
  //   "Future team": 2.8%
  Investors: vesting(0.0625),
  meta: {
    notes: [
      `allocation to the DAO treasury and future team members (63% of supply combined) has no given emissions schedule, therefore they have been excluded from this analysis.`,
    ],
    sources: ["https://docs.hop.exchange/governance/token-distribution"],
    token: "ethereum:0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
    protocolIds: ["435"],
  },
  categories: {
    airdrop: ["Airdrop"],
    privateSale: ["Investors"],
    insiders: ["Initial team"],
  },
};
export default hop;
