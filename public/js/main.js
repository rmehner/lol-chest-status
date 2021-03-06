/* global XMLHttpRequest, localStorage, form, region, summonerName, result */
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

const spriteStyleForChampion = (champion, version) => {
  const spriteUrl = `//ddragon.leagueoflegends.com/cdn/${version}/img/sprite/${champion.image.sprite}`
  return `background: url(${spriteUrl}) -${champion.image.x}px -${champion.image.y}px`
}

const displayResult = (data) => {
  const champions = sortChampions(data.champions)
  const version = data.version

  const list = champions.map((champion) => {
    const className = champion.chestGranted ? 'chest-granted' : 'no-chest-granted'
    return `
      <li class="${className}">
        <img
          class="champion-sprite margin_right_small"
          src="/img/spacer.gif"
          style="${spriteStyleForChampion(champion, version)}"
          alt="${champion.name} chest granted: ${champion.chestGranted ? 'Yes' : 'No'}"
        />
        ${champion.name}
      </li>
    `
  })

  result.innerHTML = `<ul>${list.join('\n')}</ul>`
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  if (region.value.length === 0 || summonerName.value.length === 0) {
    result.innerHTML = 'Please enter both summonerName and region'
    return
  }

  // spinner ¯\_(ツ)_/¯
  result.innerHTML = '<marquee width=200>Loading</marquee>'

  try {
    localStorage.setItem('summonerName', summonerName.value)
    localStorage.setItem('region', region.value)
  } catch (e) {
    console.error(e)
  }

  const request = new XMLHttpRequest()
  request.open('GET', `/api/summoner?region=${region.value}&name=${summonerName.value}`)
  request.onload = () => {
    if (request.status < 200 || request.status > 300) {
      result.innerHTML = 'Sorry, something went wrong :/ Check console output.'
      console.error(request)
      return
    }

    try {
      const data = JSON.parse(request.responseText)
      displayResult(data)
    } catch (e) {
      result.innerHTML = 'Could not parse response data'
      console.error(e, request)
    }
  }
  request.send()
})
