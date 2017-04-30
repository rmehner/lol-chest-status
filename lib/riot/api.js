const fetch = require('node-fetch')
const getRegion = require('./regions')

module.exports = class RiotApi {
  constructor (apiKey, region) {
    this.apiKey = apiKey
    this.apiHost = `https://${getRegion(region).host}`
  }

  async getSummonerIdForName (summonerName) {
    const response = await fetch(`${this.apiHost}/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${this.apiKey}`)
    const json = await response.json()

    return json.id
  }

  async getSummonerChampionInfo (summonerId) {
    const response = await fetch(`${this.apiHost}/lol/champion-mastery/v3/champion-masteries/by-summoner/${summonerId}?api_key=${this.apiKey}`)
    return response.json()
  }

  async getAllChampions () {
    const response = await fetch(`${this.apiHost}/lol/static-data/v3/champions?champListData=image&dataById=true&api_key=${this.apiKey}`)
    return response.json()
  }
}
