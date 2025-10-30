const $circle = document.querySelector('#circle')
const $score = document.querySelector('#score')
const $reset = document.querySelector('#reset')
const $power = document.querySelector('#power')
const $auto = document.querySelector('#auto')
const $interval = document.querySelector('#interval')
const $price1 = document.querySelector('#price1')
const $price2 = document.querySelector('#price2')
const $price3 = document.querySelector('#price3')
const $speed = document.querySelector('#speed')
const $level = document.querySelector('#level')
const $trueLevel = document.querySelector('#true-level')
const $dark = document.querySelector('#dark')

const $list = document.querySelector('#list')
const $userLevel = document.querySelector('.user-level')
const $userStat = document.querySelector('.user-statistic')
const $stanChars = document.querySelectorAll('.stan')
const $unicChars = document.querySelectorAll('.unic')

// const tg = window.Telegram.WebApp
// const user = tg.initDataUnsafe.user

const images = ['frog', 'lizzard', 'snake', 'tourtle', 'snake3', 'toad', 'snake2', 'lizzard2', 'frog2', 'tourtle2']

let coef = 1.15

function start() {
  setScore(getScore())
  setPower(getPower())
  setAutoclicks(getAutoclicks())
  setInter(getInter())
  setPrice1(getPrice1())
  setPrice2(getPrice2())
  setPrice3(getPrice3())
  setSpeed(getSpeed())
  setLevel(getLevel())
  setChanger(getChanger())
  setCharacters()

  
  setInterval(() => {
    setScore(getScore() + getAutoclicks())
  }, getInter())
  setInterval(() => {
    if (getScore() >= getPrice1()) $power.style.background = '#0c3b8c'
    else $power.style.background = '#46484c'
    if (getScore() >= getPrice2()) $auto.style.background = '#0c3b8c'
    else $auto.style.background = '#46484c'
    if (getScore() >= getPrice3()) $interval.style.background = '#0c3b8c'
    else $interval.style.background = '#46484c'

    setImage(getScore())
    changeLevel()
    changeSpeed()
  }, 100);
}

function setScore(score) {
  localStorage.setItem('score', score)
  $score.textContent = score
}

function setPower(power) {
  localStorage.setItem('power', power)
}

function setAutoclicks(auto) {
  localStorage.setItem('auto', auto)
}

function setInter(interval) {
  localStorage.setItem('interval', interval)
}

function setPrice1(price1) {
  localStorage.setItem('price1', price1)
  $price1.textContent = round(price1)
}

function setPrice2(price2) {
  localStorage.setItem('price2', price2)
  $price2.textContent = round(price2)
}

function setPrice3(price3) {
  localStorage.setItem('price3', price3)
  $price3.textContent = round(price3)
}

function setSpeed(speed) {
  localStorage.setItem('speed', speed)
  $speed.setAttribute('data-speed', round(speed)+'/sec')
}

function setLevel(level) {
  localStorage.setItem('level', level)
  $level.setAttribute('data-level', level)
}

function setChanger(changer) {
  localStorage.setItem('changer', changer)
}

function setImage(score) {
  if (score === 69) {
    $circle.setAttribute('src', './assets/zhenya.png')
    $unicChars[0].style.backgroundImage = `url('./assets/zhenya.png')`
    $unicChars[0].textContent = ''
  } else if (score === 1488) {
    $circle.setAttribute('src', './assets/denis.png')
    $unicChars[1].style.backgroundImage = `url('./assets/denis.png')`
    $unicChars[1].textContent = ''
  } else if (score === 101) {
    $circle.setAttribute('src', './assets/vanya.png')
    $unicChars[2].style.backgroundImage = `url('./assets/vanya.png')`
    $unicChars[2].textContent = ''
  } else {
    $circle.setAttribute('src', `./assets/${images[getLevel()-1] || images.at(-1)}.png`)
  }
}

function setCharacters() {
  for (let i = 0; i < getLevel(); i++) {
    $stanChars[i].style.backgroundImage = `url('./assets/${images[i] || images.at(-1)}.png')`
    $stanChars[i].textContent = ''
  }
}


function getScore() {
  return (+localStorage.getItem('score') || 0)
}

function getPower() {
  return (+localStorage.getItem('power') || 1)
}

function getAutoclicks() {
  return (+localStorage.getItem('auto') || 0)
}

function getInter() {
  return (+localStorage.getItem('interval') || 1000)
}

function getPrice1() {
  return (+localStorage.getItem('price1') || 100)
}

function getPrice2() {
  return (+localStorage.getItem('price2') || 10)
}

function getPrice3() {
  return (+localStorage.getItem('price3') || 1000)
}

function getSpeed() {
  return (+localStorage.getItem('speed') || 0)
}

function getLevel() {
  return (+localStorage.getItem('level') || 1)
}

