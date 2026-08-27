import React, { Component } from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import UserDetailsFormTeamsList from './UserDetailsFormTeamsList';

class UserDetailsFormTeams extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Gekoppelde teams</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <UserDetailsFormTeamsList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default UserDetailsFormTeams;
