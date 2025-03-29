export function setupThemeToggle() {
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
}

export function setTheme(theme) {
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

export function updateThemeIcon() {
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
