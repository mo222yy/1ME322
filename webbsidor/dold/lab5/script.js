// JavaScript Document

// Globala variabler
var carImgElem		// Referens till bild med bil
var msgElem		// Referens till elementet för meddelanden
var carImgs		// Array med filnamn för bilderna med bilen
var carDir			// Riktning för bilen
var xStep, yStep	// Antal pixlar som bilen ska förflytta sig i x- resp. y-led i varje steg
var timerRef		// Referens till timern för bilens förflyttning
var timerStep		// Tid i ms mellan varje steg i förflyttningen
/* === Tillägg i labben === */
let pigImgElem // pigImageElement
let pigTimerRef // timer reference for the pigs
let pigDuration // time for the pigTimer
let cSize // size of the carImg
let pSize // size of the pigImg
let pigNr // amount of pigs created
let hitCounter // amount of pig hits
let pigNrElem // pig counter element
let hitCounterElem // hit counter element
let catchedPig // checks if pig gets hit

// Initiera globala variabler och koppla funktion till knapp
function init () {
  carImgElem = document.getElementById('car')
  msgElem = document.getElementById('message')
  addListener(document, 'keydown', checkKey)
  carImgs = ['car_up.png', 'car_right.png', 'car_down.png', 'car_left.png']
  carDir = 1
  addListener(document.getElementById('startBtn'), 'click', startGame)
  addListener(document.getElementById('stopBtn'), 'click', stopGame)
  xStep = 5
  yStep = 5
  timerRef = null
  timerStep = 20
  /* === Tillägg i labben === */
  pigImgElem = document.querySelector('#pig')
  pigTimerRef = null
  pigDuration = 2000

  cSize = 80
  pSize = 40

  pigNrElem = document.querySelector('#pigNr')
  hitCounterElem = document.querySelector('#hitCounter')
} // End init
addListener(window, 'load', init)

function checkKey (e) {
  var k = e.keyCode
  switch (k) {
    case 37: // Pil vänster
    case 90: // Z
      carDir--
      if (carDir < 0) carDir = 3
      carImgElem.src = 'pics/' + carImgs[carDir]
      break
    case 39: // Pil höger
    case 173: // -
      carDir++
      if (carDir > 3) carDir = 0
      carImgElem.src = 'pics/' + carImgs[carDir]
      break
  }
} // End checkKey

// Starta bilens rörelse
function startGame () {
  carImgElem.style.left = '0px'
  carImgElem.style.top = '0px'
  moveCar()
  /* === Tillägg i labben === */
  pigTimerRef = setTimeout(newPig, pigDuration)

  pigNr = 0
  hitCounter = 0
} // End startGame

// Stoppa bilen
function stopGame () {
  if (timerRef != null) clearTimeout(timerRef)
  /* === Tillägg i labben === */
  if (pigTimerRef != null) clearTimeout(pigTimerRef)
  pigImgElem.style.visibility = 'hidden'
  catchedPig = true
} // End stopGame

// Flytta bilen ett steg framåt i bilens riktning
function moveCar () {
  var x	// x-koordinat (left) för bilen
  var y	// y-koordinat (top) för bilen
  x = parseInt(carImgElem.style.left)
  y = parseInt(carImgElem.style.top)
  switch (carDir) {
    case 0: // Uppåt
      y -= yStep
      if (y < 0) y = 0
      break
    case 1: // Höger
      x += xStep
      if (x > 720) x = 720
      break
    case 2: // Nedåt
      y += yStep
      if (y > 420) y = 420
      break
    case 3: // Vänster
      x -= xStep
      if (x < 0) x = 0
      break
  }
  carImgElem.style.left = x + 'px'
  carImgElem.style.top = y + 'px'
  timerRef = setTimeout(moveCar, timerStep)
  /* === Tillägg i labben === */
  checkHit()
} // End moveCar

/* === Tillägg av nya funktioner i labben === */
// adds a new pig to the game board
function newPig () {
  if (pigNr < 10) {
    pigImgElem.setAttribute('src', 'pics/pig.png')
    let t = Math.floor(440 * Math.random()) + 10
    let l = Math.floor(740 * Math.random()) + 10
    pigImgElem.style.top = `${t}px`
    pigImgElem.style.left = `${l}px`
    pigImgElem.style.visibility = 'visible'
    pigTimerRef = setTimeout(newPig, pigDuration)
    pigNr++
    pigNrElem.innerHTML = pigNr
  } else {
    stopGame()
  }
  catchedPig = false
}

// Function that checks if the pig gets hit by the car
function checkHit () {
  let cT, cL, pT, pL // variables for top and left for car and pig

  cT = parseInt(carImgElem.style.top)
  cL = parseInt(carImgElem.style.left)
  pT = parseInt(pigImgElem.style.top)
  pL = parseInt(pigImgElem.style.left)

  if (cL + cSize - 10 >= pL && cL + 10 <= pL + pSize && cT + cSize - 10 >= pT && cT + 10 <= pT + pSize) {
    if (catchedPig === true) return
    clearTimeout(pigTimerRef)
    pigImgElem.setAttribute('src', 'pics/smack.png')
    pigTimerRef = setTimeout(newPig, pigDuration)
    hitCounter++
    hitCounterElem.innerHTML = hitCounter
    catchedPig = true
  }
}
