$(document).ready(function() {	

	var scoreboard = {wins:0,loses:0};
	var game = new crystalCollector();
	initGameDisplay(game, scoreboard);

	$("#newgame").on("click", function(){
		if(game.getGameState() == 0) scoreboard.loses++;
		game = new crystalCollector();
		initGameDisplay(game, scoreboard);
	});

});		

function crystalCollector(){ // CrystalCollector game obj
	this.point = rng(19, 120);
	this.crystals = [rng(1,12),rng(1,12),rng(1,12),rng(1,12)];
	this.player = 0;	

	this.collectCrystal = function(n){
		this.player += this.crystals[n];			
	}

	this.getGameState = function(){ // 0-picking crystals, 1-win, 2 -loss
		return this.point - this.player > 0 ? 0 : (this.point - this.player < 0 ? 2 : 1);
	}
}

function initGameDisplay(g, s){

	$('#crystal-buttons').empty();
	$('#collection').empty();
	$('#player').empty();
	$('#point').empty();

	
	var colors = ['blue', 'green', 'grey', 'orange', 'pink', 'yellow'];
	
	g.crystals.forEach(function(element, index){

		var color = colors.splice(Math.floor(colors.length * Math.random()), 1);
		var crystal = $("<span>").addClass("crystal d-inline-block");		
		crystal.css({'background-image': 'url(assets/img/crystal-' + color + '.png)'});
		crystal.css( 'cursor', 'pointer' );
		crystal.attr({'data-index': index, 'data-color': color});

		crystal.on("click", function() {
			if(g.getGameState() === 0){
	      g.collectCrystal($(this).attr("data-index"));
	      if(g.getGameState() == 1) s.wins++;
	      if(g.getGameState() == 2) s.loses++; 
	      updateGameDisplay(g, s, $(this));}
	      });//end onClick

		$('#crystal-buttons').append(crystal);		
	});// end forEach

	$('#player').html(g.player);
	$('#point').html(g.point);
	$('#newgame').css( 'cursor', 'pointer' );
	$('#newgame').html("Surrender!")
	$('#title').html("Crystal Collector - wins: " + s.wins + " loses: " + s.loses);		
}

function updateGameDisplay(g, s, clicked){
	var crystal = $("<span>").addClass("crystal d-inline-block");
	crystal.css({'background-image': 'url(assets/img/crystal-' + clicked.attr("data-color") + '.png)'});
	$('#collection').append(crystal);
	$('#player').html(g.player);
	$('#point').html(g.point);
	if(g.getGameState() == 1) $('#newgame').html("You Won (Play Again)");
	if(g.getGameState() == 2) $('#newgame').html("You Lost (Play Again)");
	$('#title').html("Crystal Collector - wins: " + s.wins + " loses: " + s.loses);
}

function rng(low, high){
	return Math.floor(Math.random() * (high - low + 1)) + low;
}