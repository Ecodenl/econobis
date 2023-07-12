import React from 'react';
import moment from 'moment';

function HousingFileListItem({ createdAt, messageText, isError, housingFileLogMessageTypeName }) {
    return (
        <tr className={`border ${isError ? 'warning-row' : ''}`}>
            <td>{moment(createdAt).format('l LTS')}</td>
            <td>{housingFileLogMessageTypeName}</td>
            <td>{messageText}</td>
        </tr>
    );
}

export default HousingFileListItem;
