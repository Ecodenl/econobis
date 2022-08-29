import React from 'react';
import moment from 'moment';

function TwinfieldListItem({ createdAt, messageText, isError, twinfieldLogMessageTypeName }) {
    return (
        <tr className={`border ${isError ? 'warning-row' : ''}`}>
            <td>{moment(createdAt).format('l LTS')}</td>
            <td>{twinfieldLogMessageTypeName}</td>
            <td>{messageText}</td>
        </tr>
    );
}

export default TwinfieldListItem;
