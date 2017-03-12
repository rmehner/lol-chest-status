/* global fetch, alert */
const submit = document.getElementById('submit')
const region = document.getElementById('region')
const summonerName = document.getElementById('summonerName')
const result = document.getElementById('result')
const spinner = document.getElementById('spinner')

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

const hideSpinner = () => {
  spinner.classList.add('hidden')
}

submit.addEventListener('click', (event) => {
  if (region.value.length === 0 || summonerName.value.length === 0) {
    alert('Please enter both summonerName and region')
    return
  }

  spinner.classList.remove('hidden')

  fetch(`/api/summoner?region=${region.value}&name=${summonerName.value}`)
    .then(checkStatus)
    .then(response => response.json())
    .then(sortChampions)
    .then((champions) => {
      const list = champions.map((champion) => {
        const className = champion.chestGranted ? 'chest-granted' : 'no-chest-granted'
        return `<li class="${className}">${champion.name}</li>`
      })

      result.innerHTML = `<ul>${list.join('\n')}</ul>`
    })
    .catch((error) => {
      alert('Sorry, something went wrong :/')
      console.error(error)
    })
    .then(hideSpinner)
})
