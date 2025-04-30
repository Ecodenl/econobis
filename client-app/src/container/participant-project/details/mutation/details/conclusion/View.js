import React from 'react';

import ViewText from '../../../../../../components/form/ViewText';
import moment from 'moment/moment';

moment.locale('nl');

const ParticipantDetailsMutationConclusionView = ({
    createdAt,
    createdWith,
    createdBy,
    updatedAt,
    updatedWith,
    updatedBy,
}) => {
    return (
        <React.Fragment>
            <div className="row">
                <ViewText
                    label={'Gemaakt door'}
                    className={'col-sm-6 form-group'}
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
                    className={'col-sm-6 form-group'}
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
                <ViewText
                    label={'Gemaakt op'}
                    className={'col-sm-6 form-group'}
                    value={createdAt ? moment(createdAt).format('L HH:mm:ss') : 'Onbekend'}
                />
                <ViewText
                    label={'Laatste update op'}
                    className={'col-sm-6 form-group'}
                    value={updatedAt ? moment(updatedAt).format('L HH:mm:ss') : 'Onbekend'}
                />
            </div>
        </React.Fragment>
    );
};

export default ParticipantDetailsMutationConclusionView;
