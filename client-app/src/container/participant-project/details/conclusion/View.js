import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import moment from 'moment/moment';

moment.locale('nl');

const ParticipantDetailsConclusionView = ({ participantProjectDetails }) => {
    const { createdAt, createdBy, updatedAt, updatedBy } = participantProjectDetails;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={'Gemaakt door'}
                    value={createdBy ? createdBy.fullName : 'Onbekend'}
                    link={createdBy ? 'gebruiker/' + createdBy.id : ''}
                />
                <ViewText
                    label={'Laatste update door'}
                    value={updatedBy ? updatedBy.fullName : 'Onbekend'}
                    link={updatedBy ? 'gebruiker/' + updatedBy.id : ''}
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
        participantProjectDetails: state.participantProjectDetails,
    };
};

export default connect(mapStateToProps)(ParticipantDetailsConclusionView);
