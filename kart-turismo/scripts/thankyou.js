const nameElement = document.querySelector("#name");
const emailElement = document.querySelector("#email");
const ageElement = document.querySelector("#age");
const cityElement = document.querySelector("#city");
const neighborhoodElement = document.querySelector("#neighborhood");
const gameplayElement = document.querySelector("#gameplay");
const enjoyMostElement = document.querySelector("#enjoyMost");
const frustrateMostElement = document.querySelector("#frustrateMost");
const commentsElement = document.querySelector("#comments");

const params = new URLSearchParams(window.location.href);

nameElement.textContent = params.get("name");
emailElement.textContent = params.get("email");
ageElement.textContent = params.get("age");
cityElement.textContent = params.get("city");
neighborhoodElement.textContent = params.get("neighborhood");
gameplayElement.textContent = params.get("gameplay");
enjoyMostElement.textContent = params.get("enjoyMost");
frustrateMostElement.textContent = params.get("frustrateMost");
commentsElement.textContent = params.get("comments");