import React, { Component, useState } from 'react';

function FreeFieldsListItem({ id, tableName, fieldName, fieldFormatName }) {
    const [highlightLine, setHighlightLine] = useState('');

    return (
        <tr className={`${highlightLine}`} onMouseEnter={() => onLineEnter()} onMouseLeave={() => onLineLeave()}>
            <td>{tableName}</td>
            <td>{fieldName}</td>
            <td>{fieldFormatName}</td>
        </tr>
    );

    function onLineEnter() {
        setHighlightLine('highlight-row');
    }

    function onLineLeave() {
        setHighlightLine('');
    }
}

export default FreeFieldsListItem;
