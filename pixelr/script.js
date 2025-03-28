import { show } from "./canvas.js";

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		let swPath = `${window.location.pathname.replace(/index.html$/, "")}serviceWorker.js`;

		navigator.serviceWorker
			.register(swPath)
			.then((registration) => {
				console.log("Service Worker registered with scope:", registration.scope);
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

document.getElementById("file").addEventListener("click", () => toggleMenu("main-menu"));
document.getElementById("edit").addEventListener("click", () => toggleMenu("edit-menu"));
document.getElementById("help").addEventListener("click", () => toggleMenu("help-menu"));
document.getElementById("logo").addEventListener("click", () => toggleMenu(""));

// Theme toggle functions
function setTheme(theme) {
	const themeProperties = theme === 'dark' ? {
		bgColor: "var(--dark-bg-primary)",
		textColor: "var(--dark-text-light)",
		bgSecondaryColor: "var(--dark-bg-secondary)",
		textSecondaryColor: "var(--dark-text-secondary)",
		shadow: "var(--dark-shadow)",
		buttonColor: "var(--primary-500)",
		buttonUrl: "var(--dark-button-url)",
		themeIconSrc: "assets/moon.png"
	} : {
		bgColor: "var(--light-bg-primary)",
		textColor: "var(--light-text-dark)",
		bgSecondaryColor: "var(--light-bg-secondary)",
		textSecondaryColor: "var(--light-text-secondary)",
		shadow: "var(--light-shadow)",
		buttonColor: "var(--primary-500)",
		buttonUrl: "var(--light-button-url)",
		themeIconSrc: "assets/sun.png"
	};

	document.documentElement.style.setProperty("--bg-color", themeProperties.bgColor);
	document.documentElement.style.setProperty("--text-color", themeProperties.textColor);
	document.documentElement.style.setProperty("--bg-secondary-color", themeProperties.bgSecondaryColor);
	document.documentElement.style.setProperty("--text-secondary-color", themeProperties.textSecondaryColor);
	document.documentElement.style.setProperty("--shadow", themeProperties.shadow);
	document.documentElement.style.setProperty("--primary-button-color", themeProperties.buttonColor);
	document.documentElement.style.setProperty("--button-url", themeProperties.buttonUrl);
	document.querySelector("#theme-toggle img").src = themeProperties.themeIconSrc;
}

function updateThemeIcon() {
	const currentTheme = getComputedStyle(document.documentElement).getPropertyValue("--bg-color").trim();
	const isDark = currentTheme === getComputedStyle(document.documentElement).getPropertyValue("--dark-bg-primary").trim();
	document.querySelector("#theme-toggle img").src = isDark ? "assets/moon.png" : "assets/sun.png";
}

const themeToggleButton = document.getElementById("theme-toggle");
themeToggleButton.addEventListener("click", () => {
	const currentTheme = getComputedStyle(document.documentElement).getPropertyValue("--bg-color").trim();
	setTheme(currentTheme === getComputedStyle(document.documentElement).getPropertyValue("--dark-bg-primary").trim() ? 'light' : 'dark');
	
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
document.getElementById("modal-content").addEventListener("click", (event) => event.stopPropagation());

document.getElementById("new-project").addEventListener("click", () => {
	showModal("new-project",
		`<button id="modal-submit" class="button primary-button">OK</button>
		<button id="modal-close" class="button secondary-button">Cancel</button>
		<p>Project name</p>
		<input class="input" id="modal-new-project-name" />
		<p>Size</p>
		<input class="input" id="modal-new-project-width" type="number" placeholder="Width"/>
		<input class="input" id="modal-new-project-height" placeholder="Height" type="number"/>`
	);

	document.getElementById("modal-submit").addEventListener("click", () => submitModal(currentModalName));
	document.getElementById("modal-close").addEventListener("click", hideModal);

	["modal-new-project-width", "modal-new-project-height"].forEach(id => {
		document.getElementById(id).addEventListener("input", () => {
			checkNumberInputRange(document.getElementById(id), 1, 100);
		});
	});

	// Initial validation
	checkNumberInputRange(document.getElementById("modal-new-project-width"), 1, 100);
	checkNumberInputRange(document.getElementById("modal-new-project-height"), 1, 100);
});

function checkNumberInputRange(input, min, max) {
	if (Number(input.value) < min || Number(input.value) > max) {
		input.style.filter = "brightness(0.7) sepia(1) saturate(100%) hue-rotate(-50deg)";
		return false
	} else {
		input.style.filter = "brightness(1) sepia(0) saturate(0%) hue-rotate(0deg)";
		return true
	}
}

function submitModal(currentModalName) {
	hideModal();
	if (currentModalName === "new-project") {
		console.log("Project created!");
	}
}

// Canvas
show(100, 100)