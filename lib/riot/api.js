const fetch = require('node-fetch')
const API_BASE_HOST = 'https://euw.api.pvp.net'

module.exports = (apiKey) => {
  if (!apiKey) {
    throw new Error('You must set the API key. Make sure to have RIOT_API_KEY in your environment.')
  }

  return {
    async getSummonerIdForName (region, summonerName) {
      const response = await fetch(`${API_BASE_HOST}/api/lol/${region}/v1.4/summoner/by-name/${summonerName}?api_key=${apiKey}`)
      const json = await response.json()

      // we only support a single summoner lookup for now, so the first one is the right one
      const summonerKey = Object.keys(json)[0]
      return json[summonerKey].id
    },

    async getSummonerChampionInfo (location, summonerId) {
      const response = await fetch(`${API_BASE_HOST}/championmastery/location/${location}/player/${summonerId}/champions?api_key=${apiKey}`)
      return await response.json()
    },

    async getAllChampions (region) {
      const response = await fetch(`https://global.api.pvp.net/api/lol/static-data/${region}/v1.2/champion?api_key=${apiKey}&dataById=true`)
      return await response.json()
    }
  }
}
