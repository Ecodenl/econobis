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
                    label={'Gemaakt door'}
                    value={createdBy ? createdBy.fullName : 'Onbekend'}
                    link={createdBy ? '/gebruiker/' + createdBy.id : ''}
                />
                <ViewText
                    label={'Laatste update door'}
                    value={updatedBy ? updatedBy.fullName : 'Onbekend'}
                    link={updatedBy ? '/gebruiker/' + updatedBy.id : ''}
                />
            </div>

            <div className="row">
                <ViewText label={'Gemaakt op'} value={createdAt ? moment(createdAt).format('L') : 'Onbekend'} />
                <ViewText label={'Laatste update op'} value={updatedAt ? moment(updatedAt).format('L') : 'Onbekend'} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        opportunity: state.opportunityDetails,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormConclusionView);
