const $circle = document.querySelector('#circle')
const $score = document.querySelector('#score')
const $reset = document.querySelector('#reset')
const $power = document.querySelector('#power')
const $auto = document.querySelector('#auto')
const $interval = document.querySelector('#interval')
const $price1 = document.querySelector('#price1')
const $price2 = document.querySelector('#price2')
const $price3 = document.querySelector('#price3')
const $level = document.querySelector('#level')

let coef = 1.15

function start() {
  setScore(getScore())
  setPower(getPower())
  setAutoclicks(getAutoclicks())
  setInter(getInter())
  setPrice1(getPrice1())
  setPrice2(getPrice2())
  setPrice3(getPrice3())
  setLevel(getLevel())
  setChanger(getChanger())
  
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

    setImage()
    changeLevel()
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
  $price1.textContent = price1
}

function setPrice2(price2) {
  localStorage.setItem('price2', price2)
  $price2.textContent = price2
}

function setPrice3(price3) {
  localStorage.setItem('price3', price3)
  $price3.textContent = price3
}

function setLevel(level) {
  localStorage.setItem('level', level)
  $level.setAttribute('data-level', level)
}

function setChanger(changer) {
  localStorage.setItem('changer', changer)
}

function setImage() {
  if (getScore() >= 10000) {
    $circle.setAttribute('src', './assets/lizzard.png')
  } else if (getScore() === 69) {
    $circle.setAttribute('src', './assets/zhenya.png')
  } else if (getScore() === 1488) {
    $circle.setAttribute('src', './assets/denis.png')
  } else if (getScore() === 101) {
    $circle.setAttribute('src', './assets/vanya.png')
  } else {
    $circle.setAttribute('src', './assets/frog.png')
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

function getLevel() {
  return (+localStorage.getItem('level') || 1)
}

function getChanger() {
  return  (+localStorage.getItem('changer') || 10)
}

function changeLevel() {
  if (getScore() >= getChanger()) {
    setLevel(getLevel()+1)
    setScore(getScore()+getChanger())
    setChanger(getChanger()*10)
    $level.style.setProperty('--levelAngle', '0deg')
  } else {
    $level.style.setProperty('--levelAngle', `${getScore()/getChanger()*360}deg`)
  }
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

  addOne()

  setTimeout(() => {
    plusOne.remove()
  }, 2000)
}

function addOne() {
  setScore(getScore() + getPower())
  setImage()
}

window.addEventListener('keydown', (event) => {
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
  setScore(0)
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
    setPrice3(Math.round(getPrice3()*coef))
  }
})

start()