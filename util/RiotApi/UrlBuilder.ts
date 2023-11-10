export class RiotApiUrlBuilder {
    private baseUrl: string;
  
    constructor(apiRegion: string, apiKey: string) {
      this.baseUrl = `https://${apiRegion}.api.riotgames.com`;
      this.apiKey = apiKey;
    }
  
    private apiKey: string;
  
    buildSummonerUrl(username: string): string {
      return `${this.baseUrl}/lol/summoner/v4/summoners/by-name/${username}?api_key=${this.apiKey}`;
    }
  
    buildRankUrl(id: string): string {
      return `${this.baseUrl}/lol/league/v4/entries/by-summoner/${id}?api_key=${this.apiKey}`;
    }
  
    buildChampionMasteryUrl(uId: string): string {
      return `${this.baseUrl}/lol/champion-mastery/v4/champion-masteries/by-summoner/${uId}?api_key=${this.apiKey}`;
    }
  }
  
  // Example usage
//   const apiRegion = "euw1";
//   const apiKey = "your_api_key";
//   const urlBuilder = new RiotApiUrlBuilder(apiRegion, apiKey);
  
//   const summonerUrl = urlBuilder.buildSummonerUrl("summonerName");
//   const rankUrl = urlBuilder.buildRankUrl("summonerId");
//   const masteryUrl = urlBuilder.buildChampionMasteryUrl("userId");
  