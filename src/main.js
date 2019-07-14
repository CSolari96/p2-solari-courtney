// Mobile Hamburger Menu
const menuClose = document.getElementById("close-menu");				// Store mobile menu close button
const menuOpen = document.getElementById("open-menu");					// Store mobile menu open button
const mobileMenu = document.getElementsByClassName("mobile-menu")[0];	// Store mobile menu

// When the user clicks the mobile menu open button, display the mobile menu and hide the menu open button
menuOpen.addEventListener("click", function() {
	mobileMenu.style.width = "100%";
	menuOpen.style.display = "none";
});

// When the user clicks the mobile menu close button, hide the mobile menu and display the menu open button
menuClose.addEventListener("click", function() {
	mobileMenu.style.width = "0";
	menuOpen.style.display = "block";
});



// Donate Menu
const donateMenu = document.getElementById("slideout");
const openDonateMenu = document.getElementById("open-donate");
const closeDonateMenu = document.getElementById("close-donate");

function showMenu() {
	donateMenu.classList.add("showDonateMenu");
	openDonateMenu.style.display = "none";
}

function hideMenu() {
	donateMenu.classList.remove("showDonateMenu");
	openDonateMenu.style.display = "block";
}

setTimeout(showMenu, 3000);

openDonateMenu.addEventListener("click", showMenu);
closeDonateMenu.addEventListener("click", hideMenu);