import React from 'react';
import moment from 'moment';
import { hashHistory } from 'react-router';

const CampaignDetailsOpportunityView = ({
    id,
    number,
    intake,
    createdAt,
    measureCategory,
    status,
    quotationRequests,
}) => {
    return (
        <tr onClick={() => hashHistory.push(`/kans/${id}`)}>
            <td>{number}</td>
            <td>{createdAt ? moment(createdAt).format('L') : ''}</td>
            <td>{intake?.contact?.fullName || ''}</td>
            <td>{measureCategory?.name || ''}</td>
            <td>{status?.name || ''}</td>
            <td>{quotationRequests?.length}</td>
        </tr>
    );
};

export default CampaignDetailsOpportunityView;