function getChanger() {
  return  (+localStorage.getItem('changer') || 10)
}

function changeLevel() {
  $stanChars[getLevel()-1].style.backgroundImage = `url('./assets/${images[getLevel()-1] || images.at(-1)}.png')`
  $stanChars[getLevel()-1].textContent = ''

  // setUserStats()

  if (getScore() >= getChanger()) {
    setLevel(getLevel()+1)
    setScore(getScore()+getChanger())
    setChanger(getChanger()*10)
    $level.style.setProperty('--levelAngle', '0deg')
  } else {
    $level.style.setProperty('--levelAngle', `${getScore()/getChanger()*360}deg`)
  }
}

function changeSpeed() {
  setSpeed(Math.round(1000000*getAutoclicks()/getInter())/1000)
}

function round(num) {
  const units = [
    { value: 1e12, suffix: 'T' },
    { value: 1e9,  suffix: 'B' },
    { value: 1e6,  suffix: 'M' },
    { value: 1e3,  suffix: 'к' }
  ]

  for (const unit of units) {
    if (num >= unit.value) {
      const short = Math.floor(num / (unit.value / 100)) / 100
      return short.toFixed(2) + unit.suffix
    }
  }

  return num.toString()
}


function clicking(event) {
  const rect = $circle.getBoundingClientRect()

  const offfsetX = event.clientX - rect.left - rect.width / 2
  const offfsetY = event.clientY - rect.top - rect.height / 2

  const DEG = 40

  const tiltX = (offfsetY / rect.height) * DEG
  const tiltY = (offfsetX / rect.width) * -DEG

  $circle.style.setProperty('--tiltX', `${tiltX}deg`)
  $circle.style.setProperty('--tiltY', `${tiltY}deg`)
  $circle.style.setProperty('--scale', '0.98')

  setTimeout(() => {
    $circle.style.setProperty('--tiltX', `0deg`)
    $circle.style.setProperty('--tiltY', `0deg`)
    $circle.style.setProperty('--scale', '1')
  }, 300)

  const plusOne = document.createElement('div')
  plusOne.classList.add('plus-one')
  plusOne.textContent = `+${getPower()}`
  plusOne.style.left = `${event.clientX - rect.left}px`
  plusOne.style.top = `${event.clientY - rect.top}px`

  $circle.parentElement.appendChild(plusOne)

  setScore(getScore() + getPower())

  setTimeout(() => {
    plusOne.remove()
  }, 2000)
}

document.addEventListener('keydown', (event) => {
  const key = event.key
  console.log(key)
  if (key === ' ') {
    clicking(event)
  }
})

$circle.addEventListener('click', (event) => {
  clicking(event)
})

$reset.addEventListener('click', () => {
  setScore(50000)
  setPower(1)
  setAutoclicks(0)
  setInter(1000)
  setPrice1(100)
  setPrice2(10)
  setPrice3(1000)
  setLevel(1)
  setChanger(10)
  setImage()
})

$power.addEventListener('click', () => {
  if (getScore() >= getPrice1()){
    setPower(getPower()+1)
    if (getPower() % 10 === 0) setPower(getPower()*2)

    setScore(getScore() - getPrice1())
    setPrice1(Math.round(getPrice1()*coef))
  }
})

$auto.addEventListener('click', () => {
  if (getScore() >= getPrice2()){
    setAutoclicks(getAutoclicks()+1)

    setScore(getScore() - getPrice2())
    setPrice2(Math.round(getPrice2()*coef))
  }
})

$interval.addEventListener('click', () => {
  if (getScore() >= getPrice3()){
    setInter(getInter()*0.9)

    setScore(getScore() - getPrice3())
    setPrice3(Math.round(getPrice3()*coef*coef))
  }
})


// const tg = {
//   initDataUnsafe: {
//     user: {
//       id: 123456,
//       username: 'cotraff',
//       first_name: 'Егор'
//     }
//   }
// }

// const user = tg.initDataUnsafe.user

// console.log(user.username) // 👉 @username
// console.log(user.first_name)
// console.log(user.id)

// function setUserStats() {
//   $userLevel.textContent = getLevel()
//   $userStat.textContent = `Username: ${user.username} \n Level: ${getLevel()}`
// }

$level.addEventListener('click', () => {
  if (!$trueLevel.checked) $dark.style.display = 'block'
  else $dark.style.display = 'none'
})


window.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram.WebApp

  if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user

    console.log('ID:', user.id)
    console.log('Имя:', user.first_name)
    console.log('Фамилия:', user.last_name)
    console.log('Юзернейм:', user.username)
    console.log('Язык:', user.language_code)

    // Пример: вставить имя в интерфейс
    $userStat.textContent = `Username: ${user.username} \n Level: ${getLevel()}`
  } else {
    console.log('Нет данных — приложение не запущено из Telegram')
  }
})


start()