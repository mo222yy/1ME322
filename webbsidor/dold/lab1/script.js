let input1Elem, input2Elem, resultElem
function init () {
  input1Elem = document.getElementById('input1')
  input2Elem = document.getElementById('input2')
  resultElem = document.getElementById('result')
  document.getElementById('runBtn').onclick = testScript
}

window.onload = init

function testScript () {
  let speed = Number(input1Elem.value)
  let time = Number(input2Elem.value)
  let distance = speed * time / 60

  resultElem.innerHTML = `Sträckan blir ${distance} km <br><br>`

  time = distance / (speed - 20) * 60
  resultElem.innerHTML += `Tiden för samma sträcka, om hastigheten är 20km/h lägre blir ${time} minuter. <br><br>`

  let reactionTime = 3
  let speedMS = speed * 1000 / 3600
  distance = speedMS * reactionTime
  resultElem.innerHTML += `Om reaktionstiden är ${reactionTime} sekunder blir reaktionssträckan ${distance} m. <br><br>`

  let car = ['Volvo', 'BMW', 'Ferrari']
  let accTime = [10.5, 7, 4.3]

  speedMS = 100 * 1000 / 3600
  distance = speedMS * accTime[0] / 2
  resultElem.innerHTML += `${car[0]} 0-100 på ${accTime[0]} sek på ${distance} meter. <br>`

  distance = speedMS * accTime[1] / 2
  resultElem.innerHTML += `${car[1]} 0-100 på ${accTime[1]} sek på ${distance} meter. <br>`

  distance = speedMS * accTime[2] / 2
  resultElem.innerHTML += `${car[2]} 0-100 på ${accTime[2]} sek på ${distance} meter. <br><br>`

  speed = (speed + 40) * 1000 // 130000m/h
  distance = speed * 0.005555556
  resultElem.innerHTML += `Sträckan, om hastigheten är 40km/h högre blir ${distance} m på 20 sekunder. <br><br>`

  let acceleration = (100 / 60 / 60) * 1000 / accTime[1]
  resultElem.innerHTML += `Accelerationen för en ${car[1]} är ${acceleration} m/s2`

}
