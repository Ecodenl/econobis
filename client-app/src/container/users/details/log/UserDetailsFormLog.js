import React from 'react';

import UserDetailsFormLogView from './UserDetailsFormLogView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const UserDetailsFormLog = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Gebruikers log</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <UserDetailsFormLogView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default UserDetailsFormLog;