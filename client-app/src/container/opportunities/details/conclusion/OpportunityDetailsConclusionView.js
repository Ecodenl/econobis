import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const ContactDetailsFormConclusionView = props => {
    const { createdBy = {}, createdAt = {}, updatedBy = {}, updatedAt = {} } = props.opportunity;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={"Laatst gewijzigd op"}
                    value={updatedAt ? moment(updatedAt.date).format('L') : 'Onbekend'}
                />
                <ViewText
                    label={"Laatst gewijzigd door"}
                    value={updatedBy ? updatedBy.fullName: 'Onbekend'}
                    link={updatedBy ? 'gebruiker/' + updatedBy.id : ''}
                />
            </div>
            <div className="row">
                <ViewText
                    label={"Gemaakt op"}
                    value={createdAt ? moment(createdAt.date).format('L') : 'Onbekend'}
                />
                <ViewText
                    label={"Gemaakt door"}
                    value={createdBy ? createdBy.fullName: 'Onbekend'}
                    link={createdBy ? 'gebruiker/' + createdBy.id : ''}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        opportunity: state.opportunityDetails,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormConclusionView);