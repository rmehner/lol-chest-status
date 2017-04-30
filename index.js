require('dotenv').config()
const Koa = require('koa')
const serve = require('koa-static')
const logger = require('koa-log')
const URL = require('url').URL
const path = require('path')

if (typeof process.env.RIOT_API_KEY === 'undefined') {
  console.error('You must set the API key. Make sure to have RIOT_API_KEY in your environment.')
  process.exit(1)
}

const RiotApi = require('./lib/riot/api')
const prepareDataForClient = require('./lib/util/prepare-data-for-client')

const app = new Koa()
const PORT = process.env.PORT || 3000

app.on('error', (err, ctx) => console.error('server error', err, ctx))
app.use(logger())
app.use(serve(path.join(__dirname, 'public')))
app.use(async (ctx) => {
  const url = new URL(ctx.request.url, 'http://localhost')
  if (url.pathname !== '/api/summoner') {
    return
  }

  const region = url.searchParams.get('region')
  const summonerName = url.searchParams.get('name')
  const riotApi = new RiotApi(process.env.RIOT_API_KEY, region)
  const summonerId = await riotApi.getSummonerIdForName(summonerName)
  const championMasteries = await riotApi.getSummonerChampionInfo(summonerId)
  const allChampions = await riotApi.getAllChampions()

  ctx.body = prepareDataForClient(allChampions, championMasteries)
})

app.listen(PORT)
console.log(`Started: http://localhost:${PORT}`)
