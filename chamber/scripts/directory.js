const menuButton = document.querySelector("#menuButton");
const headerNav = document.querySelector("header nav");
const memberList = document.querySelector("#memberList");
const gridButton = document.querySelector("#gridButton");
const listButton = document.querySelector("#listButton");
const lastModificationSpan = document.querySelector("#lastModificationSpan");
const yearSpan = document.querySelector("#yearSpan");

menuButton.addEventListener("click", e => {
    headerNav.classList.toggle("show");
    menuButton.innerHTML = headerNav.classList.contains("show") ? "X" : "&#9776;"
});

gridButton.addEventListener("click", e => {
    memberList.classList.add("grid");
    memberList.classList.remove("list")
})

listButton.addEventListener("click", e => {
    memberList.classList.add("list");
    memberList.classList.remove("grid")
})

async function LoadMembers() {
    const result = await fetch("data/members.json");
    const data = await result.json();

    memberList.innerHTML = "";
    data.members.forEach(member => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="images/logo.webp" alt="image">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="https://${member.url}" target="_blank">${member.url}</a>
            <p>Level ${member.level}</p>
        `;
        memberList.appendChild(li);
    });
}

LoadMembers();

lastModificationSpan.innerHTML = document.lastModified;
yearSpan.innerHTML = new Date().getFullYear();