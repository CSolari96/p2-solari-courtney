// Mobile Hamburger Menu
const menuClose = document.getElementById("close-menu");				// Store mobile menu close button
const menuOpen = document.getElementById("open-menu");					// Store mobile menu open button
const mobileMenu = document.getElementsByClassName("mobile-menu")[0];	// Store mobile menu

// When the user clicks the mobile menu open button, display the mobile menu and hide the menu open button
menuOpen.addEventListener("click", function() {
	mobileMenu.style.width = "100%";
	menuOpen.classList.add("hide");
});

// When the user clicks the mobile menu close button, hide the mobile menu and display the menu open button
menuClose.addEventListener("click", function() {
	mobileMenu.style.width = "0";
	menuOpen.classList.remove("hide");
});



// Donate Menu
const donateMenu = document.getElementById("slideout");				// Store donation slideout menu
const openDonateMenu = document.getElementById("open-donate");		// Store open donate menu button
const closeDonateMenu = document.getElementById("close-donate");	// Store close donate menu button

// Show the donation menu and hide open button
function showDonateMenu() {
	donateMenu.classList.add("showDonateMenu");
	openDonateMenu.style.display = "none";
}

// Hide donation menu and show open button
function hideDonateMenu() {
	donateMenu.classList.remove("showDonateMenu");
	openDonateMenu.style.display = "block";
}

// When the donation menu open button is clicked, show the donation menu
openDonateMenu.addEventListener("click", showDonateMenu);

// When the donation menu close button is clicked, hide the donation menu
closeDonateMenu.addEventListener("click", hideDonateMenu);