// JavaScript

// Variabler med referenser till input-taggarna och div-elementet för resultat
var input1Elem, input2Elem, resultElem;

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Här tas det fram referenser till textfälten för input och div-elementet för resultat
// Knappen för att köra programmet kopplas till funktionen testScript
function init() {
	input1Elem = document.getElementById("input1");
	input2Elem = document.getElementById("input2");
	resultElem = document.getElementById("result");
	document.getElementById("runBtn").onclick = testScript;
} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad


/* ----- Testfunktionen ----- */

// Funktion med den kod som ska testas
function testScript() {
	// Deklaration av variabler
	var width, height;	// Bredd och höjd som användaren anger i textfälten
	var area;			// Arean för ett objekt
	
	width = Number(input1Elem.value);
	height = Number(input2Elem.value);

	area = width * height;
	resultElem.innerHTML = "Arean för en rektangel är " + area + "<br><br>";
	
	area = width * height / 2;
	resultElem.innerHTML += "Arean för en triangel är " + area + "<br><br>";
	
	area = 3.14159265359 * width / 2 * height / 2;
	resultElem.innerHTML += "Arean för en oval är " + area + "<br><br>";
	
} // End testScript