const headerNav = document.querySelector("header nav");
const headerButton = document.querySelector("header button");

headerButton.addEventListener("click", e => {
    headerNav.classList.toggle("show");
    headerButton.textContent = headerNav.classList.contains("show") ? "X" : "☰";
});