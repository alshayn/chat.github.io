import React, { useState, useEffect } from 'react';

function Message({ message, index, isFirstAssistantMessage }) {
    const [isVisible, setIsVisible] = useState(false);
    const className = message.role === 'user' ? 'message-user' : 'message-assistant';
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, message.role === 'assistant' && isFirstAssistantMessage ? 300 : 0);
        
        return () => clearTimeout(timer);
    }, [message.role, isFirstAssistantMessage]);

    return (
        <div className={`${className} ${isVisible ? 'visible' : ''}`}>
            {message.text}
        </div>
    );
}

export default Message;