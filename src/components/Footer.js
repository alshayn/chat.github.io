import React from 'react';
import InputForm from './InputForm';

function Footer({ onSendMessage, onClearChat, inputValue, onInputChange, isFirstMessage }) {
    return (
        <div className={`footer ${isFirstMessage ? 'centered' : 'with-border'}`}>
            <InputForm
                onSendMessage={onSendMessage}
                onClearChat={onClearChat}
                inputValue={inputValue}
                onInputChange={onInputChange}
                isFirstMessage={isFirstMessage}
            />
        </div>
    );
}

export default Footer;