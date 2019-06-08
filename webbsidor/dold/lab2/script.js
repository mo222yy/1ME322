// JavaScript

// Globala variabler
let inputElem // Input elements
let msgElem // meddelanden
let fruitNames // namn på frukterna
let fruitNr // nummer på frukterna
let selFruitsElem // valda frukter

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt koppling avfunktioner till knapparna.
function init () {
  inputElem = []
  inputElem[1] = document.getElementById('input1')
  inputElem[2] = document.getElementById('input2')
  inputElem[3] = document.getElementById('input3')

  msgElem = document.getElementById('message')
  document.getElementById('btn1').onclick = showFruit

  fruitNames = ['ingen frukt', 'äpple', 'banan', 'citron', 'apelsin', 'päron']
  fruitNr = 0
  document.getElementById('btn2').onclick = checkName

  selFruitsElem = document.getElementById('selectedFruits')
  document.getElementById('btn3').onclick = addFruits
} // End init

/**
 * Funktion för att visa vald frukt
 */
function showFruit () {
  let nr // The number that the user puts in
  let fruitUrl // Url to the fruitimage

  nr = getNr(1, 5)

  if (nr != null) {
    fruitUrl = `pics/fruit${nr}.jpg`
    let fruitImg = document.getElementById('fruitImg') // Fruitimage element
    fruitImg.setAttribute('src', fruitUrl)

    fruitNr = nr
  }
}

/**
 * Kontrollerar att en frukt är vald
 * Kontrollerar ifall fruktnamnet är korrekt
 */
function checkName () {
  if (fruitNr === 0) {
    msgElem.innerHTML = 'Du måste välja en frukt först'
    return
  }
  let name // Name of the fruit the user puts in
  name = inputElem[2].value

  if (name === fruitNames[fruitNr]) {
    msgElem.innerHTML = 'Rätt namn'
  } else {
    msgElem.innerHTML = 'Fel namn'
  }
}

/**
 * Kontrollerar inputnummer
 * Returnerar numret om det är ok
 */
function getNr (elemNr, high) {
  let nr // The number the user puts in
  nr = Number(inputElem[elemNr].value)

  if (isNaN(nr)) {
    msgElem.innerHTML = 'Du måste skriva ett tal med siffror'
    return null
  } else if (nr < 1 || nr > high) {
    msgElem.innerHTML = 'Du måste skriva ett tal mellan 1-5'
    return null
  }

  nr = parseInt(nr)
  inputElem[1].value = nr

  return nr
}

/**
 * Lägger till valt antal frukter i en lista och visar bilder
 */
function addFruits () {
  if (fruitNr === 0) {
    msgElem.innerHTML = 'Du måste välja en frukt först'
    return
  }

  let amount // antal bilder
  let imgList // listan av bilder som visas

  amount = getNr(3, 9)
  console.log('AMOUNT', amount)
  if (amount != null) {
    imgList = ''
    for (let i = 0; i < amount; i++) {
      imgList += `<img src=pics/fruit${fruitNr}.jpg alt="frukt">`
      selFruitsElem.innerHTML += imgList
    }
  }
}

window.onload = init // Se till att init aktiveras då sidan är inladdad
