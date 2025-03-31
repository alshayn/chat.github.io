document.addEventListener('DOMContentLoaded', function () {
    const sendButton = document.querySelector('.button');
    const clearChatButton = document.querySelector('.clear-chat-button');
    const messageInput = document.querySelector('.input');
    const dialogContainer = document.querySelector('.dialog');
    const content = document.querySelector('.content');
    const startElements = document.querySelectorAll('.start');
    const formElement = document.querySelector('.start-form');
    const page = document.body;
    const localStorageKey = 'messages';

    const talk = function (data, success) {
        return $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'https://intensive-backend-technium.replit.app/talk',
            data: JSON.stringify({
                messages: data
            }),
            success: success,
        });
    };

    let messages = [];
    const chatHistory = localStorage.getItem(localStorageKey);

    if (chatHistory) {
        messages = [...JSON.parse(chatHistory)];
    }

    if (messages.length > 0) {
        messages.forEach(el => {
            if (el.role === 'user') {
                const newMessage = document.createElement('div');
                newMessage.classList.add('message-user');
                newMessage.innerText = el.text;
                dialogContainer.appendChild(newMessage);
            } else {
                const newMessage = document.createElement('div');
                newMessage.classList.add('message-assistant');
                newMessage.innerText = el.text;
                dialogContainer.appendChild(newMessage);
            }
            page.classList.remove('initial');
            content.scrollTop = content.scrollHeight;
            startElements.forEach(el => el.classList.remove('start'));
            formElement.classList.remove('start-form');
            if (clearChatButton) {
                clearChatButton.style.display = 'block';
            }
        });
    } else {
        if (clearChatButton) {
            clearChatButton.style.display = 'none';
        }
    }

    function clearChatHistory() {
        messages = [];
        localStorage.removeItem(localStorageKey);
        page.classList.add('initial');
        dialogContainer.innerHTML = '';
        if (clearChatButton) {
            clearChatButton.style.display = 'none';
        }
        startElements.forEach(el => el.classList.add('start'));
        formElement.classList.add('start-form');
        messageInput.value = '';
    }

    if (sendButton) {
        sendButton.addEventListener('click', addUserMessage);
    }

    if (messageInput) {
        messageInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                addUserMessage();
            }
        });
    }

    if (clearChatButton) {
        clearChatButton.addEventListener('click', clearChatHistory);
    }

    function addAssistantMessage(string) {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message-assistant');
        newMessage.innerText = string;
        dialogContainer.appendChild(newMessage);
        content.scrollTop = content.scrollHeight;
        messages.push({ role: 'assistant', text: string });
        localStorage.setItem(localStorageKey, JSON.stringify(messages));
    }

    function addUserMessage() {
        const userMessage = messageInput.value;

        if (!userMessage) {
            return;
        }

        const newMessage = document.createElement('div');
        newMessage.classList.add('message-user');
        newMessage.innerText = userMessage;
        dialogContainer.appendChild(newMessage);
        content.scrollTop = content.scrollHeight;

        messages.push({ role: 'user', text: userMessage });
        localStorage.setItem(localStorageKey, JSON.stringify(messages));

        page.classList.remove('initial');
        startElements.forEach(el => el.classList.remove('start'));
        formElement.classList.remove('start-form');
        if (clearChatButton) {
            clearChatButton.style.display = 'block';
        }

        messageInput.value = '';

        talk(messages, (data) => addAssistantMessage(data.answer));
    }
});