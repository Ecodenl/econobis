import React from 'react';
import moment from 'moment';

function ProcessesListItem({ createdAt, value, jobCategoryId }) {
    return (
        <tr className={`border`}>
            <td>{moment(createdAt).format('l LTS')}</td>
            <td>{value}</td>
            <td>{jobCategoryId}</td>
        </tr>
    );
}

export default ProcessesListItem;
