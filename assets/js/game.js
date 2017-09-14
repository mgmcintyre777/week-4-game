$(document).ready(function() {

	var scoreboard = {wins:0,loses:0};
	var game = new crystalCollector();
	

	function crystalCollector(){
		this.point = rng(19, 120);
		this.crystals = [rng(1,12),rng(1,12),rng(1,12),rng(1,12)];
		this.player = 0;
		createCrystalButtons(this);

		this.clickCrystal = function(n){
			this.player += this.crystals[n];
			console.log("p:", this.point, "s:", this.player, "i:", n, "v:", this.crystals[n], "obj:", this);
		}

		this.gameState = function(){ // 0-guess, 1-win, 2-loss
			return this.point - this.player > 0 ? 0 : (this.point - this.player < 0 ? 2 : 1);
		}
	}

	function rng(low, high){
		return Math.floor(Math.random() * (high - low + 1)) + low;
	}

	function createCrystalButtons(theGame){
		var colors = ['blue', 'green', 'grey', 'orange', 'pink', 'yellow'];		
		theGame.crystals.forEach(function(element, index){			
			var crystal = $("<Div>");
			var color = colors.splice(Math.floor(colors.length * Math.random()), 1);			
			crystal.css({'background-image': 'url(assets/img/crystal-' + color + '.png)'});
			crystal.addClass("crystal");
			crystal.attr('data-index', index);
			crystal.on("click", function() {
        theGame.clickCrystal($(this).attr("data-index"));
     	});
			$('#crystal-options').append(crystal);
		})
		
	}

	//game = new crystalCollector();

});