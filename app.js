const $circle = document.querySelector('#circle')
const $score = document.querySelector('#score')
const $reset = document.querySelector('#reset')
const $power = document.querySelector('#power')
const $price1 = document.querySelector('#price1')
const $auto = document.querySelector('#auto')
const $price2 = document.querySelector('#price2')

let coef = 1.15

function start() {
  setScore(getScore())
  setPower(getPower())
  setAutoclicks(getAutoclicks())
  setPrice1(getPrice1())
  setPrice2(getPrice2())
  setImage()

  setInterval(() => {
    setScore(getScore() + getAutoclicks())
  }, 1000);
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

function setPrice1(price1) {
  localStorage.setItem('price1', price1)
  $price1.textContent = price1
}

function setPrice2(price2) {
  localStorage.setItem('price2', price2)
  $price2.textContent = price2
}

function setImage() {
  if (getScore() >= 10000) {
    $circle.setAttribute('src', './assets/lizzard.png')
  } else {
    $circle.setAttribute('src', './assets/frog.png')
  }
}

function getScore() {
  return +localStorage.getItem('score') ?? 0
}

function getPower() {
  return +localStorage.getItem('power') ?? 1
}

function getAutoclicks() {
  return +localStorage.getItem('auto') ?? 0
}

function getPrice1() {
  return +localStorage.getItem('price1') ?? 10
}

function getPrice2() {
  return +localStorage.getItem('price2') ?? 10
}

function addOne() {
  setScore(getScore() + getPower())
  setImage()
}

$circle.addEventListener('click', (event) => {
  const rect = $circle.getBoundingClientRect()

  const offfsetX = event.clientX - rect.left - rect.width / 2
  const offfsetY = event.clientY - rect.top - rect.height / 2

  const DEG = 40

  const tiltX = (offfsetY / rect.height) * DEG
  const tiltY = (offfsetX / rect.width) * -DEG

  $circle.style.setProperty('--tiltX', `${tiltX}deg`)
  $circle.style.setProperty('--tiltY', `${tiltY}deg`)

  setTimeout(() => {
    $circle.style.setProperty('--tiltX', `0deg`)
    $circle.style.setProperty('--tiltY', `0deg`)
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
})

$reset.addEventListener('click', () => {
  setScore(0)
  setPower(1)
  setAutoclicks(0)
  setPrice1(10)
  setPrice2(10)
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

start()