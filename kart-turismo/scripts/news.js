const body = document.querySelector("body");
const main = document.querySelector("main");
const dialog = document.querySelector("dialog");

async function loadNews() {
    const response = await fetch("data/news.json");
    let news = await response.json();
    news = news.sort((a, b) => new Date(b.date) - new Date(a.date));

    news.forEach(n => {
        const localDate = new Date(n.date).toLocaleDateString();
        const article = document.createElement("article");

        article.innerHTML = `
            <h2>${n.title}</h2>
            <p class="date">${localDate}</p>
            <p class="type">${n.type}</p>
        `;

        article.addEventListener("click", e => {
            dialog.querySelector("h2").textContent = n.title;
            dialog.querySelector(".date").textContent = n.date;
            dialog.querySelector(".type").textContent = n.type;
            dialog.querySelector(".content").textContent = n.content;
            dialog.showModal();

            body.classList.add("scrollLock");
        });

        main.appendChild(article);
    });
}
loadNews();

function setupDialog() {
    dialog.addEventListener("click", e => {
        dialog.close();
        body.classList.remove("scrollLock");
    });
}
setupDialog();