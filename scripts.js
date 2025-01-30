async function sendMessage() {
    let userInput = document.getElementById("user-input");
    let messageBox = document.getElementById("messages");

    if (!userInput.value.trim()) return;

    // Add user message
    let userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    userMessage.innerText = "You: " + userInput.value;
    messageBox.appendChild(userMessage);

    let userText = userInput.value;
    userInput.value = "";

    // Auto-scroll
    messageBox.scrollTop = messageBox.scrollHeight;

    // Fetch chatbot response
    try {
        let response = await fetch("VF.DM.679a4750bc56e6ab061df94d.qH6JA0gYFD4ewspP", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userText })
        });

        let data = await response.json();

        // Add bot message with animation
        setTimeout(() => {
            let botMessage = document.createElement("div");
            botMessage.classList.add("message", "bot");
            botMessage.innerText = "Bot: " + data.response;
            messageBox.appendChild(botMessage);

            // Auto-scroll
            messageBox.scrollTop = messageBox.scrollHeight;
        }, 500);
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
    }
}
