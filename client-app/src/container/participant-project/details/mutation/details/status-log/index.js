import React, { useState } from 'react';
import PanelHeader from '../../../../../../components/panel/PanelHeader';
import ParticipantDetailsMutationStatusLogList from './List';

const ParticipantDetailsMutationStatusLog = ({ statusLogs }) => {
    const [showLog, toggleLog] = useState(false);

    return (
        <div>
            <PanelHeader>
                <div className="row" onClick={() => toggleLog(!showLog)}>
                    {showLog ? (
                        <span className="glyphicon glyphicon-menu-down" />
                    ) : (
                        <span className="glyphicon glyphicon-menu-right" />
                    )}
                    <span className="h5">Status log</span>
                </div>
            </PanelHeader>
            {showLog ? <ParticipantDetailsMutationStatusLogList statusLogs={statusLogs} /> : null}
        </div>
    );
};

export default ParticipantDetailsMutationStatusLog;
