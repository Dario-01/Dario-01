async function sendMessage() {
    let userInput = document.getElementById("user-input");
    let messageBox = document.getElementById("messages");
    let userText = userInput.value.trim();

    if (!userText) return;

    // Display user message
    let userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    userMessage.innerText = "You: " + userText;
    messageBox.appendChild(userMessage);
    userInput.value = "";
    messageBox.scrollTop = messageBox.scrollHeight;

    // Show typing indicator
    let typingMessage = document.createElement("div");
    typingMessage.classList.add("message", "bot");
    typingMessage.innerText = "Bot is typing...";
    messageBox.appendChild(typingMessage);

    try {
        // Send request to chatbot API
        let response = await fetch("VF.DM.679a4750bc56e6ab061df94d.qH6JA0gYFD4ewspP", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_API_KEY" // If required
            },
            body: JSON.stringify({ message: userText })
        });

        let data = await response.json();
        messageBox.removeChild(typingMessage); // Remove typing indicator

        // Handle API errors
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${data.error || "Unknown error
