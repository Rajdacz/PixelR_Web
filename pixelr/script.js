import { canvasShow } from "./canvas.js";

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

function toggleMenu(targetId) {
	const sections = document.querySelectorAll(".section");
	sections.forEach((section) => {
		if (section.id === targetId) {
			section.classList.toggle("expanded");
			section.classList.toggle("collapsed");
		} else {
			section.classList.remove("expanded");
			section.classList.add("collapsed");
		}
	});
}

document
	.getElementById("file")
	.addEventListener("click", () => toggleMenu("main-menu"));
document
	.getElementById("edit")
	.addEventListener("click", () => toggleMenu("edit-menu"));
document
	.getElementById("help")
	.addEventListener("click", () => toggleMenu("help-menu"));
document.getElementById("logo").addEventListener("click", () => toggleMenu(""));

// Theme toggle functions
function setTheme(theme) {
	const themeProperties =
		theme === "dark"
			? {
					bgColor: "var(--dark-bg-primary)",
					textColor: "var(--dark-text-light)",
					bgSecondaryColor: "var(--dark-bg-secondary)",
					textSecondaryColor: "var(--dark-text-secondary)",
					shadow: "var(--dark-shadow)",
					buttonColor: "var(--primary-500)",
					buttonUrl: "var(--dark-button-url)",
					themeIconSrc: "assets/moon.png",
			  }
			: {
					bgColor: "var(--light-bg-primary)",
					textColor: "var(--light-text-dark)",
					bgSecondaryColor: "var(--light-bg-secondary)",
					textSecondaryColor: "var(--light-text-secondary)",
					shadow: "var(--light-shadow)",
					buttonColor: "var(--primary-500)",
					buttonUrl: "var(--light-button-url)",
					themeIconSrc: "assets/sun.png",
			  };

	document.documentElement.style.setProperty(
		"--bg-color",
		themeProperties.bgColor
	);
	document.documentElement.style.setProperty(
		"--text-color",
		themeProperties.textColor
	);
	document.documentElement.style.setProperty(
		"--bg-secondary-color",
		themeProperties.bgSecondaryColor
	);
	document.documentElement.style.setProperty(
		"--text-secondary-color",
		themeProperties.textSecondaryColor
	);
	document.documentElement.style.setProperty(
		"--shadow",
		themeProperties.shadow
	);
	document.documentElement.style.setProperty(
		"--primary-button-color",
		themeProperties.buttonColor
	);
	document.documentElement.style.setProperty(
		"--button-url",
		themeProperties.buttonUrl
	);
	document.querySelector("#theme-toggle img").src =
		themeProperties.themeIconSrc;
}

function updateThemeIcon() {
	const currentTheme = getComputedStyle(document.documentElement)
		.getPropertyValue("--bg-color")
		.trim();
	const isDark =
		currentTheme ===
		getComputedStyle(document.documentElement)
			.getPropertyValue("--dark-bg-primary")
			.trim();
	document.querySelector("#theme-toggle img").src = isDark
		? "assets/moon.png"
		: "assets/sun.png";
}

const themeToggleButton = document.getElementById("theme-toggle");
themeToggleButton.addEventListener("click", () => {
	const currentTheme = getComputedStyle(document.documentElement)
		.getPropertyValue("--bg-color")
		.trim();
	setTheme(
		currentTheme ===
			getComputedStyle(document.documentElement)
				.getPropertyValue("--dark-bg-primary")
				.trim()
			? "light"
			: "dark"
	);

	updateThemeIcon();
});

updateThemeIcon();

// Modal management
let currentModalName;

function showModal(name, content) {
	document.getElementById("modal-content").innerHTML = content;
	document.getElementById("modal").classList.add("shown");
	document.getElementById("modal").classList.remove("hidden");
	currentModalName = name;
}

function hideModal() {
	const modal = document.getElementById("modal");
	modal.classList.add("hidden");
	modal.classList.remove("shown");
}

document.getElementById("modal").addEventListener("click", hideModal);
document
	.getElementById("modal-content")
	.addEventListener("click", (event) => event.stopPropagation());

