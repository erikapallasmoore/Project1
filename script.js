
//reset button




$(document).ready(function() {
	console.log('document ready');
	newBoard();

	$('.card').click(function(event){
		var tile = $(this);
		var val = cardArray[tile.attr('id')];
		memoryFlipTile(tile[0], val);
	});
});

//var cardArray = ['<img src="images/mask1.jpg">','<img src="images/mask1.jpg">','<img src="images/mask2.jpg">','<img src="images/mask2.jpg">'];
var cardArray = ['<img src="images/mask1.jpg">','<img src="images/mask1.jpg">','<img src="images/mask2.jpg">','<img src="images/mask2.jpg">','<img src="images/mask3.jpg">','<img src="images/mask3.jpg">','<img src="images/mask4.jpg">','<img src="images/mask4.jpg">','<img src="images/mask5.jpg">','<img src="images/mask5.jpg">','<img src="images/mask6.jpg">','<img src="images/mask6.jpg">','<img src="images/mask7.jpg">','<img src="images/mask7.jpg">','<img src="images/mask8.jpg">','<img src="images/mask8.jpg">','<img src="images/mask9.jpg">','<img src="images/mask9.jpg">','<img src="images/mask10.jpg">','<img src="images/mask10.jpg">','<img src="images/mask11.jpg">','<img src="images/mask11.jpg">','<img src="images/mask12.jpg">','<img src="images/mask12.jpg">'];
var cardValues = [];
var cardTileIds = [];
var tilesFlipped = 0;
var currentScore1 = 0;
var currentScore2 = 0;
var player = true;



//shuffle method
Array.prototype.cardTileShuffle = function(){
	var i = this.length, j, temp;
	while (--i > 0){
		j = Math.floor(Math.random() * (i+1));
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
		console.log(cardArray[0]);
		console.log(cardTileIds[0]);
		console.log(cardValues[0]);
	}
}

function PlayerMove(){
	if (player){
		var currentPlayer = "PlayerOne"
		console.log(currentPlayer)
	} else {
		var currentPlayer = "PlayerTwo"
		console.log(currentPlayer)

	}

}
//build the board
function newBoard(){
	console.log('hit newboard');
	$('.winPage').hide();
	tilesFlipped = 0;
	var output = '';
	cardArray.cardTileShuffle();
	for(var i = 0; i < cardArray.length; i++){
		output += '<div id="'+i+'" class="card"></div>';

	}
	document.getElementById('memoryBoard').innerHTML = output;
}



var counter = 0;
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
				counter++
				if(player){
					currentScore1 = parseInt($(".counterOne").text());
					$(".counterOne").text(currentScore1+1)
				}else{
					currentScore2 = parseInt($(".counterTwo").text());
					$(".counterTwo").text(currentScore2+1)

				}

				console.log(counter);
				console.log(tilesFlipped);

				//clear both arrays
				cardValues = [];
				cardTileIds = [];
			 
				//check to see if board is cleared
				if(tilesFlipped == cardArray.length){
					

					$('#winPageLabel').text(highScore);
					$('.Home').hide();
					$('.winPage').show();

					//restart button
					document.querySelector(".winPage button").addEventListener('click', function(event){
						window.location.reload(false);
					})
				}
			} else {
				function flipTwoBack(){
					//Flip the 2 cards back over
					var cardOne = document.getElementById(cardTileIds[0]);
					var cardTwo = document.getElementById(cardTileIds[1]);
					cardOne.style.background = "url('images/card.gif')";
					cardOne.innerHTML = "";
					cardTwo.style.background = "url('images/card.gif')";
					cardTwo.innerHTML = "";
					//clear both arrays
					cardValues = [];
					cardTileIds = [];
					player = !player;
				}
				setTimeout(flipTwoBack, 700);
			}

			PlayerMove();
			console.log("no match!")
		}
	}
}

var highScore = function(){
	if (currentScore1 > currentScore2){
		return "Player One ";
	}

	else if (currentScore2 > currentScore1){
		return "Player Two ";
	}

	else {
		return "Tie, no one ";
	}

}


