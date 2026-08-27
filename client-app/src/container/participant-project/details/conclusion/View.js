import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import moment from 'moment/moment';

moment.locale('nl');

const ParticipantDetailsConclusionView = ({ participantProjectDetails }) => {
    const { createdAt, createdWith, createdBy, updatedAt, updatedWith, updatedBy } = participantProjectDetails;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={'Gemaakt door'}
                    value={
                        createdWith == 'portal'
                            ? 'Portaal'
                            : createdWith == 'webform'
                            ? 'Webformulier'
                            : createdBy
                            ? createdBy.fullName
                            : 'Onbekend'
                    }
                    link={
                        createdWith == 'portal' || createdWith == 'webform'
                            ? ''
                            : createdBy
                            ? '/gebruiker/' + createdBy.id
                            : ''
                    }
                />
                <ViewText
                    label={'Laatste update door'}
                    value={
                        updatedWith == 'portal'
                            ? 'Portaal'
                            : updatedWith == 'webform'
                            ? 'Webformulier'
                            : updatedBy
                            ? updatedBy.fullName
                            : 'Onbekend'
                    }
                    link={
                        updatedWith == 'portal' || updatedWith == 'webform'
                            ? ''
                            : updatedBy
                            ? '/gebruiker/' + updatedBy.id
                            : ''
                    }
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
