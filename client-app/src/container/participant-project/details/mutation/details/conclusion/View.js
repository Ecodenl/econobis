import React from 'react';

import ViewText from '../../../../../../components/form/ViewText';
import moment from 'moment/moment';

moment.locale('nl');

const ParticipantDetailsMutationConclusionView = ({ createdAt, createdBy, updatedAt, updatedBy }) => {
    return (
        <React.Fragment>
            <div className="row">
                <ViewText
                    label={'Gemaakt door'}
                    className={'col-sm-6 form-group'}
                    value={createdBy ? createdBy.fullName : 'Onbekend'}
                    link={createdBy ? 'gebruiker/' + createdBy.id : ''}
                />
                <ViewText
                    label={'Laatste update door'}
                    className={'col-sm-6 form-group'}
                    value={updatedBy ? updatedBy.fullName : 'Onbekend'}
                    link={updatedBy ? 'gebruiker/' + updatedBy.id : ''}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Gemaakt op'}
                    className={'col-sm-6 form-group'}
                    value={createdAt ? moment(createdAt.date).format('L') : 'Onbekend'}
                />
                <ViewText
                    label={'Laatste update op'}
                    className={'col-sm-6 form-group'}
                    value={updatedAt ? moment(updatedAt.date).format('L') : 'Onbekend'}
                />
            </div>
        </React.Fragment>
    );
};

export default ParticipantDetailsMutationConclusionView;
