/* global fetch, alert */
const submit = document.getElementById('submit')
const region = document.getElementById('region')
const summonerName = document.getElementById('summonerName')
const result = document.getElementById('result')

const sortChampions = (champions) => {
  return champions.sort((championA, championB) => {
    if (championA.name < championB.name) return -1
    if (championA.name > championB.name) return 1
    return 0
  })
}

submit.addEventListener('click', (event) => {
  if (region.value.length === 0 || summonerName.value.length === 0) {
    alert('Please enter both summonerName and region')
    return
  }

  fetch(`/api/summoner?region=${region.value}&name=${summonerName.value}`)
    .then(response => response.json())
    .then(sortChampions)
    .then((champions) => {
      const list = champions.map((champion) => {
        const className = champion.chestGranted ? 'chest-granted' : 'no-chest-granted'
        return `<li class="${className}">${champion.name}</li>`
      })

      result.innerHTML = `<ul>${list.join('\n')}</ul>`
    })
})
