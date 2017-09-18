$(document).ready(function() {

	var scoreboard = {wins:0,loses:0};
	var game = new crystalCollector();
	initGameDisplay(game);

});		

function crystalCollector(){ // CrystalCollector game obj
	this.point = rng(19, 120);
	this.crystals = [rng(1,12),rng(1,12),rng(1,12),rng(1,12)];
	this.player = 0;	

	this.collectCrystal = function(n){
		this.player += this.crystals[n];			
	}

	this.getGameState = function(){ // 0-picking crystals, 1-win, 2-loss
		return this.point - this.player > 0 ? 0 : (this.point - this.player < 0 ? 2 : 1);
	}
}

function initGameDisplay(g){

	$('#crystal-buttons').empty();
	$('#collection').empty();
	$('#player').empty();
	$('#point').empty();				
	
	var colors = ['blue', 'green', 'grey', 'orange', 'pink', 'yellow'];
	
	g.crystals.forEach(function(element, index){

		var color = colors.splice(Math.floor(colors.length * Math.random()), 1);
		var crystal = $("<span>").addClass("crystal d-inline-block");		
		crystal.css({'background-image': 'url(assets/img/crystal-' + color + '.png)'});
		crystal.attr({'data-index': index, 'data-color': color});

		crystal.on("click", function() {
			if(g.getGameState() === 0){
	      g.collectCrystal($(this).attr("data-index"));
	      updateGameDisplay(g, $(this));}});//end onClick

		$('#crystal-buttons').append(crystal);		
	});// end forEach

	$('#player').html(g.player);
	$('#point').html(g.point);	
}

function updateGameDisplay(g, clicked){
	var crystal = $("<span>").addClass("crystal d-inline-block");
	crystal.css({'background-image': 'url(assets/img/crystal-' + clicked.attr("data-color") + '.png)'});
	$('#collection').append(crystal);
	$('#player').html(g.player);
	$('#point').html(g.point);
}

function rng(low, high){
	return Math.floor(Math.random() * (high - low + 1)) + low;
}

