export default function rank_calc(tier, rank, lp) {
  let rank_all = 0;
  switch (tier) {
    case "CHALLENGER":
      rank_all += 90000;
      break;
    case "GRANDMASTER":
      rank_all += 80000;
      break;
    case "MASTER":
      rank_all += 70000;
      break;
    case "DIAMOND":
      rank_all += 60000;
      break;
    case "PLATINUM":
      rank_all += 50000;
      break;
    case "GOLD":
      rank_all += 40000;
      break;
    case "SILVER":
      rank_all += 30000;
      break;
    case "BRONZE":
      rank_all += 20000;
      break;
    case "IRON":
      rank_all += 10000;
      break;
    case "Unranked":
      rank_all += 0;
      break;
    default:
      console.log("Error in calc");
      break;
  }
  switch (rank) {
    case "I":
      rank_all += 4000;
      break;
    case "II":
      rank_all += 3000;
      break;
    case "III":
      rank_all += 2000;
      break;
    case "IV":
      rank_all += 1000;
      break;
    case "":
      rank_all += 0;
      break;
    default:
      console.log("Error in calc");
      break;
  }

  rank_all += lp != parseInt(lp) ? 0 : lp;

  return rank_all;
}
