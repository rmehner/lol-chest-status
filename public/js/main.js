/* global fetch, localStorage */
const form = document.getElementById('form')
const region = document.getElementById('region')
const summonerName = document.getElementById('summonerName')
const result = document.getElementById('result')

const savedName = localStorage.getItem('summonerName')
if (savedName) summonerName.value = savedName

const savedRegion = localStorage.getItem('region')
if (savedRegion) region.value = savedRegion

const sortChampions = (champions) => {
  return champions.sort((championA, championB) => {
    if (championA.name < championB.name) return -1
    if (championA.name > championB.name) return 1
    return 0
  })
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const spriteStyleForChampion = (champion, version) => {
  const spriteUrl = `//ddragon.leagueoflegends.com/cdn/${version}/img/sprite/${champion.image.sprite}`
  return `background: url(${spriteUrl}) -${champion.image.x}px -${champion.image.y}px`
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  if (region.value.length === 0 || summonerName.value.length === 0) {
    result.innerHTML = 'Please enter both summonerName and region'
    return
  }

  // spinner ¯\_(ツ)_/¯
  result.innerHTML = '<marquee width=200>Loading</marquee>'

  localStorage.setItem('summonerName', summonerName.value)
  localStorage.setItem('region', region.value)

  fetch(`/api/summoner?region=${region.value}&name=${summonerName.value}`)
    .then(checkStatus)
    .then(response => response.json())
    .then((data) => {
      const champions = sortChampions(data.champions)
      const version = data.version

      const list = champions.map((champion) => {
        const className = champion.chestGranted ? 'chest-granted' : 'no-chest-granted'
        return `
          <li class="${className}">
            <img
              class="champion-sprite"
              src="/img/spacer.gif"
              style="${spriteStyleForChampion(champion, version)}"
              alt="${champion.name} chest granted: ${champion.chestGranted ? 'Yes' : 'No'}"
              title="${champion.name} chest granted: ${champion.chestGranted ? 'Yes' : 'No'}"
            />
            ${champion.name}
          </li>
        `
      })

      result.innerHTML = `<ul>${list.join('\n')}</ul>`
    })
    .catch((error) => {
      result.innerHTML = 'Sorry, something went wrong :/ Check console output.'
      console.error(error)
    })
})
