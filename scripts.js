const API_KEY = "VF.DM.679a4750bc56e6ab061df94d.qH6JA0gYFD4ewspP";
const API_URL = "https://general-runtime.voiceflow.com/state/user";

async function sendMessage() {
    let userInput = document.getElementById("user-input");
    let messagesDiv = document.getElementById("messages");
    let userText = userInput.value.trim();

    if (!userText) return;

    // Display user message
    let userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    userMessage.innerText = userText;
    messagesDiv.appendChild(userMessage);
    userInput.value = "";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Show typing indicator
    let typingMessage = document.createElement("div");
    typingMessage.classList.add("message", "bot");
    typingMessage.innerText = "Bot is typing...";
    messagesDiv.appendChild(typingMessage);

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ state: {}, request: { type: "text", payload: userText } })
        });

        let data = await response.json();
        messagesDiv.removeChild(typingMessage); // Remove typing indicator

        // Show bot response
        let botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot");
        botMessage.innerText = data?.trace?.[0]?.payload?.message || "Sorry, I didn't understand.";
        messagesDiv.appendChild(botMessage);
    } catch (error) {
        console.error("API error:", error);

        let errorMessage = document.createElement("div");
        errorMessage.classList.add("message", "bot", "error");
        errorMessage.innerText = "Bot: Error connecting to API.";
        messagesDiv.appendChild(errorMessage);
    }

    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll
}
