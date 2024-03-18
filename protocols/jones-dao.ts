import { manualCliff, manualLinear } from "../adapters/manual";
import { Protocol } from "../types/adapters";
import { periodToSeconds } from "../utils/time";
import { balance, latest } from "../adapters/balance";

const start = 1642896000;
const qty = 10000000;
const timestampDeployed = 1643500800;
const token = "0x10393c20975cf177a3513071bc110f7962cd67da";

const jonesDao: Protocol = {
  "Operations & Incentives": () =>
    balance(
      ["0xFa82f1bA00b0697227E2Ad6c668abb4C50CA0b1F"],
      token,
      "arbitrum",
      "jones-dao",
      timestampDeployed,
    ),
  "Core contributors": manualLinear(
    start,
    start + periodToSeconds.month * 18,
    qty * 0.12,
  ),
  "Public sale": manualCliff(start, qty * 0.17),
  "Private sale": [
    manualCliff(start + periodToSeconds.month * 3, (qty * 0.1297) / 3),
    manualLinear(
      start + periodToSeconds.month * 3,
      start + periodToSeconds.month * 9,
      (qty * 0.1297 * 2) / 3,
    ),
  ],
  Airdrop: manualCliff(start, qty * 0.01),
  //   Olympus: manualCliff(start, qty * 0.033),
  meta: {
    sources: ["https://docs.jonesdao.io/jones-dao/jones-token/tokenomics"],
    token: `arbitrum:${token}`,
    notes: [
      `OlympusDAO's allocation is to be held in perpetuity (effectively burnt) so it has been excluded from our analysis.`,
    ],
    protocolIds: ["1433"],
    total: qty,
    incompleteSections: [
      {
        key: "Operations & Incentives",
        allocation: qty * 0.57,
        lastRecord: () => latest("jones-dao", timestampDeployed),
      },
    ],
  },
  categories: {
    insiders: ["Core contributors", "Private sale"],
    airdrop: ["Airdrop"],
    publicSale: ["Public sale"],
  },
};
export default jonesDao;
