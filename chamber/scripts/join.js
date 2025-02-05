const membershipLevels = [
    "Non-profit",
    "Bronze",
    "Silver",
    "Gold"
];

const membershipSelect = document.querySelector("#membershipSelect");
const membershipSection = document.querySelector("#membershipSection");
const membershipDialogs = document.querySelector("#membershipDialogs");
const timestampInput = document.querySelector("#timestamp");

membershipLevels.forEach(level => {
    const option = document.createElement("option");
    option.innerText = level;
    option.value = level.toLowerCase().replace("-", "");
    membershipSelect.append(option);

    const article = document.createElement("article");
    article.innerHTML = `
        <h3>${level}</h3>
        <button>Learn more...</a>
    `;
    membershipSection.append(article);

    const dialog = document.createElement("dialog");
    dialog.innerHTML = `
        <button>❌</button>
        <h2>${level}</h2>
        <p>
            Benefits: <br>
            - A <br>
            - B <br>
            - C <br><br>

            Cost: $ 00.00
        </p>
    `;
    membershipDialogs.append(dialog);

    article.querySelector("button").addEventListener("click", e => {
        dialog.showModal();
    });

    dialog.querySelector("button").addEventListener("click", e => {
        dialog.close();
    });
});

timestampInput.value = Date.now();