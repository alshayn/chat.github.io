import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isFirstMessage, setIsFirstMessage] = useState(true);
    const contentRef = useRef(null);
    const localStorageKey = 'messages';

    useEffect(() => {
        const chatHistory = localStorage.getItem(localStorageKey);
        if (chatHistory) {
            setMessages(JSON.parse(chatHistory));
            setIsFirstMessage(false);
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(localStorageKey, JSON.stringify(messages));
        } else {
            localStorage.removeItem(localStorageKey);
        }
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [messages]);

    const talk = async (data) => {
        try {
            const response = await fetch('https://intensive-backend-technium.replit.app/talk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: data }),
            });
            const result = await response.json();
            addAssistantMessage(result.answer);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            addAssistantMessage('Произошла ошибка при связи с сервером.');
        }
    };

    const addAssistantMessage = (text) => {
        setMessages((prevMessages) => [...prevMessages, { role: 'assistant', text }]);
    };

    const addUserMessage = () => {
        const userMessage = inputValue.trim();
        if (!userMessage) return;

        setMessages((prevMessages) => [...prevMessages, { role: 'user', text: userMessage }]);
        setInputValue('');
        setIsFirstMessage(false);
        talk([...messages, { role: 'user', text: userMessage }]);
    };

    const clearChatHistory = () => {
        setMessages([]);
        setInputValue('');
        setIsFirstMessage(true);
        localStorage.removeItem(localStorageKey);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="page">
            <Header showBorder={!isFirstMessage} />
            <Content messages={messages} ref={contentRef} isFirstMessage={isFirstMessage} />
            <Footer
                onSendMessage={addUserMessage}
                onClearChat={clearChatHistory}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                isFirstMessage={isFirstMessage}
            />
        </div>
    );
}

export default App;