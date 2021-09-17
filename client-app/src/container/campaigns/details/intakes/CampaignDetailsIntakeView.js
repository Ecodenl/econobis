import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const CampaignDetailsIntakeView = props => {
    const { id, contact, address, fullAddress, createdAt } = props.intake;

    return (
        <tr onClick={() => hashHistory.push(`/intake/${id}`)}>
            <td>{id}</td>
            <td>{contact && contact.type.name}</td>
            <td>{contact && contact.fullName}</td>
            <td>{fullAddress && fullAddress}</td>
            <td>{address && address.postalCode}</td>
            <td>{address && address.city}</td>
            <td>{createdAt ? moment(createdAt).format('L') : ''}</td>
        </tr>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(CampaignDetailsIntakeView);
