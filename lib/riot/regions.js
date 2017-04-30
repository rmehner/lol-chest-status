// https://developer.riotgames.com/docs/regional-endpoints
const regions = {
  'BR': {
    platformId: 'BR1',
    host: 'br1.api.riotgames.com'
  },
  'EUNE': {
    platformId: 'EUN1',
    host: 'eun1.api.riotgames.com'
  },
  'EUW': {
    platformId: 'EUW1',
    host: 'euw1.api.riotgames.com'
  },
  'JP': {
    platformId: 'JP1',
    host: 'jp1.api.riotgames.com'
  },
  'KR': {
    platformId: 'KR',
    host: 'kr.api.riotgames.com'
  },
  'LAN': {
    platformId: 'LA1',
    host: 'la1.api.riotgames.com'
  },
  'LAS': {
    platformId: 'LA2',
    host: 'la2.api.riotgames.com'
  },
  'NA': {
    platformId: 'NA1',
    host: 'na1.api.riotgames.com'
  },
  'OCE': {
    platformId: 'OC1',
    host: 'oc1.api.riotgames.com'
  },
  'TR': {
    platformId: 'TR1',
    host: 'tr1.api.riotgames.com'
  },
  'RU': {
    platformId: 'RU',
    host: 'ru.api.riotgames.com'
  },
  'PBE': {
    platformId: 'PBE1',
    host: 'pbe1.api.riotgames.com'
  }
}

module.exports = function getRegion (regionCode) {
  regionCode = String(regionCode).toUpperCase()
  if (regions[regionCode]) return regions[regionCode]

  throw new Error(`Cannot find region ${regionCode}`)
}
