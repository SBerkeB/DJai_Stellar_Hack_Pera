const STELLAR_LEDGERS_DATA_URL =
  "https://horizon.stellar.org/ledgers?order=desc&limit=120";

export interface Weights {
  genre_lofi_ambient?: number;
  genre_synthwave?: number;
  mood_chill?: number;
  mood_energetic?: number;
  tech_energy?: number;
  tech_tempo?: number;
  tech_bass?: number;
  instr_ambient_pads?: number;
  instr_drums_focus?: number;
}
const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const scale01To60_200 = (value: number) => {
  return 60 + value * (200 - 60);
};

export const getStellarLedgersData = async () => {
  const ledgers = await fetch(STELLAR_LEDGERS_DATA_URL);
  const ledgersData = await ledgers.json();
  return ledgersData;
};
export const createStellarWeights = async (): Promise<Weights> => {
  const ledgersData = await getStellarLedgersData();
  const records = ledgersData._embedded.records;

  let totalSuccess = 0;
  let totalFailed = 0;
  let totalOpCount = 0;
  let totalTxSetOpCount = 0;
  let totalCoinsSum = 0;

  for (const ledger of records) {
    totalSuccess += ledger.successful_transaction_count;
    totalFailed += ledger.failed_transaction_count;
    totalOpCount += ledger.operation_count;
    totalTxSetOpCount += ledger.tx_set_operation_count;
    totalCoinsSum += parseFloat(ledger.total_coins);
  }

  const avgSuccessRatio = totalSuccess / (totalSuccess + totalFailed);
  const avgCapacityUsage = totalOpCount / totalTxSetOpCount;
  const avgTotalCoins = totalCoinsSum / records.length;

  const weights: Weights = {};

  // Map average capacity usage to energy/mood/genre
  if (avgCapacityUsage > 0.75) {
    weights.mood_energetic = 0.9;
    weights.genre_synthwave = 0.7;
    weights.tech_energy = 0.9;
    weights.instr_drums_focus = 0.8;
  } else if (avgCapacityUsage < 0.4) {
    weights.mood_chill = 0.9;
    weights.genre_lofi_ambient = 0.8;
    weights.tech_tempo = 0.3;
    weights.instr_ambient_pads = 0.9;
  } else {
    weights.mood_chill = 0.5;
    weights.mood_energetic = 0.5;
    weights.genre_synthwave = 0.5;
    weights.tech_tempo = 0.6;
  }

  // Adjust by average success ratio
  if (avgSuccessRatio > 0.8) {
    weights.tech_energy = clamp((weights.tech_energy ?? 0.5) + 0.2);
    weights.mood_energetic = clamp((weights.mood_energetic ?? 0.5) + 0.2);
  } else if (avgSuccessRatio < 0.6) {
    weights.tech_tempo = clamp((weights.tech_tempo ?? 0.5) * 0.8);
    weights.mood_chill = clamp((weights.mood_chill ?? 0.5) + 0.2);
  }

  // Use average total coins to influence bass or pads
  if (avgTotalCoins > 1e11) {
    weights.tech_bass = 0.7;
  } else {
    weights.instr_ambient_pads = clamp(
      (weights.instr_ambient_pads ?? 0.5) + 0.2
    );
  }

  // Clamp all weights to [0, 1]
  Object.keys(weights).forEach((key) => {
    const k = key as keyof Weights;
    weights[k] = clamp(weights[k]!);
  });

  console.log("Mapped Weights (Averaged):", weights);
  return weights;
};