document.getElementById("new-project").addEventListener("click", () => {
	showModal(
		"new-project",
		`<button id="modal-submit" class="button primary-button">OK</button>
		<button id="modal-close" class="button secondary-button">Cancel</button>
		<p>Project name</p>
		<input class="input" id="modal-new-project-name" maxlength="32" />
		<p>Size</p>
		<input class="input" id="modal-new-project-width" type="number" placeholder="Width"/>
		<input class="input" id="modal-new-project-height" placeholder="Height" type="number"/>`
	);

	document
		.getElementById("modal-submit")
		.addEventListener("click", () => submitModal(currentModalName));
	document.getElementById("modal-close").addEventListener("click", hideModal);

	document
		.getElementById("modal-new-project-name")
		.addEventListener("input", () => {
			checkNumberInputRange(
				document.getElementById("modal-new-project-name"),
				1,
				Infinity
			);
		});

	["modal-new-project-width", "modal-new-project-height"].forEach((id) => {
		document.getElementById(id).addEventListener("input", () => {
			checkNumberInputRange(document.getElementById(id), 1, Infinity);
		});
	});
});

function checkNumberInputRange(input, min, max) {
	if (Number(input.value) < min || Number(input.value) > max) {
		input.style.borderImage = 'url("assets/buttons/danger.png") 3 fill';
		input.style.borderImageWidth = "var(--margin-m)";
		return false;
	} else {
		input.style.borderImage = "var(--button-url) 3 fill";
		input.style.borderImageWidth = "var(--margin-m)";
		return true;
	}
}

function checkTextInputLength(input, min, max) {
	if (Number(input.value.length) < min || Number(input.value.length) > max) {
		input.style.borderImage = 'url("assets/buttons/danger.png") 3 fill';
		input.style.borderImageWidth = "var(--margin-m)";
		return false;
	} else {
		input.style.borderImage = "var(--button-url) 3 fill";
		input.style.borderImageWidth = "var(--margin-m)";
		return true;
	}
}

function submitModal(currentModalName) {
	if (currentModalName === "new-project") {
		const isWidthValid = checkNumberInputRange(
			document.getElementById("modal-new-project-width"),
			1,
			Infinity
		);
		const isHeightValid = checkNumberInputRange(
			document.getElementById("modal-new-project-height"),
			1,
			Infinity
		);
		const isNameValid = checkTextInputLength(
			document.getElementById("modal-new-project-name"),
			1,
			32
		);

		if (isWidthValid && isHeightValid && isNameValid) {
			hideModal();
			canvasShow(
				document.getElementById("modal-new-project-width").value,
				document.getElementById("modal-new-project-height").value
			);
		}
	}
}

// Canvas
let canvas = document.getElementById("canvas");
let container = document.getElementById("canvas-container");
let newX = 0,
	newY = 0,
	startX = 0,
	startY = 0;
let scale = 1;
let lastDist = 0;

function startDrag(event) {
	let clientX, clientY;

	if (event.touches) {
		clientX = event.touches[0].clientX;
		clientY = event.touches[0].clientY;
	} else {
		clientX = event.clientX;
		clientY = event.clientY;
	}

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
	let clientX, clientY;

	if (event.touches) {
		clientX = event.touches[0].clientX;
		clientY = event.touches[0].clientY;
	} else {
		clientX = event.clientX;
		clientY = event.clientY;
	}

	newX = startX - clientX;
	newY = startY - clientY;

	startX = clientX;
	startY = clientY;

	canvas.style.top = canvas.offsetTop - newY + "px";
	canvas.style.left = canvas.offsetLeft - newX + "px";
}

// Obsługa scrolla do zoomowania
container.addEventListener("wheel", function (event) {
	event.preventDefault();

	let scaleAmount = event.deltaY < 0 ? 0.1 : -0.1;
	scale = Math.min(Math.max(scale + scaleAmount, 0.1), 3);

	canvas.style.transform = `scale(${scale})`;
});

// Obsługa pinch-to-zoom na dotyku
container.addEventListener("touchmove", function (event) {
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
});

// Reset dystansu po zakończeniu dotyku
container.addEventListener("touchend", function () {
	lastDist = 0;
});

container.addEventListener("mousedown", startDrag);
document.addEventListener("mouseup", stopDrag);

container.addEventListener("touchstart", startDrag);
document.addEventListener("touchend", stopDrag);

canvasShow(200, 200);
