export function show(width, height) {
	const canvas = document.getElementById("canvas");
	canvas.width = width;
	canvas.height = height;
	canvas.parentElement.style.top = `calc(50% - ${height / 2}px)`
	canvas.parentElement.style.left = `calc(50% - ${width / 2}px)`
}
