import React from 'react';

function Message({ message }) {
    const className = message.role === 'user' ? 'message-user' : 'message-assistant';
    return (
        <div className={className}>{message.text}</div>
    );
}

export default Message;