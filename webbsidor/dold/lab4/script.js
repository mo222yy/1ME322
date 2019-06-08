// JavaScript

// Globala variabler
// Ord och bilder
var allPics			// Array med alla ord
var allDescription		// Array med kort beskrivning av alla ord/bilder
var picsIx4			// Array med nummer (index till allPics) för de fyra bilder som ska visas
var words8				// Array med de åtta ord som ska finnas i listan (sorteras i bokstavsordning)

// Element i gränssnittet
var startGameBtn		// Referenser till start-knappen (button)
var checkAnswersBtn		// Referens till knappen för att kontrollera svar (button)
var wordListElem		// Referens till listan med de ord som kan dras (ul-elemntet)
var	wordElems			// Array med referenser till elementen för de åtta orden (li-elemnten)
var picsElems			// Array med referenser till elementen med de fyra bilderna (img)
var userAnswerElems		// Array med referenser till elementen för orden intill bilderna (span)
var correctAnswerElems	// Array med referenser till element för rätta svar (span)
var largePictElem		// Referens till elementet med den stora bilden (img)
var msgElem 			// Referens till div-element för utskrift av meddelanden (div)
// Element vid drag and drop
var dragWordElem		// Det ord som dras (kan vara både li och span)

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt händelsehanterare.
function init () {
  picsIx4 = []
  words8 = []
  var i	// Loopvariabel
  // Ord och bilder
  allPics = ['Borgholm', 'Gränna', 'Gävle', 'Göteborg', 'Halmstad', 'Jönköping', 'Kalmar', 'Karlskrona', 'Kiruna', 'Ljungby', 'Malmö', 'Norrköping', 'Skara', 'Stockholm', 'Sundsvall', 'Umeå', 'Visby', 'Västervik', 'Växjö', 'Örebro']
  allDescription = [' - Kyrkan', ' - Storgatan', ' - Julbock', ' - Operan', ' - Picassoparken', ' - Sofiakyrkan', ' - Domkyrkan', ' - Rosenbom', ' - Stadshus', ' - Garvaren', ' - Stortorget', ' - Spårvagn', ' - Domkyrka', ' - Rosenbad', ' - Hotell Knaust', ' - Storgatan', ' - Stadsmur', ' - Hamnen', ' - Teater', ' - Svampen']
  // Referenser till element i gränssnittet
  startGameBtn = document.querySelector('#startGameBtn')
  checkAnswersBtn = document.querySelector('#checkAnswersBtn')
  wordListElem = document.querySelector('#words').getElementsByTagName('ul')[0]
  wordElems = document.querySelector('#words').getElementsByTagName('li')
  picsElems = document.querySelector('#pics').getElementsByTagName('img')
  userAnswerElems = document.getElementsByClassName('userAnswer')
  correctAnswerElems = document.getElementsByClassName('correctAnswer')
  largePictElem = document.querySelector('#largePict')
  msgElem = document.querySelector('#message')

  // Lägg på händelsehanterare
  addListener(startGameBtn, 'click', startGame)
  addListener(checkAnswersBtn, 'click', checkAnswers)
  for (i = 0; i < picsElems.length; i++) {
    addListener(picsElems[i], 'mouseover', showLargePict)
    addListener(picsElems[i], 'mouseout', hideLargePict)
  }
  // Aktivera/inaktivera knappar
  disableButton(startGameBtn, false)
  disableButton(checkAnswersBtn, true)
} // End init

// Initiera spelet. Välj ord slumpmässigt. Visa ord och bilder.
function startGame () {
  let i // iteration variable
  let r // random index
  let tempList // copy of allPics

  tempList = allPics.slice(0)

  for (i = 0; i < 4; i++) {
    r = Math.floor(Math.random() * tempList.length)
    words8[i] = tempList[r]
    picsIx4[i] = allPics.indexOf(tempList[r])
    tempList.splice(r, 1)
  }

  for (i = 4; i < 8; i++) {
    r = Math.floor(Math.random() * tempList.length)
    words8[i] = tempList[r]
  }
  words8.sort()

  for (i = 0; i < words8.length; i++) {
    wordElems[i].innerHTML = words8[i]
  }

  for (i = 0; i < picsIx4.length; i++) {
    picsElems[i].setAttribute('src', `pics/${picsIx4[i]}.jpg`)
    userAnswerElems[i].innerHTML = ''
    correctAnswerElems[i].innerHTML = ''
  }

  eventsForDrag(true)
  disableButton(startGameBtn, true)
  disableButton(checkAnswersBtn, false)
} // End startGame

