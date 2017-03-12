// https://developer.riotgames.com/docs/regional-endpoints
const regions = {
  'BR': {
    location: 'BR',
    host: 'br.api.pvp.net'
  },
  'EUNE': {
    location: 'EUN1',
    host: 'eune.api.pvp.net'
  },
  'EUW': {
    location: 'EUW1',
    host: 'euw.api.pvp.net'
  },
  'JP': {
    location: 'JP1',
    host: 'jp.api.pvp.net'
  },
  'KR': {
    location: 'KR',
    host: 'kr.api.pvp.net'
  },
  'LAN': {
    location: 'LA1',
    host: 'lan.api.pvp.net'
  },
  'LAS': {
    location: 'LAS',
    host: 'las.api.pvp.net'
  },
  'NA': {
    location: 'NA1',
    host: 'na.api.pvp.net'
  },
  'OCE': {
    location: 'OC1',
    host: 'oce.api.pvp.net'
  },
  'TR': {
    location: 'TR1',
    host: 'tr.api.pvp.net'
  },
  'RU': {
    location: 'RU',
    host: 'ru.api.pvp.net'
  },
  'PBE': {
    location: 'PBE',
    host: 'pbe.api.pvp.net'
  }
}

module.exports = function getRegion (regionCode) {
  regionCode = String(regionCode).toUpperCase()
  if (regions[regionCode]) return regions[regionCode]

  throw new Error(`Cannot find region ${regionCode}`)
}
