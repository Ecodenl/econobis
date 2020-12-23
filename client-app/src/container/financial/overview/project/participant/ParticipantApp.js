import React, { Component } from 'react';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import ParticipantList from './ParticipantList';

class ParticipantApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Deelnemers</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ParticipantList financialOverviewProject={this.props.financialOverviewProject} />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default ParticipantApp;
