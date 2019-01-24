import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const CampaignDetailsIntakeView = props => {
    const { id, contact, address, fullAddress, createdAt } = props.intake;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={() => hashHistory.push(`/intake/${id}`)}>
                <div className="col-sm-1">{id}</div>
                <div className="col-sm-1">{contact && contact.type.name}</div>
                <div className="col-sm-2">{contact && contact.fullName}</div>
                <div className="col-sm-2">{fullAddress && fullAddress}</div>
                <div className="col-sm-2">{address && address.postalCode}</div>
                <div className="col-sm-2">{address && address.city}</div>
                <div className="col-sm-2">{createdAt ? moment(createdAt.date).format('L') : ''}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(CampaignDetailsIntakeView);
