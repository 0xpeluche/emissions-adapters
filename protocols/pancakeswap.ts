import { CliffAdapterResult, LinearAdapterResult, Protocol } from "../types/adapters";
import { queryDune } from "../utils/dune";


const emissions = async (type: string): Promise<CliffAdapterResult[]> => {
  const result: CliffAdapterResult[] = [];
  const issuanceData = await queryDune("5057582")
  if(type == "burn"){
    for (let i = 0; i < issuanceData.length - 1; i++) {
    result.push({
      type: "cliff",
      start: issuanceData[i].day,
      amount: -issuanceData[i].total_burned
    })
  }
    return result;
  }else{
  for (let i = 0; i < issuanceData.length - 1; i++) {
    result.push({
      type: "cliff",
      start: issuanceData[i].day,
      amount: issuanceData[i].total_minted
    })
  }
  return result;
}
}

const pancakeswap: Protocol = {
    "Emissions": [emissions("mint"), emissions("burn")],
    meta: {
        sources: [
            "https://docs.pancakeswap.finance/protocol/cake-tokenomics",
            "https://dune.com/pancakeswap/PancakeSwap-CAKE-Tokenomics"
        ],
        token: `bsc:0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82`,
        protocolIds: ["parent#pancakeswap"],
        notes: [
            "This chart shows the change in circulating supply over time, calculated from net emissions (minted minus burned tokens) starting from an initial supply.",
            "CAKE have maximum supply of 450 million tokens.",
        ],
    },
    categories: {
        farming: ["Emissions"],
        noncirculating: ["Special Emissions"]
    },
};

export default pancakeswap;
