import React from 'react';
import Message from './Message';

function Dialog({ messages }) {
    const isFirstAssistantMessage = (index) => {
        if (index === 0) return false;
        const currentMessage = messages[index];
        const previousMessage = messages[index - 1];
        return currentMessage.role === 'assistant' && previousMessage.role === 'user';
    };

    return (
        <>
            {messages.map((message, index) => (
                <Message 
                    key={index} 
                    message={message} 
                    index={index}
                    isFirstAssistantMessage={isFirstAssistantMessage(index)}
                />
            ))}
        </>
    );
}

export default Dialog;