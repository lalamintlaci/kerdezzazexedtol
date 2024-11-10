const API_KEY = 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;  // Cseréld ki a saját API kulcsodra
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const dayCounter = document.getElementById('day-counter');

// Számláló beállítása 2024.08.15-től
const startDate = new Date('2024-08-15');
function updateCounter() {
    const currentDate = new Date();
    const timeDiff = currentDate - startDate;
    const daysPassed = Math.floor(timeDiff / (1000 * 3600 * 24)); // Napok száma
    dayCounter.textContent = daysPassed;
}

// Üzenet hozzáadása a chathez
function appendMessage(message, sender = 'user') {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Görgetés az új üzenethez
}

// API hívás a ChatGPT-hez
async function getChatGPTResponse(userMessage) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',  // Az aktuális modell
            messages: [
                { role: 'system', content: 'Te egy 26 éves fiú vagy, aki mindig egy kicsit szarkasztikus és vicces, de kedves a volt barátnőjével. Mindig a válasz után megkérdezed, hogy érzi magát, és a köszönésed mindig "Szius". Tedd szórakoztatóvá és személyre szabottá a válaszaidat!' },
                { role: 'user', content: userMessage },  // A felhasználó üzenete
            ],
            max_tokens: 150,  // A válasz maximális hossza
        })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
}

// Eseménykezelő a felhasználó üzenetének elküldéséhez
sendBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        appendMessage(userMessage, 'user');  // Felhasználó üzenete
        userInput.value = '';  // Üzenetmező törlése
        const botResponse = await getChatGPTResponse(userMessage);  // API hívás
        appendMessage(botResponse, 'bot');  // AI válasz
    }
});

// Enter gomb megnyomása
userInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

// Napok számlálásának frissítése
updateCounter();
setInterval(updateCounter, 1000 * 60 * 60 * 24);  // Naponta frissül
