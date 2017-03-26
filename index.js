require('dotenv').config()
const Koa = require('koa')
const serve = require('koa-static')
const logger = require('koa-log')
const URL = require('url').URL
const path = require('path')

const getRegion = require('./lib/riot/regions')
const riotApi = require('./lib/riot/api')(process.env.RIOT_API_KEY)
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
  const summonerId = await riotApi.getSummonerIdForName(region, summonerName)
  const location = getRegion(region).location
  const championMasteries = await riotApi.getSummonerChampionInfo(location, summonerId)
  const allChampions = await riotApi.getAllChampions(region)

  ctx.body = prepareDataForClient(allChampions, championMasteries)
})

app.listen(PORT)
console.log(`Started: http://localhost:${PORT}`)
