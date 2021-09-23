import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const CampaignDetailsIntakeView = ({ id, contact, address, fullAddress, createdAt }) => {
    return (
        <div className={'row border'} onClick={() => hashHistory.push(`/intake/${id}`)}>
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
