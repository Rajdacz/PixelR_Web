if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    let swPath = `${window.location.pathname.replace(
      /index.html$/,
      ""
    )}serviceWorker.js`;
    
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

function setDarkTheme() {
	document.querySelector("#theme-toggle img").src = "assets/moon.png";
	document.documentElement.style.setProperty(
		"--bg-color",
		"var(--dark-bg-primary)"
	);
	document.documentElement.style.setProperty(
		"--text-color",
		"var(--dark-text-light)"
	);
	document.documentElement.style.setProperty(
		"--bg-secondary-color",
		"var(--dark-bg-secondary)"
	);
	document.documentElement.style.setProperty(
		"--text-secondary-color",
		"var(--dark-text-secondary)"
	);
	document.documentElement.style.setProperty(
		"--primary-button-color",
		"var(--primary-500)"
	);
	document.documentElement.style.setProperty(
		"--button-url",
		"var(--dark-button-url)"
	);
}

function setLightTheme() {
	document.querySelector("#theme-toggle img").src = "assets/sun.png";
	document.documentElement.style.setProperty(
		"--bg-color",
		"var(--light-bg-primary)"
	);
	document.documentElement.style.setProperty(
		"--text-color",
		"var(--light-text-dark)"
	);
	document.documentElement.style.setProperty(
		"--bg-secondary-color",
		"var(--light-bg-secondary)"
	);
	document.documentElement.style.setProperty(
		"--text-secondary-color",
		"var(--light-text-secondary)"
	);
	document.documentElement.style.setProperty(
		"--primary-button-color",
		"var(--primary-500)"
	);
	document.documentElement.style.setProperty(
		"--button-url",
		"var(--light-button-url)"
	);
}

function updateThemeIcon() {
	const themeIcon = document.querySelector("#theme-toggle img");
	const currentTheme = getComputedStyle(document.documentElement)
		.getPropertyValue("--bg-color")
		.trim();

	if (
		currentTheme ===
		getComputedStyle(document.documentElement)
			.getPropertyValue("--dark-bg-primary")
			.trim()
	) {
		themeIcon.src = "assets/moon.png";
	} else {
		themeIcon.src = "assets/sun.png";
	}
}

const themeToggleButton = document.getElementById("theme-toggle");

themeToggleButton.addEventListener("click", () => {
	const currentTheme = getComputedStyle(document.documentElement)
		.getPropertyValue("--bg-color")
		.trim();

	if (
		currentTheme ===
		getComputedStyle(document.documentElement)
			.getPropertyValue("--dark-bg-primary")
			.trim()
	) {
		setLightTheme();
	} else {
		setDarkTheme();
	}

	document.body.style.transition =
		"background-color 0.3s, color 0.3s, border-color 0.3s";
});

updateThemeIcon();
