

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
					$("#scorecounter").empty().append("<p>" + "Monsters: " + scoreCounter + "/8</p>");
					if ( scoreCounter == 8 ) {
						proofofahero.pause();
						questclear.play();
						$('.deselected').addClass("finished").removeClass("deselected");
						$('.selected').addClass("finished").removeClass("selected");
						$('.matched').addClass("finished").removeClass("matched");
						$("#scorecounter").empty().append("<p>QUEST CLEAR!</p>");
						$("#startbutton").css('visibility', 'visible');
						$("#startbutton").empty().append("<p>Depart on the next hunt!</p>");
						$("#startbutton").fadeTo( 400, 1);
						$(".tile").fadeTo( 400, 0);
						$(".tile").children().fadeTo(400, 0);
						window.setTimeout( function () { 
							$("#startbutton").click(function() {
								location.reload();
							});
						},1000);
					}
				},500);
			}
			
		}
		
	}
	
	
	var tileClickedName = [];
	var tileClickedElement = [];
	
	var pairCounter = 0
	var scoreCounter = 0
	
	var proofofahero = document.getElementById("proofofahero");
	var questclear = document.getElementById("questclear");
	var questfailed = document.getElementById("questfailed");
	
	var vol = 0.5;
	questclear.volume= vol;
	proofofahero.volume= vol;
	questfailed.volume= vol;

$( document ).ready(function() {

	$("#startbutton").click(function() {

		if ( $(':animated').length ) {
			return false;
		} else {
			$("#startbutton").fadeTo( 400, 0);
			window.setTimeout( function () {
				$("#startbutton").css('visibility', 'hidden');
			},500);
		}
		
		$("#scorecounter").empty().append("<p>Monsters: 0/8</p>");
		
		window.setTimeout( function () {
			if ( scoreCounter != 8 ) {
				scoreCounter = 0;
				proofofahero.pause();
				questfailed.play();
				$("#scorecounter").empty().append("<p>QUEST FAILED...</p>");
				$("#startbutton").css('visibility', 'visible');
				$("#startbutton").empty().append("<p>Return to camp?</p>");
				$("#startbutton").fadeTo( 400, 1);
				$('.deselected').addClass("finished").removeClass("deselected");
				$('.selected').addClass("finished").removeClass("selected");
				$('.matched').addClass("finished").removeClass("matched");
				$("#startbutton").click(function() {
					location.reload();
				});
			} else {
				
			}
		},93000); //93000 for easy
		
		proofofahero.play();
		proofofahero.currentTime = 0;
		
		
		
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

	
	$("#volumemute").click(function() {
		if ( $(this).hasClass("muted") ) {
			$('#volumemute').removeClass("muted");
				vol = 0.5;
				var volrounded = Math.round( vol * 10 ) / 10;
				questclear.volume= vol;
				proofofahero.volume= vol;
				questfailed.volume= vol;
				$("#volumedisplay").empty().append("<p>Volume:</p>" + "<p>" + volrounded + "</p>");
		} else {
			$('#volumemute').addClass("muted");
				vol = 0;
				var volrounded = Math.round( vol * 10 ) / 10;
				questclear.volume= vol;
				proofofahero.volume= vol;
				questfailed.volume= vol;
				$("#volumedisplay").empty().append("<p>Volume:</p>" + "<p>" + "Muted" + "</p>");
		}
	});	
	
	$("#volumeup").click(function() {
		if ( vol < 1 ) {
			vol = vol + 0.1;
			var volrounded = Math.round( vol * 10 ) / 10;
			questclear.volume= vol;
			proofofahero.volume= vol;
			questfailed.volume= vol;
			$("#volumedisplay").empty().append("<p>Volume:</p>" + "<p>" + volrounded + "</p>");
		} else {
			
		}
	});	
	
	$("#volumedown").click(function() {
		if ( vol > 0 ) {
			vol = vol - 0.1;
			var volrounded = Math.round( vol * 10 ) / 10;
			questclear.volume= vol;
			proofofahero.volume= vol;
			questfailed.volume= vol;
			$("#volumedisplay").empty().append("<p>Volume:</p>" + "<p>" + volrounded + "</p>");
		} else {
			
		}
	});		
	
	
	
	memoryTile.setup();
});









