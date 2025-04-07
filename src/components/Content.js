import React, { forwardRef } from 'react';
import Dialog from './Dialog';

const Content = forwardRef(({ messages, isFirstMessage }, ref) => {
    return (
        <div className={`content ${isFirstMessage ? 'white-bg' : ''}`} ref={ref}>
            <div className="dialog width-container">
                <Dialog messages={messages} />
            </div>
        </div>
    );
});

export default Content;