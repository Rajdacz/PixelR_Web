import { canvasShow, setupCanvasControls } from "./scripts/canvas.js";
import { setupModal } from "./scripts/modal.js";
import { setupMenu } from "./scripts/menu.js";
import { setupThemeToggle } from "./scripts/theme.js";

// ✅ Service Worker
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		let swPath = `${window.location.pathname.replace(
			/index.html$/,
			""
		)}serviceWorker.js`;

		navigator.serviceWorker
			.register(swPath)
			.then((registration) => {
				console.log(
					"Service Worker registered with scope:",
					registration.scope
				);
			})
			.catch((error) => {
				console.log("Service Worker registration failed:", error);
			});
	});
}

// ✅ Functions setup
document.addEventListener("DOMContentLoaded", () => {
	setupMenu();
	setupThemeToggle();
	setupModal();
	canvasShow(200, 200);
	setupCanvasControls();
});
