let creed;
let pArray = [];
let score = 5;
let bg;
let gravity = .2;
let character;
let coinArray = [];

function preload(){
	bg = loadImage("https://cdn.glitch.com/89789daf-9937-4ff2-96e1-c8eb863c989d%2F1.jpg?1512583351787");
	character = loadImage("https://cdn.glitch.com/b45292a3-2ced-4887-af90-83c12162879b%2Flmao2.png?1512066652987");
	coin1 = loadImage("https://cdn.glitch.com/c25fd45b-e622-4a7f-9fba-d8a2da67c345%2FPNGPIX-COM-Bitcoin-PNG-Image.png?1512757389419");
	}

function setup() {
	createCanvas(windowWidth - 20, windowHeight - 20);
	let x = 100;
	let y = 100;
	creed = new Hero(x, y);
	resetPlat();
	resetCoins();
}

function draw() {
	background(bg);
	text("Score: " + score, 10, 10);
	creed.move();
	creed.show();
	creed.touchingCoin();
	drawAllPlatforms();
	checkForFall();
	rightReset();
	drawAllCoins();
}

function resetPlat(){
	pArray = [];
	for(var i=0;i<15;i++){
		let w = 250;
		let platx = random(0, windowWidth/3);
		let platy = random(50,height-20);
		pArray[i] = new Platform(platx,platy,w);
		creed.x = 10;
	}
	for(var i=0;i<15;i++){
		let w = 250;
		let platx = random(windowWidth/3, windowWidth * .667);
		let platy = random(50,height-20);
		pArray[i] = new Platform(platx,platy,w);
		creed.x = 10;
	}
	for(var i=0;i<15;i++){
		let w = 250;
		let platx = random(0, windowWidth-20);
		let platy = random(50,height-20);
		pArray[i] = new Platform(platx,platy,w);
		creed.x = 10;
	}
}

function resetCoins(){
	coinArray = [];
	for (var i=0; i < 10; i++){
		let w = 10;
		let platx = random(20, width-20);
		let platy = random(50,height-20);
		coinArray[i] = new Coin(platx,platy,w);
	}
}

function rightReset(){
	if(creed.x >= windowWidth){
		score++;
		creed.x = 0;
		creed.y = 0;
		resetPlat();
		resetCoins();
	}
	if(creed.x <= 0) {
		this.x = 0;
	}
}

function drawAllPlatforms(){
	for(var i=0;i<pArray.length;i++){
		pArray[i].show();
	}
}

function drawAllCoins(){
	for(var i=0;i<coinArray.length;i++){
		coinArray[i].show();
	}
}

function checkForFall() {
	if(creed.y > windowHeight - 20){
		score -= 3;
		creed.y = 0;
		creed.velocityy = 0;
		resetPlat();
		resetCoins();
	}
}

class Platform {
	constructor(platx, platy, w){
	this.x = platx;
	this.y = platy;
	this.width = w;
	this.height = 20;
	}
	show(){
		stroke("orange");
		strokeWeight(4);
		fill("purple");
		rect(this.x, this.y, this.width, this.height)
	}
	contains(givenX, givenY) {
		if(givenX > this.x && givenX < this.x + this.width) {
			if(givenY > this.y && givenY < this.y + this.height) {
				return true;
			}
		}
		return false;
	}
}

class Hero {
	constructor(x, y){
	this.x = 50;
	this.y = 50;
	this.velocityx = 100;
	this.velocityy = 100;
	this.height = 10;
	this.width = 20;
	}
	show() {
		ellipse(this.x, this.y, this.width, this.height);
		image(character, this.x-21, this.y-28);
	}
	
	touchingPlat(){
		for(var i = 0; i < pArray.length; i++){
			if(pArray[i].contains(this.x, this.y+10)){
				this.y = pArray[i].y - 10;
				return true;
			}
		}
		return false;
	}
	
	touchingCoin(){
		for(var i = 0; i < coinArray.length; i++){
			if(coinArray[i].contains(this.x, this.y+10)){
				score++;
				coinArray.splice(i,1);
				return true;
			}
		}
		return false;
	}
	
	move (){
			if(this.touchingPlat() == false){
				this.velocityy += gravity;
				this.y += this.velocityy;
			}else {
				this.velocityy = 0;
				//this.y = Platform.y - 10;
				if(keyIsDown(UP_ARROW)){
					this.velocityy = -9;
				}
			}
		
		if(keyIsDown(LEFT_ARROW)){
			this.x -= 6;
		}
		if(keyIsDown(RIGHT_ARROW)){
			this.x += 6;
		}
		if(keyIsDown(DOWN_ARROW)){
			this.y += 5;
		}
	}
}

class Coin {
	constructor(){
	this.x = random(width - 20);
	this.y = random(width - 20);
	this.width = 10;
	this.height = 10;
	}
	
	show() {
		stroke("orange");
		strokeWeight(4);
		fill("yellow");
		ellipse(this.x, this.y, this.width, this.height);
		image(coin1, this.x-18, this.y-18, 45, 45);
	}
	
	contains(){
		return dist(this.x, this.y, creed.x, creed.y) < 20;
	}
}

