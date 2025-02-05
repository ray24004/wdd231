const resultsDiv = document.querySelector("#results");

const params = new URLSearchParams(window.location.search);
const timestamp = Number(params.get("timestamp"));
const date = new Date(timestamp);

resultsDiv.innerHTML = `
    <p><strong>Name:</strong> <br>${params.get("firstName")} ${params.get("lastName")}</p>
    <p><strong>Email:</strong> <br>${params.get("email")}</p>
    <p><strong>Mobile:</strong> <br>${params.get("mobile")}</p>
    <p><strong>Business:</strong> <br>${params.get("organization")}</p>
    <p><strong>Date:</strong> <br>${date}</p>
`;