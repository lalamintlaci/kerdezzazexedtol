// Számláló, ami számolja a napokat 2024.08.15. óta
const startDate = new Date("2024-08-15");
const counterElement = document.getElementById("days-count");

function updateCounter() {
    const currentDate = new Date();
    const timeDifference = currentDate - startDate;
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Napok számítása
    counterElement.textContent = `${daysPassed} nap`;
}

setInterval(updateCounter, 1000); // Aktív frissítés minden másodpercben
updateCounter(); // Inicializáláskor az első számítás

// Üzenet küldése a ChatGPT-be
async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userInput = inputField.value.trim();

    if (!userInput) return;

    addMessage(userInput, "user-message");
    inputField.value = "";

    const apiKey = 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; // Az OpenAI API kulcsod

    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };

    const data = {
        model: "gpt-3.5-turbo", // vagy gpt-4, ha elérhető
        messages: [{ role: "user", content: userInput }]
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const botMessage = result.choices[0].message.content;
        addMessage(botMessage, "bot-message");
    } catch (error) {
        console.error("Hiba történt az API hívás során:", error);
        addMessage("Sajnálom, hiba történt. Próbáld meg később.", "bot-message");
    }
}

function addMessage(message, className) {
    const messagesContainer = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
