// JavaScript Document

// Globala variabler
var formElem		// Referens till elementet med hela formuläret
var totalCostElem	// Referens till elementet för totalpris
let re // regular expressions
let errMsg //error messages 

// Initiera globala variabler och koppla funktion till knapp
function init () {
  var i		// Loopvariabel
  formElem = document.getElementById('booking')
  totalCostElem = document.getElementById('totalCost')

  for (i = 0; i < formElem.roomType.length; i++) {
    addListener(formElem.roomType[i], 'click', checkIfFamilyRoom)
    addListener(formElem.roomType[i], 'click', calculateCost)
  }
  for (i = 0; i < formElem.addition.length; i++) {
    addListener(formElem.addition[i], 'click', calculateCost)
  }
  for (i = 0; i < formElem.nights.length; i++) {
    addListener(formElem.nights, 'change', calculateCost)
  }
  checkIfFamilyRoom()
  calculateCost()

  addListener(formElem.city, 'blur', checkCity)
  addListener(formElem.zipcode, 'blur', checkZipCode)
  addListener(formElem.telephone, 'blur', checkTelephone)

  re = [
    /^\d{3} ?\d{2}$/, // Postnummer
    /^0\d{1,3}[-/ ]?\d{5,8}$/ // Telefonnummer
  ]
  errMsg = [
    'Postnumret måste bestå av fem siffror.',
    'Telnr måste börja med en 0:a och sedan 6-11 siffror.'
  ]

  addListener(formElem.campaigncode, 'focus', startCheckCampaign)
  addListener(formElem.campaigncode, 'keyup', checkCampaign)
  addListener(formElem.campaigncode, 'blur', endCheckCampaign)
} // End init

// Checks if the chosen room is a family room or not
function checkIfFamilyRoom () {
  if (formElem.roomType[2].checked === true) {
    formElem.persons.disabled = false
    formElem.persons.parentNode.style.color = '#000'
    formElem.addition[2].disabled = true
    formElem.addition[2].parentNode.style.color = '#999'
  } else {
    formElem.persons.disabled = true
    formElem.persons.parentNode.style.color = '#999'
    formElem.addition[2].disabled = false
    formElem.addition[2].parentNode.style.color = '#000'
  }
}

// Calculates the cost of all facilities
function calculateCost () {
  let i // Kommentera
  let elemValue // Kommentera
  let roomPrice // Kommentera
  let nightsIndex // Kommentera
  let nrOfNights // Kommentera

  for (i = 0; i < formElem.roomType.length; i++) {
    if (formElem.roomType[i].checked) {
      elemValue = formElem.roomType[i].value
      roomPrice = Number(elemValue.split(',')[1])
      break
    }
  }

  for (i = 0; i < formElem.addition.length; i++) {
    if (formElem.addition[i].checked && !formElem.addition[i].disabled) {
      elemValue = formElem.addition[i].value
      roomPrice += Number(elemValue.split(',')[1])
    }
  }

  nightsIndex = formElem.nights.selectedIndex
  nrOfNights = Number(formElem.nights.options[nightsIndex].value)
  totalCostElem.innerHTML = nrOfNights * roomPrice
}

// Capitalizes cityname
function checkCity () {
  formElem.city.value = formElem.city.value.toUpperCase()
}

// Checks if zipcode is valid
function checkZipCode () {
  checkField(formElem.zipcode, 0)
}

// checks if phonenumber is valid
function checkTelephone () {
  checkField(formElem.telephone, 1)
}

// checks if parameters fulfills the reg exp constraints
function checkField (theField, index) {
  var errMsgElem // Referens till andra span-elementet
  errMsgElem = theField.parentNode.parentNode.getElementsByTagName('span')[1]
  errMsgElem.innerHTML = ''
  if (!re[index].test(theField.value)) {
    errMsgElem.innerHTML = errMsg[index]
    return false
  } else return true
}

// Turns campaign inputfield red when focusing
function startCheckCampaign () {
  this.style.backgroundColor = '#F99'
  this.select()
}

// resets campaing inputfield color
function endCheckCampaign () {
  this.style.backgroundColor = ''
  formElem.campaigncode.value = formElem.campaigncode.value.toUpperCase()
}

// Checks if campaign input is valid
function checkCampaign () {
  let re = /[A-ZÅÄÖa-zåäö]{3}-\d{2}-[A-ZÅÄÖa-zåäö]{1}\d{1}/
  if (re.test(this.value)) this.style.backgroundColor = '#6F9'
  else this.style.backgroundColor = '#F99'
}
addListener(window, 'load', init)
