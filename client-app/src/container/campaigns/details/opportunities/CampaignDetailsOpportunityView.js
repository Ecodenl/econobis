import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const CampaignDetailsOpportunityView = props => {
    const { id, number, intake, createdAt, measureCategory, status, quotationRequests } = props.opportunity;

    return (
        <tr onClick={() => hashHistory.push(`/kans/${id}`)}>
            <td>{number}</td>
            <td>{createdAt ? moment(createdAt).format('L') : ''}</td>
            <td>{intake ? intake.contact.fullName : ''}</td>
            <td>{measureCategory ? measureCategory.name : ''}</td>
            <td>{status ? status.name : ''}</td>
            <td>{quotationRequests.length}</td>
        </tr>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(CampaignDetailsOpportunityView);
