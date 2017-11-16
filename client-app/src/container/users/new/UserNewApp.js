import React from 'react';

import UserNewForm from './UserNewForm';
import UserNewToolbar from './UserNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const UserNewApp = () => {
    return (
        <div className="row">
            <div className="col-md-9">
                <Panel>
                    <PanelBody>
                        <div className="col-md-12 extra-space-above">
                            <UserNewToolbar />
                        </div>

                        <div className="col-md-12 extra-space-above">
                            <Panel>
                                <PanelBody>
                                    <UserNewForm />
                                </PanelBody>
                            </Panel>
                        </div>
                    </PanelBody>
                </Panel>
            </div>
            <div className="col-md-3" />
        </div>
    )
};

export default UserNewApp;