import React from 'react';

const NoteCard = ({ children }) => {
    return (
        <div className="note-wrapper">
            <div className="content">
                <h3 style={{ fontWeight: 'bold' }}>Please note:</h3>
                <div className="note-text">{children}</div>
            </div>
        </div>
    )
}

export default NoteCard;