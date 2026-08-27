import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const CampaignDetailsOpportunityView = ({
    id,
    number,
    intake,
    createdAt,
    measureCategory,
    status,
    quotationRequests,
}) => {
    const navigate = useNavigate();

    return (
        <div className={'row border'} onClick={() => navigate(`/kans/${id}`)}>
            <div className="col-sm-2">{number}</div>
            <div className="col-sm-1">{createdAt ? moment(createdAt).format('L') : ''}</div>
            <div className="col-sm-3">{intake?.contact?.fullName || ''}</div>
            <div className="col-sm-3">{measureCategory?.name || ''}</div>
            <div className="col-sm-1">{status?.name || ''}</div>
            <div className="col-sm-2">{quotationRequests?.length}</div>
        </div>
    );
};

export default CampaignDetailsOpportunityView;
