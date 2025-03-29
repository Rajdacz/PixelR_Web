export function setupMenu() {
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
	document
		.getElementById("logo")
		.addEventListener("click", () => toggleMenu(""));
}
