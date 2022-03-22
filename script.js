const container = document.getElementById("contenido")
const heart = document.getElementById("heart");
const felicitaciones = document.getElementById("felicitaciones");
const carta = document.getElementById("carta");
const galeria = document.getElementById("galeria");

const abrirFelicitaciones = () => {
	heart.classList.toggle("open");
	felicitaciones.classList.toggle("open");
	container.style.background ="#ce3635";
};
const abrirCarta = () => {
	felicitaciones.classList.toggle("open");
	carta.classList.toggle("open");
	escribir(h1, speed);
setTimeout(() => {
	p.style.display = "inline-block";
	escribir(p, speed);
}, delay);
};
const abrirGaleria = () => {
	carta.classList.toggle("open");
	galeria.classList.toggle("open");
}
const btnAtras = (actual, atras) =>{
	alert("hola");
	actual.classList.toggle("open")
	atras.classList.toggle("open")
}
const escribir = (element, speed) => {
	let text = element.innerHTML;
	element.innerHTML = "";

	let i = 0;
	let timer = setInterval(() => {
		if (i < text.length) {
			element.append(text.charAt(i));
			i++;
		} else {
			clearInterval(timer);
		}
	}, speed);
};
let speed = 75;
let h1 = document.querySelector(".carta__titulo");
let p = document.querySelector(".carta__texto");
let delay = h1.innerHTML.length * speed + speed;

// escribir(h1, speed);
// setTimeout(() => {
// 	p.style.display = "inline-block";
// 	escribir(p, speed);
// }, delay);



var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

// Declarations
var FALL_SPEED;
var DRIFT_SPEED;
var ROTATE_SPEED;
var FLIP_SPEED;
var CONFETTI_LIMIT;
var CONFETTI_SIZE;
var CONFETTI_INTERVAL;
var RESOLUTION = 1;
var FPS = 60;

function initialize() {
	canvas.width = canvas.clientWidth / RESOLUTION;
	canvas.height = canvas.clientHeight / RESOLUTION;
	FALL_SPEED = (2 * 60) / FPS;
	DRIFT_SPEED = (1 * 60) / FPS;
	ROTATE_SPEED = (0.02 * 60) / FPS;
	FLIP_SPEED = (0.2 * 60) / FPS;
	CONFETTI_LIMIT = canvas.width / 10;
	CONFETTI_SIZE = 4 / RESOLUTION;
	CONFETTI_INTERVAL =
		(canvas.height * 1000) / (FALL_SPEED * 60 * CONFETTI_LIMIT);
}

initialize();

var confettiList = [];

function Confetti(xPosition, yPosition) {
	this.yPosition = yPosition || 0;
	this.xPosition = xPosition || canvas.width * Math.random();
	this.rotation = 0;
	this.flip = 0;
	this.ySpeed = (Math.random() * 0.5 + 0.5) * FALL_SPEED;
	this.xSpeed = (Math.random() * 2 - 1) * DRIFT_SPEED;
	this.rotationSpeed = (Math.random() * 2 - 1) * ROTATE_SPEED;
	this.flipSpeed = (Math.random() * 2 - 1) * FLIP_SPEED;
	this.hue = Math.random() * 360;
}

Confetti.prototype.step = function () {
	this.yPosition += this.ySpeed;
	this.xPosition += this.xSpeed;
	this.rotation += this.rotationSpeed;
	this.flip += this.flipSpeed;
};

Confetti.prototype.visible = function () {
	return (
		this.xPosition > 0 &&
		this.yPosition > 0 &&
		this.xPosition < canvas.width &&
		this.yPosition < canvas.height
	);
};

Confetti.prototype.color = function () {
	alpha = 1 - this.yPosition / canvas.height;
	saturation = (Math.pow(Math.sin(this.flip), 20) * 0.5 + 0.5) * 100;
	return "hsla(" + this.hue + ", 100%, " + saturation + "%, " + alpha + ")";
};

Confetti.prototype.draw = function () {
	context.fillStyle = this.color();
	context.resetTransform();
	context.translate(
		this.xPosition + CONFETTI_SIZE / 2,
		this.yPosition + CONFETTI_SIZE / 2
	);
	context.rotate(Math.PI * 2 * this.rotation);
	context.scale(Math.sin(this.flip), 1);
	context.fillRect(
		-CONFETTI_SIZE / 2,
		-CONFETTI_SIZE / 2,
		CONFETTI_SIZE,
		CONFETTI_SIZE
	);
};

var lastTime = Date.now();
var lastMakeTime = lastTime;
var xMousePosition;
var yMousePosition;
// Animation Loop
function animate() {
	var nextTime = Date.now();
	requestAnimationFrame(animate);
	if (nextTime - lastTime < 1000 / FPS) {
		return;
	}
	lastTime = nextTime;
	context.resetTransform();
	context.clearRect(0, 0, canvas.width, canvas.height);
	if (
		confettiList.length < CONFETTI_LIMIT &&
		nextTime - lastMakeTime > CONFETTI_INTERVAL
	) {
		confettiList.push(new Confetti(xMousePosition, yMousePosition));
		lastMakeTime = nextTime;
	}
	confettiList.forEach(function (confetti) {
		confetti.step();
		confetti.draw();
	});
	confettiList = confettiList.filter(function (confetti) {
		return confetti.visible();
	});
}

function mouseDraw(event) {
	xMousePosition = event.clientX;
	yMousePosition = event.clientY;
}

canvas.addEventListener("mousedown", function (event) {
	canvas.addEventListener("mousemove", mouseDraw);
	xMousePosition = event.clientX;
	yMousePosition = event.clientY;
});

canvas.addEventListener("mouseup", function (event) {
	canvas.removeEventListener("mousemove", mouseDraw);
	xMousePosition = null;
	yMousePosition = null;
});

window.addEventListener("resize", initialize);

animate();

