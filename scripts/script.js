const nav = document.querySelector("nav");
const navButton = document.querySelector("#navButton");
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

let isNavShown = false;

navButton.addEventListener("click", OnNavButtonClick);
currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Update: ${document.lastModified}`

function OnNavButtonClick(e) {
    isNavShown = !isNavShown;
    nav.style.display = isNavShown ? "flex" : "none";
    navButton.textContent = isNavShown ? "X" : "☰";
}