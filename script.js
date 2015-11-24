
//reset button

// document.querySelector("#status_container button").addEventListener('click', function(event){
// 	window.location.reload(false);
// })

//epm first attempt. look back to this to simplify
// //listening for clicks on individual divs


// $('.card').each(function(i, element){
// 	//get image url from list
// 	//create img tag inside of element
// });

// a.concat(a).sort(function() { return 0.5 - Math.random() });

//window.addEventlistener('load', newBoard);
$(document).ready(function() {
	console.log('document ready');
	newBoard();

	$('.card').click(function(event){
		var tile = $(this);
		var val = cardArray[tile.attr('id')];
		memoryFlipTile(tile[0], val);
	});
});

var cardArray = ['Q','Q','W','W','E','E','R','R','T','T','Y','Y','U','U','I','O','O','P','P','A','A','S','S',];
var cardValues = [];
var cardTileIds = [];
var tilesFlipped = 0;

//shuffle method
Array.prototype.cardTileShuffle = function(){
	var i = this.length, j, temp;
	while (--i > 0){
		j = Math.floor(Math.random() * (i+1));
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
	}
}

function newBoard(){
	console.log('hit newboard');
	tilesFlipped = 0;
	var output = '';
	cardArray.cardTileShuffle();
	for(var i = 0; i < cardArray.length; i++){
		output += '<div id="'+i+'" class="card"></div>';

	}
	document.getElementById('memoryBoard').innerHTML = output;
}

function memoryFlipTile(tile, val){
	//console.log('Hit flip function: ' + val);
	if(tile.innerHTML == "" && cardValues.length < 2) {
		tile.style.background = '#FFF';
		tile.innerHTML = val;
		if(cardValues.length == 0) {
			cardValues.push(val);
			cardTileIds.push(tile.id);
		} else if(cardValues.length == 1){
			cardValues.push(val);
			cardTileIds.push(tile.id);
			if(cardValues[0] == cardValues[1]){
				tilesFlipped += 2;
				//clear both arrays
				cardValues = [];
				cardTileIds = [];
				//check to see if board is cleared
				if(tilesFlipped == cardArray.length){
					alert("Board Cleared. Generating New Board");
					document.getElementById('memoryBoard').innterHTML = "";
					newBoard();
				}
			} else {
				function flipTwoBack(){
					//Flip the 2 cards back over
					var cardOne = document.getElementById(cardTileIds[0]);
					var cardTwo = document.getElementById(cardTileIds[1]);
					cardOne.style.background = 'red';
					cardOne.innerHTML = "";
					cardTwo.style.background = "green";
					cardTwo.innerHTML = "";
					//clear both arrays
					cardValues = [];
					cardTileIds = [];
				}
				setTimeout(flipTwoBack, 1000);
			}
		}
	}
}
