module.exports = (allChampionData, championMasteriesOfSummoner) => {
  return Object.keys(allChampionData).map((championId) => {
    const masteryInfo = championMasteriesOfSummoner.find(mastery => mastery.championId === parseInt(championId))
    return Object.assign(
      allChampionData[championId],
      masteryInfo || {chestGranted: false}
    )
  })
}
