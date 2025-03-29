let canvas, container;
let newX = 0,
	newY = 0,
	startX = 0,
	startY = 0;
let scale = 1,
	lastDist = 0;

export function canvasShow(width, height) {
	canvas = document.getElementById("canvas");
	canvas.width = width;
	canvas.height = height;
	canvas.style.top = `calc(50% - ${height / 2}px)`;
	canvas.style.left = `calc(50% - ${width / 2}px)`;
}

export function setupCanvasControls() {
	canvas = document.getElementById("canvas");
	container = document.getElementById("canvas-container");

	container.addEventListener("wheel", zoomCanvas);
	container.addEventListener("touchmove", pinchZoom);
	container.addEventListener("touchend", () => (lastDist = 0));

	container.addEventListener("mousedown", startDrag);
	document.addEventListener("mouseup", stopDrag);
	container.addEventListener("touchstart", startDrag);
	document.addEventListener("touchend", stopDrag);
}

function startDrag(event) {
	let clientX = event.touches ? event.touches[0].clientX : event.clientX;
	let clientY = event.touches ? event.touches[0].clientY : event.clientY;
	startX = clientX;
	startY = clientY;

	document.addEventListener("mousemove", mousemove);
	document.addEventListener("touchmove", mousemove);
}

function stopDrag() {
	document.removeEventListener("mousemove", mousemove);
	document.removeEventListener("touchmove", mousemove);
}

function mousemove(event) {
	let clientX = event.touches ? event.touches[0].clientX : event.clientX;
	let clientY = event.touches ? event.touches[0].clientY : event.clientY;

	newX = startX - clientX;
	newY = startY - clientY;
	startX = clientX;
	startY = clientY;

	canvas.style.top = `${canvas.offsetTop - newY}px`;
	canvas.style.left = `${canvas.offsetLeft - newX}px`;
}

function zoomCanvas(event) {
	event.preventDefault();
	let scaleAmount = event.deltaY < 0 ? 0.1 : -0.1;
	scale = Math.min(Math.max(scale + scaleAmount, 0.1), 3);
	canvas.style.transform = `scale(${scale})`;
}

function pinchZoom(event) {
	if (event.touches.length === 2) {
		event.preventDefault();
		let touch1 = event.touches[0];
		let touch2 = event.touches[1];

		let dist = Math.hypot(
			touch2.clientX - touch1.clientX,
			touch2.clientY - touch1.clientY
		);

		if (lastDist) {
			let scaleAmount = (dist - lastDist) * 0.005;
			scale = Math.min(Math.max(scale + scaleAmount, 0.1), 3);
			canvas.style.transform = `scale(${scale})`;
		}

		lastDist = dist;
	}
}
