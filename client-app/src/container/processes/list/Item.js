import React from 'react';
import moment from 'moment';

function ProcessesListItem({ createdAt, value, jobCategoryName }) {
    return (
        <tr className={`border`}>
            <td>{moment(createdAt).format('l LTS')}</td>
            <td>{jobCategoryName}</td>
            <td>{value}</td>
        </tr>
    );
}

export default ProcessesListItem;
