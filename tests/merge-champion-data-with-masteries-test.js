const { test } = require('tap')
const mergeChampionDataWithMasteries = require('../lib/util/merge-champion-data-with-masteries')

test('mergeChampionDataWithMasteries', (t) => {
  // data queried from https://developer.riotgames.com/api-methods/#lol-static-data-v1.2
  // with `dataById` set to `true`
  const allChampionData = {
    '17': {
      'name': 'Teemo',
      'id': 17
    },
    '74': {
      'name': 'Heimerdinger',
      'id': 74
    }
  }

  // data queried from https://developer.riotgames.com/api-methods/#championmastery
  const championMasteriesOfSummoner = [
    {
      'championLevel': 5,
      'chestGranted': true,
      'championPoints': 55063,
      'championPointsSinceLastLevel': 33463,
      'playerId': 'PLAYER_ID',
      'championPointsUntilNextLevel': 0,
      'tokensEarned': 0,
      'championId': 17,
      'lastPlayTime': 1490131741000
    }
  ]

  const result = mergeChampionDataWithMasteries(allChampionData, championMasteriesOfSummoner)

  t.test('adds mastery status of the summoner to the champion data', (t) => {
    const teemo = result.find(champion => champion.name === 'Teemo')
    t.ok(teemo.chestGranted)
    t.equal(teemo.championLevel, 5)
    t.equal(teemo.championPoints, 55063)
    t.equal(teemo.championPointsSinceLastLevel, 33463)
    t.equal(teemo.playerId, 'PLAYER_ID')
    t.equal(teemo.championPointsUntilNextLevel, 0)
    t.equal(teemo.tokensEarned, 0)
    t.equal(teemo.championId, 17)
    t.equal(teemo.lastPlayTime, 1490131741000)

    t.end()
  })

  t.test('adds chestGranted to champions the summoner has no mastery for yet', (t) => {
    const heimerdinger = result.find(champion => champion.name === 'Heimerdinger')
    t.notOk(heimerdinger.chestGranted)

    t.end()
  })

  t.end()
})
