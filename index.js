document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.querySelector('.input');
    const sendButton = document.querySelector('.button');
    const dialogContainer = document.querySelector('.dialog');
    const content = document.querySelector('.content');
    const start = document.querySelectorAll('.start');
    const form = document.querySelector('.start-form');
    function addUserMessage(message) {
        if (message.trim() === '') {
            return;
        }

        const newMessage = document.createElement('div');
        newMessage.classList.add('message-user');
        newMessage.textContent = message;
        newMessage.style.opacity = '0';
        dialogContainer.appendChild(newMessage);

        let opacity = 0;
        const intervalId = setInterval(function () {
            opacity += 0.1;
            newMessage.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(intervalId);
            }
        }, 35);

        messageInput.value = '';
        setTimeout(function () {
            content.scrollTop = content.scrollHeight;
        }, 10);

        start.forEach(function(element){
            element.style.transitionDuration = '200ms';
            element.classList.remove('start');
        })
        form.classList.remove('start-form');
    }


    sendButton.addEventListener('click', function () {
        const messageText = messageInput.value;
        addUserMessage(messageText);
    });

    messageInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const messageText = messageInput.value;
            addUserMessage(messageText);
        }
    });
});

