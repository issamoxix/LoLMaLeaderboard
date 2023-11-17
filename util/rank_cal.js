export default function rank_calc(tier, rank, lp) {
  const tierValues = {
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

  const rankValues = {
    "I": 4000,
    "II": 3000,
    "III": 2000,
    "IV": 1000,
    "": 0,
  };

  const tierValue = tierValues[tier] || 0;
  const rankValue = rankValues[rank] || 0;
  const lpValue = isNaN(parseInt(lp)) ? 0 : parseInt(lp);

  return tierValue + rankValue + lpValue;
}
