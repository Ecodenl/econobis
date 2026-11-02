import React from 'react';
import moment from 'moment/moment';
import { getParticipantMutationStatusName } from '../../../../../../helpers/participantMutationStatusHelper';

const ParticipantDetailsMutationStatusLogList = ({ statusLogs, projectTypeCodeRef }) => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Datum</div>
                <div className="col-sm-3">Status van</div>
                <div className="col-sm-3">Status naar</div>
            </div>
            {statusLogs.map(statusLog => (
                <div className="row border" key={statusLog.id}>
                    <div className="col-sm-2">
                        {statusLog.dateStatus && moment(statusLog.dateStatus).format('L HH:mm:ss')}
                    </div>
                    <div className="col-sm-3">
                        {statusLog.fromStatus
                            ? getParticipantMutationStatusName(statusLog.fromStatus, projectTypeCodeRef)
                            : '-'}
                    </div>
                    <div className="col-sm-3">
                        {statusLog.toStatus
                            ? getParticipantMutationStatusName(statusLog.toStatus, projectTypeCodeRef)
                            : '-'}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ParticipantDetailsMutationStatusLogList;
