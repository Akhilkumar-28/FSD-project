function changeColor() {
    let color = prompt("Enter a color name:");

    if (color === null || color.trim() === "") {
        document.body.style.backgroundColor = "lightblue";
    } else {
        document.body.style.backgroundColor = color;
    }
}

function showSmile() {
    let choice = prompt("Enter 'open' or 'closed':");
    let emojiDiv = document.getElementById("emoji");

    if (choice === null) return;

    choice = choice.toLowerCase();

    if (choice === "closed") {
        emojiDiv.textContent = "🙈";
    } else if (choice === "open") {
        emojiDiv.textContent = "🐵";
    } else {
        alert("Invalid input! Enter 'open' or 'closed'");
    }
}

function resetAll() {
    document.body.style.backgroundColor = "lightblue";
    document.getElementById("emoji").textContent = "";
}