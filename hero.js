let creed;
let p;

function setup() {
	createCanvas(1000, 750);
	let x = 100;
	let y = 100;
	let _x = 10;
	let _y = 5;
	let width = 200;
	creed = new Hero();
	p = new Platform(_x, _y, width);
}

function draw() {
	creed.show();
	p.show();
}

class Platform() {
	constructor(_x, _y, width){
	this._x = _x;
	this._y = _y;
	this.width = width;
	this.height = 20;
	}
	show(){
		stroke(255);
		strokeWeight(4);
		fill(155);
		rect(this.x, this.y, this.height, this.width)
	}
}

class Hero() {
	constructor(){
	this.x = x;
	this.y = y;
	this.velocityx = x;
	this.velocityy = y;
	this.height = height;
	this.width = width;
	}
	show() {
	ellipse(this.x, this.y, this.height, this.width)
	}
	
	move (){
		if(keyIsDown(LEFT_ARROW))
			this.x -= 5;
	}
}

