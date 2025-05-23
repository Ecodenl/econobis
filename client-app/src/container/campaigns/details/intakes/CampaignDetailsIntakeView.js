import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CampaignDetailsIntakeView = ({ id, contact, address, fullAddress, createdAt }) => {
    const navigate = useNavigate();

    return (
        <div className={'row border'} onClick={() => navigate(`/intake/${id}`)}>
            <div className="col-sm-1">{id}</div>
            <div className="col-sm-1">{contact?.type?.name}</div>
            <div className="col-sm-2">{contact?.fullName}</div>
            <div className="col-sm-3">{fullAddress}</div>
            <div className="col-sm-1">{address?.postalCode}</div>
            <div className="col-sm-2">{address?.city}</div>
            <div className="col-sm-2">{createdAt ? moment(createdAt).format('L') : ''}</div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(CampaignDetailsIntakeView);
