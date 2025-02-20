const main = document.querySelector("main");

async function showSupporters() {
    const result = await fetch("data/supporters.json");
    const supporters = await result.json();

    supporters.forEach(s => {
        const article = document.createElement("article");
        article.innerHTML = `
            <h2>${s.business_name}</h2>
            <ul>
                <li class="level">${s.supporter_level} Supporter</li>
                <li class="segment">${s.business_segment}</li>
                <li class="neighborhood">${s.neighborhood}</li>
                <li class="benefits">${s.in_game_benefits}</li>
            </ul>
        `;
        main.appendChild(article);
    });
}
showSupporters();