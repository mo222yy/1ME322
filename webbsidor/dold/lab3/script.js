// Globala variabler
let wordList // Listan av ord som kan väljas
let selectedWord // ordet som väljs
let letterBoxes // alla bokstavselement
let hangmanImg // img elementet av gubben
let hangmanImgNr // bilden av gubben
let msgElem // meddelanden
let startTime // tar tiden

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init () {
  let i // iterations variabel
  let startGameBtn // startknappen
  let letterButtons // bokstäverna som kan klickas

  startGameBtn = document.getElementById('startGameBtn')
  startGameBtn.onclick = startGame

  letterButtons = document.getElementById('letterButtons').getElementsByTagName('button')
  for (i = 0; i < letterButtons.length; i++) {
    letterButtons[i].onclick = guessLetter
  }
  disableLetterButtons(true)

  wordList = ['BLOMMA', 'LASTBIL', 'SOPTUNNA', 'KÖKSBORD', 'RADIOAPPARAT', 'VINTER', 'SOMMAR', 'DATORMUS', 'LEJON', 'ELEFANTÖRA', 'JULTOMTE',
    'SKOGSHYDDA', 'BILNUMMER', 'BLYERTSPENNA', 'SUDDGUMMI', 'KLÄDSKÅP', 'VEDSPIS', 'LJUSSTAKE', 'SKRIVBORD', 'ELDGAFFEL', 'STEKPANNA',
    'KASTRULL', 'KAFFEBRYGGARE', 'TALLRIK', 'SOFFBORD', 'TRASMATTA', 'FLYGPLAN', 'FLYGPLATS', 'TANGENTBORD']

  hangmanImg = document.getElementById('hangman')
  msgElem = document.getElementById('message')
}// End init

// Funktion som körs när spelet startar
function startGame () {
  let now

  disableStartGameBtn(true)
  disableLetterButtons(false)

  randomWord()
  letterBoxes = showLetterBoxes()

  hangmanImg.setAttribute('src', 'pics/h0.png')
  hangmanImgNr = 0

  msgElem.innerHTML = ''
  now = new Date()
  startTime = now.getTime()
}

function randomWord () {
  let wordIndex // slumpmässigt valt ordindex
  let oldWord = selectedWord

  while (oldWord === selectedWord) {
    wordIndex = Math.floor(Math.random() * wordList.length) + 1
    selectedWord = wordList[wordIndex]
  }
  return selectedWord
}
// Funktion för att generera tomma letterBoxes
function showLetterBoxes () {
  let newCode // initierar tomma boxar för order
  let i // iterations variabel

  newCode = ''
  for (i = 0; i < selectedWord.length; i++) {
    newCode += '<span>&nbsp;</span>'
  }

  letterBoxes = document.getElementById('letterBoxes')
  letterBoxes.innerHTML = newCode

  letterBoxes = document.getElementsByTagName('span')
  return letterBoxes
}

// Funktion som körs när en spelare trycker på en bokstav
function guessLetter () {
  let letter // bokstav som spelare klickar på
  let i // iterations variabel
  let letterFound // Kontrollerar om bokstaven finns i ordet
  let correctLettersCount // Räknar totalt antal rätt bokstäver

  letterFound = false
  letter = this.value
  correctLettersCount = 0

  for (i = 0; i < selectedWord.length; i++) {
    if (letter === selectedWord.charAt(i)) {
      letterFound = true
      letterBoxes[i].innerHTML = letter
    }
    if (letterBoxes[i].innerHTML !== '&nbsp;') {
      correctLettersCount++
    }
  }

  if (letterFound === false) {
    hangmanImgNr++
    hangmanImg.setAttribute('src', `pics/h${hangmanImgNr}.png`)

    if (hangmanImgNr === 6) {
      endGame(true)
    }
  } else if (correctLettersCount === selectedWord.length) {
    endGame(false)
  }
}

// Funktion som körs när spelet är slut
function endGame (manHanged) {
  let now
  let runTime

  now = new Date()
  runTime = (now.getTime() - startTime) / 1000
  disableStartGameBtn(false)
  disableLetterButtons(true)
  if (manHanged === true) {
    msgElem.innerHTML = `Gubben hängdes, rätt ord var ${selectedWord}`
  } else {
    msgElem.innerHTML = `Grattis, du klarade spelet på ${runTime.toFixed(1)} sekunder`
  }
}

/**
 * Sätter startGameBtn till disabled true or false
 * @param {} boolean 
 */
function disableStartGameBtn (boolean) {
  let startGameBtn = document.getElementById('startGameBtn') // startGameButton
  startGameBtn.disabled = boolean
}

/**
 * Sätter letterButtons till disabled true or false
 * @param {} boolean 
 */
function disableLetterButtons (boolean) {
  let letterButtons = document.getElementById('letterButtons').getElementsByTagName('button') // letterButtons
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].disabled = boolean
  }
}
window.onload = init
