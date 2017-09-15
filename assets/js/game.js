$(document).ready(function() {

	var scoreboard = {wins:0,loses:0};
	var game = new crystalCollector();
	
	

	function crystalCollector(){ // CrystalCollector game obj
		this.point = rng(19, 120);
		this.crystals = [rng(1,12),rng(1,12),rng(1,12),rng(1,12)];
		this.player = 0;
		createCrystalButtons(this);

		this.clickCrystal = function(n){
			this.player += this.crystals[n];			
		}

		this.gameState = function(){ // 0-guess, 1-win, 2-loss
			return this.point - this.player > 0 ? 0 : (this.point - this.player < 0 ? 2 : 1);
		}
	}

	function createCrystalButtons(theGame){				
		
		var colors = ['blue', 'green', 'grey', 'orange', 'pink', 'yellow'];
		theGame.crystals.forEach(function(element, index){

			var color = colors.splice(Math.floor(colors.length * Math.random()), 1);
			var crystal = $("<span>").addClass("crystal d-inline-block");						
			
			crystal.css({'background-image': 'url(assets/img/crystal-' + color + '.png)'});
			crystal.attr({'data-index': index, 'data-color': color});

			crystal.on("click", function() {
	      theGame.clickCrystal($(this).attr("data-index"));
	      collectCrystal($(this).attr("data-color"));
	    });

			$('#crystal-buttons').append(crystal);
		});	// end forEach()	
	} // end createCrystalButtons()

	function collectCrystal(color){
		var crystal = $("<span>").addClass("crystal d-inline-block");
		crystal.css({'background-image': 'url(assets/img/crystal-' + color + '.png)'});
		$('#collection').append(crystal);
	} 

	function rng(low, high){
		return Math.floor(Math.random() * (high - low + 1)) + low;
	}//end rng()

});