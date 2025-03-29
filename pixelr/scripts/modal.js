export function setupModal() {
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
	});
}
