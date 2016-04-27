

	//Imported shuffle function via https://css-tricks.com/snippets/jquery/shuffle-dom-elements/
	
	$.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };

	//-------------------------------------------------------------
	
	
	
	var memoryTile = {
		name: ["brachy", "brachy", "gore", "gore", "malfestio", "malfestio", "rathalos", "rathalos", "rathian", "rathian", "sQueen", "sQueen", "steve", "steve", "tigrex", "tigrex"],
		setup: function() {
			for (i=0; i < this.name.length; i++) {
				var $tileItem = $("<li data-tilenum='" + [i] + "' data-tilename='" + this.name[i].toString() + "'>" + "</li>");
				$("#gameboard ul").append($tileItem);
				$("li[data-tilenum=" + [i] +"]").append("<img src='img/" + [i] + ".png'>");
			}
			$("li").addClass("tile");
			$("li").addClass("deselected");		
		},
		reveal: function ($tile) {
			$tile.children().fadeTo( 500, 1).css('visibility', 'visible');
			
			$tile.removeClass("deselected").addClass("selected");
			
			
			tileClickedName.push($tile.data("tilename"));
			console.log(tileClickedName);
			if (pairCounter < 1) {
				console.log("First tile selected");
				pairCounter = pairCounter + 1;
			} else if (pairCounter == 1 && tileClickedName[0] != tileClickedName[1]) {
				window.setTimeout( function () { 
					pairCounter = 0;
					console.log("Reset tiles, no match");
					tileClickedName.pop($tile.data("tilename"));
					tileClickedName.pop($tile.data("tilename"));
					$('.selected').children().fadeTo(500, 0, function(){
						$(this).css('visibility', 'hidden');
					});
					$('.selected').addClass("deselected").removeClass("selected");
				},500);
				
				
				
			} else if (pairCounter == 1 && tileClickedName[0] == tileClickedName[1]) {
				$('.selected').children().fadeTo(500, 1);
				window.setTimeout( function () { 
					$('.selected').children().fadeTo(500, .5);
					pairCounter = 0;
					console.log("Matched tiles, continue!");
					tileClickedName.pop($tile.data("tilename"));
					tileClickedName.pop($tile.data("tilename"));
					scoreCounter = scoreCounter + 1;
					$('.selected').addClass("matched").removeClass("selected");	
					$("#scorecounter").empty().append("<p>" + "Score: " + scoreCounter + "/8</p>");
					if ( scoreCounter == 8 ) {
						alert("You win!");
					}
				},500);
			}
		}
		
	}
	
	
	var tileClickedName = [];
	var tileClickedElement = [];
	
	var pairCounter = 0
	var scoreCounter = 0

$( document ).ready(function() {

	$("#startbutton").click(function() {

		
		$(".tile img").fadeTo( 400, 0);
		window.setTimeout( function () { 
			$(".tile").shuffle() 
			$(".tile img").css('visibility', 'hidden');
		
		
		$(".tile").click(function() {
		
			if ( $(':animated').length ) {
				return false;
			} else if ( $(this).hasClass("deselected") ) {	
				memoryTile.reveal($(this));
			} else {
				
			};	
			
		});
		},500);
			
	});

	$("#resetbutton").click(function() {
		$(".tile img").css('visibility', 'visible');
		$(".tile img").fadeTo( 500, 1);
		pairCounter = 0;
		scoreCounter = 0;
		var tileClickedName = [];
		var tileClickedElement = [];
		$("#scorecounter").empty().append("<p>" + "Score: 0/8</p>");
		//location.reload(); //Temporary? page refresh
	});
	
	memoryTile.setup();
});