// Lägg på eller ta bort händelsehanterare på de element som ska kunna dras
// samt händelsehanterare för element där man kan släppa orden (drop).
function eventsForDrag (drag) {
  if (drag) {
    for (let i = 0; i < wordElems.length; i++) {
      wordElems[i].draggable = true
      addListener(wordElems[i], 'dragstart', dragStarted)
    }
    for (let i = 0; i < picsElems.length; i++) {
      addListener(picsElems[i], 'dragover', wordOverPict)
      addListener(picsElems[i], 'drop', wordOverPict)
    }
    for (let i = 0; i < userAnswerElems.length; i++) {
      userAnswerElems[i].draggable = true
      addListener(userAnswerElems[i], 'dragstart', dragStarted)
    }
    addListener(wordListElem, 'dragover', wordOverList)
    addListener(wordListElem, 'drop', wordOverList)
  } else {
    for (let i = 0; i < wordElems.length; i++) {
      wordElems[i].draggable = false
      removeListener(wordElems[i], 'dragstart', dragStarted)
    }
    for (let i = 0; i < picsElems.length; i++) {
      removeListener(picsElems[i], 'dragover', wordOverPict)
      removeListener(picsElems[i], 'drop', wordOverPict)
    }
    for (let i = 0; i < userAnswerElems.length; i++) {
      userAnswerElems[i].draggable = false
      removeListener(userAnswerElems[i], 'dragstart', dragStarted)
    }
    removeListener(wordListElem, 'dragover', wordOverList)
    removeListener(wordListElem, 'drop', wordOverList)
  }
} // End eventsForDrag

// Visa förstorad bild
function showLargePict () {
  let picture = this.getAttribute('src')
  largePictElem.setAttribute('src', picture)
} // End showLargePict

// Dölj förstorad bild
function hideLargePict () {
  largePictElem.setAttribute('src', 'pics/empty.png')
} // End hideLargePict

// Ett ord börjar dras.
function dragStarted (e) {
  e.dataTransfer.setData('text', this.innerHTML)
  dragWordElem = this
} // End dragStarted

// Hantera händelserna dragover och drop, då ett ord släpps över en bild
// Endast drop används i detta exempel
function wordOverPict (e) {
  let i
  e.preventDefault()
  if (e.type === 'drop') {
    dragWordElem.innerHTML = ''
    i = this.id
    if (userAnswerElems[i].innerHTML !== '') {
      moveBackToList(userAnswerElems[i].innerHTML)
    }
    userAnswerElems[i].innerHTML = e.dataTransfer.getData('text')
  }
} // End wordOverPict

// Hantera händelserna dragover och drop, då ett ord släpps över listan med ord
// Endast drop används i detta exempel
function wordOverList (e) {
  e.preventDefault()
  if (e.type === 'drop') {
    dragWordElem.innerHTML = ''
    moveBackToList(e.dataTransfer.getData('text'))
  }
} // End wordOverList

// Flytta tillbaks ordet till listan
function moveBackToList (word) { // word är det ord som ska flyttas tillbaks
  let i // loopvariable
  i = words8.indexOf(word)
  wordElems[i].innerHTML = words8[i]
} // End moveBackToList

// Kontrollera användarens svar och visa de korrekta svaren
function checkAnswers () {
  let i // loopvariable
  let points // check how many correct answers

  for (i = 0; i < userAnswerElems.length; i++) {
    if (userAnswerElems[i].innerHTML === '') {
      window.alert('Dra först ord till alla bilder')
      return
    }
  }

  eventsForDrag(false)
  points = 0

  for (i = 0; i < userAnswerElems.length; i++) {
    if (userAnswerElems[i].innerHTML === allPics[picsIx4[i]]) points++
    correctAnswerElems[i].innerHTML = allPics[picsIx4[i]] + '<br>' + allDescription[picsIx4[i]]
  }
  msgElem.innerHTML = `Du fick ${points} rätt`
  disableButton(startGameBtn, false)
  disableButton(checkAnswersBtn, true)
} // End checkAnswers

// function to set buttons disabled to true or false
function disableButton (button, boolean) {
  button.disabled = boolean
}

addListener(window, 'load', init) // Se till att init aktiveras då sidan är inladdad
