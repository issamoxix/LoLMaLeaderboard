export default function rank_calc(tier: string, rank: string, lp: number | string): number {
  const tierValues: Record<string, number> = {
    "CHALLENGER": 100000,
    "GRANDMASTER": 90000,
    "MASTER": 80000,
    "DIAMOND": 70000,
    "EMERALD": 60000,
    "PLATINUM": 50000,
    "GOLD": 40000,
    "SILVER": 30000,
    "BRONZE": 20000,
    "IRON": 10000,
    "Unranked": 0,
  };

  const rankValues: Record<string, number> = {
    "I": 4000,
    "II": 3000,
    "III": 2000,
    "IV": 1000,
    "": 0,
  };

  const tierValue: number = tierValues[tier] || 0;
  const rankValue: number = rankValues[rank] || 0;
  const lpValue: number = isNaN(parseInt(lp as string)) ? 0 : parseInt(lp as string);

  return tierValue + rankValue + lpValue;
}
