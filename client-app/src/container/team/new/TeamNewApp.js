import React from 'react';

import TeamNewForm from './TeamNewForm';
import TeamNewToolbar from './TeamNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const TeamNewApp = () => {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className="panel-small">
                            <TeamNewToolbar />
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <TeamNewForm />
                </div>
            </div>
            <div className="col-md-3" />
        </div>
    );
};

export default TeamNewApp;
