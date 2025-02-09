const main = document.querySelector("main");
const aside = document.querySelector("aside");

function updateVisitorMessage() {
    let lastVisit = Number(localStorage.getItem("lastVisit"));
    const daysFromLastVisit = Math.floor((new Date() - new Date(lastVisit)) / (1000 * 60 * 60 * 24));
    
    aside.textContent = 
        (lastVisit === null) ? "Welcome! Let us know if you have any questions." :
        (daysFromLastVisit < 1) ? "Back so soon! Awesome!" :
        (daysFromLastVisit === 1) ? `You last visited 1 day ago.` :
        `You last visited ${daysFromLastVisit} days ago.`
    ;

    localStorage.setItem("lastVisit", Date.now());
}
updateVisitorMessage();

async function loadItems() {
    const result = await fetch("data/items-of-interest.json");
    const data = await result.json();
    data.forEach(item => {
        const article = document.createElement("article");
        article.innerHTML = `
            <h3>${item.name}</h3>
            <figure><img src="${item.photo_link}" alt="Photo of ${item.name}" width="300" height="200"></figure>
            <p>${item.description}</p>
            <address>${item.address}</address>
            <button>Learn More</button>
        `;
        main.appendChild(article);
    });    
}
loadItems();