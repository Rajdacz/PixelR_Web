export function canvasShow(width, height) {
	const canvas = document.getElementById("canvas");
	canvas.width = width;
	canvas.height = height;
	canvas.style.top = `calc(50% - ${height / 2}px)`;
	canvas.style.left = `calc(50% - ${width / 2}px)`;
}

export function canvasHide() {
	const canvas = document.getElementById("canvas");
	canvas.width = 0;
	canvas.height = 0;
}
