const tabContainer = document.querySelector("[role='tablist']");
const tabItems = tabContainer.querySelectorAll("[role='tab']");

let focusedTab = 0;
tabContainer.addEventListener("keydown", changeTabFocus);

tabItems.forEach((item) => {
	item.addEventListener("click", changePanelFocus);
})

function changeTabFocus(event){
	const currentKey = event.keyCode;
	const arrowLeft = 37;
	const arrowRight = 39;

	if(currentKey === arrowLeft || currentKey === arrowRight){
		tabItems[focusedTab]
		.setAttribute("tabindex", -1);

		if(currentKey == arrowLeft){
			focusedTab--;

			if(focusedTab < 0){
				focusedTab = tabItems.length - 1;
			}

		} else if(currentKey == arrowRight){
			focusedTab++;

			if(focusedTab >= tabItems.length){
				focusedTab = 0;
			}
		}

		tabItems[focusedTab]
		.setAttribute("tabindex", 0);

		tabItems[focusedTab].focus();
	}
}

function changePanelFocus(event){

	const targetTab = event.target;
	const clickedTab = targetTab.getAttribute("aria-controls");

	tabContainer
	.querySelector("[aria-selected='true']")
	.setAttribute("aria-selected", false);

	targetTab
	.setAttribute("aria-selected", true);

	document
	.querySelectorAll("[role='tabpanel']")
	.forEach((panel) => {
		panel.setAttribute("data-hidden", true);
	})

	document
	.querySelector(`#${clickedTab}`)
	.removeAttribute("data-hidden");

}

