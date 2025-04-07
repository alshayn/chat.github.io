import React from 'react';
import Message from './Message';

function Dialog({ messages }) {
    return (
        <>
            {messages.map((message, index) => (
                <Message key={index} message={message} />
            ))}
        </>
    );
}

export default Dialog;