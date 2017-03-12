require('dotenv').config()
const Koa = require('koa')
const fetch = require('node-fetch')
const URL = require('url').URL

const app = new Koa()
const PORT = process.env.PORT || 3000

const API_BASE_HOST = 'https://euw.api.pvp.net'

if (!process.env.RIOT_API_KEY) {
  console.error('Cannot find RIOT_API_KEY in environment.')
  process.exit(1)
}

app.use(async function logRequest (ctx, next) {
  console.log(`${ctx.request.method} ${ctx.request.url}`)
  await next()
})

async function getSummonerInfo (region, summonerName) {
  const response = await fetch(`${API_BASE_HOST}/api/lol/${region}/v1.4/summoner/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`)
  return await response.json()
}

async function getSummonerChampionInfo (location, summonerId) {
  const response = await fetch(`${API_BASE_HOST}/championmastery/location/${location}/player/${summonerId}/champions?api_key=${process.env.RIOT_API_KEY}`)
  return await response.json()
}

async function getAllChampions (region) {
  const response = await fetch(`https://global.api.pvp.net/api/lol/static-data/${region}/v1.2/champion?api_key=${process.env.RIOT_API_KEY}`)
  const json = await response.json()

  return Object.keys(json.data).reduce((champions, championName) => {
    const champion = json.data[championName]
    champions[champion.id] = champion.name
    return champions
  }, {})
}

app.use(async function (ctx) {
  const url = new URL(ctx.request.url, 'http://localhost')
  if (url.pathname !== '/api/summoner') {
    return
  }

  const region = url.searchParams.get('region')
  const summonerName = url.searchParams.get('name')
  const summonerInfo = await getSummonerInfo(region, summonerName)
  const championMasteries = await getSummonerChampionInfo('EUW1', summonerInfo[summonerName.toLowerCase()].id)
  const allChampions = await getAllChampions(region)

  ctx.body = championMasteries.map((championMastery) => {
    return {
      champion: allChampions[championMastery.championId],
      chestGranted: championMastery.chestGranted
    }
  })
})

app.on('error', (err, ctx) => console.error('server error', err, ctx))

app.listen(PORT)
console.log(`Started: http://localhost:${PORT}`)
