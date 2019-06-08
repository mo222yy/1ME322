// Globala variabler
let startGameBtn; // startknappen
let bricksAmountBtn; // dropdownlistan för antal brickor
let bricksDiv; // Div elementet med brickorna i
let bricks; // alla brickor
let foundBricks; // antal hittade par
let nrOfBricks; // antal brickor
let brickImgArray;
let turn; // första/andra?
let first; // första klickade brickan
let second; // andra klickade brickan
let nextBtn; // nextknappen
let turnNrElem; // elementet som visar poängen
let turnNr; // antal brickor som vänts
let score; // slutliga poängen
let scoreElem; // elementet som visar poäng


/**
 * Funktion som körs när man laddar in sidan
 */
function init() {
  scoreElem = document.querySelector('#userTotPoints');
  scoreElem.innerHTML = localStorage.score === undefined ? '0' : localStorage.score

  bricksAmountBtn = document.querySelector('#nrOfBricksMenu');
  bricksAmountBtn.onclick = setBricks;
  startGameBtn = document.querySelector('#startGameBtn');
  startGameBtn.onclick = startGame;
  bricksDiv = document.querySelector('#bricks');
  nextBtn = document.querySelector('#nextBtn');
  nextBtn.onclick = next;
  turnNrElem = document.querySelector('#turnNr');
  disableButton(nextBtn, true);

  setBricks(); // körs för att kunna starta spelet utan att välja antal brickor
}

/**
 * Funktion som körs när man trycker på startGame knappen
 * Avaktiverar knappar och deklarerar variabler
 */
function startGame() {
  setBricks() // Skapar spelbrickan
  disableButton(startGameBtn, true);
  disableButton(bricksAmountBtn, true);
  disableButton(nextBtn, true);
  foundBricks = 0;
  turnNr = 0;
  turn = 0;
  addOnClick();
}

/**
 * Funktion som körs när man klickar på en bricka
 * Kontrollerar om det är första eller andra brickan som vänts
 */
function turnBrick() {
  let thisIndex = bricks.indexOf(this);
  if (turn === 0) {
    this.setAttribute('src', `${brickImgArray[thisIndex]}`);
    this.setAttribute('class', 'brickFront')
    first = bricks[thisIndex];
    first.onclick = ''; // tar bort möjligheten att klicka på samma bricka 2 ggr
  } else if (turn === 1) {
    turnNr++;
    turnNrElem.innerHTML = turnNr;
    this.setAttribute('src', `${brickImgArray[thisIndex]}`);
    this.setAttribute('class', 'brickFront')
    second = bricks[thisIndex];
    second.onclick = ''; // tar bort möjligheten att klicka på samma bricka 2 ggr
    disableButton(nextBtn, false);
  }
  turn++;

}

/**
 * körs när man klickar på knappen nästa,
 * kontrollerar om det är matchning eller inte
 **/
function next() {

  addOnClick();
  // Match
  if (first.getAttribute('src') === second.getAttribute('src')) {
    first.setAttribute('class', 'brickEmpty');
    first.setAttribute('src', 'pics/empty.png');
    second.setAttribute('class', 'brickEmpty');
    second.setAttribute('src', 'pics/empty.png');
    foundBricks += 2;
    removeOnClick();
    addOnClick();
  } else {
    // No match
    first.setAttribute('class', 'brickBack');
    first.setAttribute('src', 'pics/backside.png');
    second.setAttribute('class', 'brickBack');
    second.setAttribute('src', 'pics/backside.png');
  }
  turn = 0;
  disableButton(nextBtn, true);
  // kontrollera om spelet är slut
  if (foundBricks === bricks.length) {
    endGame();
  }
}

/**
 * Funktion som körs när man väljer antal brickor
 * Kör sedan funktionen assignImages
 */
function setBricks() {
  let h = bricksAmountBtn.value.charAt(0); // antal brickor på höjden
  let w = bricksAmountBtn.value.charAt(2); // antal brickor på bredden
  nrOfBricks = w * h;

  // Kolla valt antal brickor och anpassa bredd
  if (w === '4') {
    bricksDiv.style.width = '280px';
  } else if (w === '5') {
    bricksDiv.style.width = '350px';
  } else if (w === '6') {
    bricksDiv.style.width = '420px';
  }
  // Ta bort brickor
  console.log('bricksDiv', bricksDiv)
  while (bricksDiv.firstChild) {
    bricksDiv.removeChild(bricksDiv.firstChild);
  }
  // Lägg till nya brickor
  bricks = [];
  for (let i = 0; i < nrOfBricks; i++) {
    let newBrick = document.createElement('img');
    newBrick.setAttribute('src', 'pics/backside.png');
    newBrick.setAttribute('alt', 'spelbricka');
    newBrick.setAttribute('class', 'brickBack');
    bricksDiv.appendChild(newBrick);
    bricks.push(newBrick);
  }
  assignImages(); // körs här för att fylla brickImgArray med rätt antal bilder
}

/**
 * fyller en array med bilder och blandar den,
 * storlek beror på valt antal brickor 
 **/
function assignImages() {
  brickImgArray = [];
  // fyll img arrayen med dubletter
  for (let i = 0; i < nrOfBricks / 2; i++) {
    brickImgArray.push(`pics/${i}.png`);
    brickImgArray.push(`pics/${i}.png`);
  }
  // shuffle array
  for (var i = brickImgArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = brickImgArray[i];

    brickImgArray[i] = brickImgArray[j];
    brickImgArray[j] = temp;
  }
}

/**
 * Funktion som körs när spelaren hittat alla brickor
 */
function endGame() {
  disableButton(nextBtn, true);
  disableButton(bricksAmountBtn, false);
  disableButton(startGameBtn, false);

  score = 20 - (turnNr - nrOfBricks / 2) * 1.2;
  score < 0 ? score = 0 : score = Math.round(score)
  localStorage.score ? localStorage.score = parseInt(localStorage.score) + score : localStorage.score = score
 
  scoreElem.innerHTML = localStorage.score


}

/* ------ HELPERS ------ */
/**
 * Lägger till onclick på alla brickor om den inte har bilden empty
 **/
function addOnClick() {
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i].getAttribute('src') !== 'pics/empty.png') {
      bricks[i].onclick = turnBrick;
    }
  }
}

/**
 * Tar bort onclick på alla brickor
 **/
function removeOnClick() {
  for (let i = 0; i < bricks.length; i++) {
    bricks[i].onclick = '';
  }
}

/**
 * Disables or enables buttons
 **/
function disableButton(button, boolean) {
  button.disabled = boolean;
}

window.onload = init;

