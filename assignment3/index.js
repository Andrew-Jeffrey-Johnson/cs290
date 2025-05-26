/******************************************************************************
** File: index.js
** Author: Andrew Johnson OSU ID: 9339914177
** Date: 11 May 2020
** Description: holds all JavaScript functionality for the Tweeter website
******************************************************************************/


var arrayOfTwits = [];


/******************************************************************************
** Function: generateTwit
** Description: creates twit
** Parameters: twitMessage holds a string of the message, authorName holds a 
** string of the author's name
** Pre-conditions: main twit-container must be child index 2 of body
** Post-conditions: twit created
******************************************************************************/ 
function generateTwit (twitMessage, authorName) {
	// Create twit
	var twit = document.createElement("article");
	twit.classList.add("twit");
	
	// Create twit icon
	var twitIcon = document.createElement("div");
	twitIcon.classList.add("twit-icon");
	var bullhorn = document.createElement("i");
	bullhorn.classList.add("fas");
	bullhorn.classList.add("fa-bullhorn");
	twitIcon.appendChild(bullhorn);
	
	// Create twit content
	var twitContent = document.createElement("div");
	twitContent.classList.add("twit-content");
	
	// Create twit message
	var twitText = document.createElement("p");
	twitText.classList.add("twit-text");
	var textnode = document.createTextNode(twitMessage);
	twitText.appendChild(textnode);
	
	// Create twit author
	var twitAuthor = document.createElement("p");
	twitAuthor.classList.add("twit-author");
	var author = document.createTextNode(authorName);
	twitAuthor.appendChild(author);
	
	// Append everything
	twit.appendChild(twitIcon);
	twitContent.appendChild(twitText);
	twitContent.appendChild(twitAuthor);
	twit.appendChild(twitContent);
	
	return twit;
}


/******************************************************************************
** Function: addTwit
** Description: creates and a twit and adds it to the DOM
** Parameters: twitMessage holds a string of the message, authorName holds a 
** string of the author's name
** Pre-conditions: main twit-container must be child index 2 of body
** Post-conditions: twit added to main twit-container
******************************************************************************/ 
function addTwit(twitMessage, authorName) {
	var twit = generateTwit(twitMessage, authorName);
	document.body.children[1].appendChild(twit);
}


/*****************************************************************************
** Function: createTwitButton
** Description: Handles the event of the red button in the lower right corner
** where a modal pops-up to let the user add a twit
** Parameters: none
** Pre-Conditions: button pressed
** Post-Conditions: modal closed and twit appropriately voided or added
******************************************************************************/
function openModal () {
	var modalBackdrop = document.getElementById("modal-backdrop");
	var createModal = document.getElementById("create-twit-modal");
	modalBackdrop.classList.remove("hidden");
	createModal.classList.remove("hidden");
}


/*****************************************************************************
** Function: closeTwitButton
** Description: Handles the event of the x and cancel buttons on the modal to
** close the modal and clear text in text areas
** Parameters: none
** Pre-Conditions: modal visible
** Post-Conditions: modal hidden and cleared
******************************************************************************/
function closeModal () {
	var modalBackdrop = document.getElementById("modal-backdrop");
	var createModal = document.getElementById("create-twit-modal");
	var messageArea = document.getElementById("twit-text-input");
	var authorInput = document.getElementById("twit-attribution-input");
	modalBackdrop.classList.add("hidden");
	createModal.classList.add("hidden");
	messageArea.value = "";
	authorInput.value = "";
}


/*****************************************************************************
** Function: modalAcceptButton
** Description: Uses the text from the text area and input label to create a
** new twit and add it to the DOM when the button "create twit" is pressed.
** If either of the text areas are not filled in, an alert will pop-up.
** Parameters: none
** Pre-Conditions: Modal is open
** Post-Conditions: Twit is added or alert popped-up
*****************************************************************************/
function modalAcceptButton () {
	var twitText = document.getElementById("twit-text-input");
	var twitAuthor = document.getElementById("twit-attribution-input");
	if (twitText.value == "" || twitAuthor.value == "") {
		alert("You must enter some Twit text and specify an author");
	}
	else if (twitText.value == "") {
		alert("You must enter some Twit text");
	}
	else if (twitAuthor.value == "") {
		alert("You must specify an author");
	}
	else {
		addTwit(twitText.value, twitAuthor.value);
		arrayOfTwits.push(generateTwit(twitText.value, twitAuthor.value));
		closeModal();
	}
}


/*****************************************************************************
** Function: refreshTwits
** Description: remove all twits and add them in again using arrayOfTwits
** Parameters: none
** Pre-Conditions: search request 
** Post-Conditions: all twits added in
*****************************************************************************/
function refreshTwits () {
	var twitContainer = document.body.children[1];
	var twit;
	for (var i = 0; i < twitContainer.childElementCount; i++) {
		twit = twitContainer.children[i];
		twitContainer.removeChild(twit);
	}
	for (var i = 0; i < arrayOfTwits.length; i++) {
		document.body.children[1].appendChild(arrayOfTwits[i]);
	}
}


/*****************************************************************************
** Function: search
** Description: Searches for every usage of the string in the search area
** in both the message and author of every twit
** Parameters: none
** Pre-Conditions: search button is pressed
** Post-Conditions: all twits that do not match the search are removed
*****************************************************************************/
function search () {
	refreshTwits();
	var searchInput = document.getElementById("navbar-search-input").value;
	var twitContainer = document.body.children[1];
	var twit;
	searchInput = searchInput.toUpperCase();
	for (var i = 0; i < twitContainer.childElementCount; i++) {
		twit = twitContainer.children[i];
		msg = twit.children[1].children[0].textContent.toUpperCase();
		author = twit.children[1].children[1].textContent.toUpperCase();
		if ( !msg.includes(searchInput) && !author.includes(searchInput) ) {
			twitContainer.removeChild(twit);
			i--;
			
		}
	}
}


/*****************************************************************************
** Function: main
** Description: runs beginning operations when page loads
** Parameters: none
** Pre-conditions: none
** Post-conditions: page is loaded
*****************************************************************************/
function main () {
	var createTwitBtn = document.getElementById("create-twit-button");
	var modalCloseBtn = document.getElementsByClassName("modal-close-button");
	var modalCancelBtn = document.getElementsByClassName("modal-cancel-button");
	var modalAcceptBtn = document.getElementsByClassName("modal-accept-button");
	var searchButton = document.getElementById("navbar-search-button");
	
	createTwitBtn.onclick = openModal;
	modalCloseBtn[0].onclick = closeModal;
	modalCancelBtn[0].onclick = closeModal;
	modalAcceptBtn[0].onclick = modalAcceptButton;
	searchButton.onclick = search;
	
	var twitContainer = document.body.children[1];
	var twit;
	for (var i = 0; i < twitContainer.childElementCount; i++) {
		twit = twitContainer.children[i];
		msg = twit.children[1].children[0].textContent;
		author = twit.children[1].children[1].textContent;
		arrayOfTwits.push(generateTwit(msg, author));
	}
	refreshTwits();
	refreshTwits();
	refreshTwits();
	refreshTwits();
	refreshTwits();
}

// Run main function when page loads
main();

