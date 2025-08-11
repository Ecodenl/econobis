import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import moment from 'moment';
moment.locale('nl');

const IntakeDetailsFormConclusionView = props => {
    const { createdAt, createdBy } = props.administrationDetails;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={'Gemaakt door'}
                    value={createdBy ? createdBy.fullName : 'Onbekend'}
                    link={createdBy ? '/gebruiker/' + createdBy.id : ''}
                />
                <ViewText label={'Gemaakt op'} value={createdAt ? moment(createdAt).format('L') : 'Onbekend'} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        administrationDetails: state.administrationDetails,
    };
};

export default connect(mapStateToProps)(IntakeDetailsFormConclusionView);
