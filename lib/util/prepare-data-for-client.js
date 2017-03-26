module.exports = (allChampionData, championMasteriesOfSummoner) => {
  return {
    version: allChampionData.version,
    champions: Object.keys(allChampionData.data).map((championId) => {
      const masteryInfo = championMasteriesOfSummoner.find(mastery => mastery.championId === parseInt(championId))
      return Object.assign(
        {},
        allChampionData.data[championId],
        masteryInfo || {chestGranted: false}
      )
    })
  }
}
