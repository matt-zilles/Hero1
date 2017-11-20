let creed;
let p;
let score = 100;

function setup() {
	createCanvas(1000, 750);
	let x = 100;
	let y = 100;
	let platx = 10;
	let platy = 500;
	let width = 200;
	creed = new Hero(x, y);
	p = new Platform(platx, platy, width);
}

function draw() {
	background("turquoise");
	creed.move();
	creed.show();
	p.show();
	text("Score: " + score, 10, 10);
	checkForFall();
}

function checkForFall() {
	if(creed.y > 750){
		score--;
		creed.y = 0;
	}
}

class Platform {
	constructor(_x, _y, width){
	this.x = _x;
	this.y = _y;
	this.width = width;
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
	this.x = x;
	this.y = y;
	this.velocityx = x;
	this.velocityy = y;
	this.height = 10;
	this.width = 20;
	}
	show() {
	ellipse(this.x, this.y, this.height, this.width)
	}
	
	move (){
		if(keyIsDown(LEFT_ARROW)){
			this.x -= 5;
		}
		if(keyIsDown(RIGHT_ARROW)){
			this.x += 5;
		}
		if(keyIsDown(UP_ARROW)){
			this.y -= 5;
		}
		if(keyIsDown(DOWN_ARROW)){
			this.y += 5;
		}
		if(p.contains(this.x, this.y) == false) {
			this.y++;
		}
	}
}

