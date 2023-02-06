import React, { useState } from 'react';
import PanelHeader from '../../../../../../components/panel/PanelHeader';
import ParticipantDetailsMutationStatusLogList from './List';
import Icon from 'react-icons-kit';
import { angleRight } from 'react-icons-kit/fa/angleRight';
import { angleDown } from 'react-icons-kit/fa/angleDown';

const ParticipantDetailsMutationStatusLog = ({ statusLogs }) => {
    const [showLog, toggleLog] = useState(false);

    return (
        <div>
            <PanelHeader>
                <div className="row" onClick={() => toggleLog(!showLog)}>
                    {showLog ? <Icon size={21} icon={angleDown} /> : <Icon size={21} icon={angleRight} />}
                    <span className="h5">Status log</span>
                </div>
            </PanelHeader>
            {showLog ? <ParticipantDetailsMutationStatusLogList statusLogs={statusLogs} /> : null}
        </div>
    );
};

export default ParticipantDetailsMutationStatusLog;
