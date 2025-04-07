import React from 'react';

function InputForm({ onSendMessage, inputValue, onInputChange, onClearChat, isFirstMessage }) {
    return (
        <div className={`form ${isFirstMessage ? 'centered-form' : 'width-container'}`}>
            <input
                type="text"
                className="input"
                placeholder="Type your message here..."
                value={inputValue}
                onChange={onInputChange}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        onSendMessage();
                    }
                }}
            />
            <button type="submit" className="button" onClick={onSendMessage}>
                Send
            </button>
            {!isFirstMessage && (
                <button className="clear-chat-button" onClick={onClearChat}>
                    Clear
                </button>
            )}
        </div>
    );
}

export default InputForm;