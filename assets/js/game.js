var scoreboard = {wins:0,loses:0};
var game = new crystalCollector();


function crystalCollector(){
	this.point = rng(19, 120);
	this.crystals = [rng(1,12),rng(1,12),rng(1,12),rng(1,12)];
	this.player = 0;

	this.hitCrystal = function(n){
		this.player += this.crystals[n];
	}

	this.gameState = function(){ // 0-guess, 1-win, 2-loss
		return this.point - this.player > 0 ? 0 : (this.point - this.player < 0 ? 2 : 1);
	}

}

function rng(low, high){
	return Math.floor(Math.random() * (high - low + 1)) + low;
}