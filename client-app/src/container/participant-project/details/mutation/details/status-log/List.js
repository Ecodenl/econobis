import React from 'react';
import moment from 'moment/moment';

const ParticipantDetailsMutationStatusLogList = ({ statusLogs }) => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Datum</div>
                <div className="col-sm-3">Status van</div>
                <div className="col-sm-3">Status naar</div>
            </div>
            {statusLogs.map(statusLog => (
                <div className="row border">
                    <div className="col-sm-2">
                        {statusLog.dateStatus && moment(statusLog.dateStatus.date).format('L HH:mm:ss')}
                    </div>
                    <div className="col-sm-3">{statusLog.fromStatus ? statusLog.fromStatus.name : '-'}</div>
                    <div className="col-sm-3">{statusLog.toStatus ? statusLog.toStatus.name : '-'}</div>
                </div>
            ))}
        </div>
    );
};

export default ParticipantDetailsMutationStatusLogList;
