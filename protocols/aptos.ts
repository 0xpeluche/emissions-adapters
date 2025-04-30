import { Protocol } from "../types/adapters";
import { manualCliff, manualStep } from "../adapters/manual";
import { periodToSeconds } from "../utils/time";

const totalQty = 1000000000;
const start = 1662940800;
const aptos: Protocol = {
  community: [
    manualCliff(start, totalQty * 0.125),
    manualStep(
      start,
      periodToSeconds.month,
      120,
      (510217359.767 - totalQty * 0.125) / 120,
    ),
  ],
  "core contributors": [
    manualStep(
      start + periodToSeconds.month * 13,
      periodToSeconds.month,
      6,
      (totalQty * 0.19 * 3) / 48,
    ),
    manualStep(
      start + periodToSeconds.month * 19,
      periodToSeconds.month,
      30,
      (totalQty * 0.19) / 48,
    ),
  ],
  foundation: [
    manualCliff(start, totalQty * 0.005),
    manualStep(start, periodToSeconds.month, 120, (totalQty * 0.16) / 120),
  ],
  investors: [
    manualStep(
      start + periodToSeconds.month * 13,
      periodToSeconds.month,
      6,
      (134782640.233 * 3) / 48,
    ),
    manualStep(
      start + periodToSeconds.month * 19,
      periodToSeconds.month,
      30,
      134782640.233 / 48,
    ),
  ],
  meta: {
    sources: ["https://aptosfoundation.org/currents/aptos-tokenomics-overview"],
    token: "coingecko:aptos",
    protocolIds: ["2725"],
  },
  categories: {
    noncirculating: ["foundation","community"],
    privateSale: ["investors"],
    insiders: ["core contributors"],
  },
};
export default aptos;
