import React, { Component } from 'react';
import PanelHeader from '../../components/panel/PanelHeader';
import PanelBody from '../../components/panel/PanelBody';

class ProcessesApp extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    render() {
        return (
            <div className="JobLog-Processes-List">
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Processen logs</span>
                    </PanelHeader>
                    <PanelBody />
                </Panel>
            </div>
        );
    }
}

export default ProcessesApp;
