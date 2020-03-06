import React, { Component } from 'react';
import PanelHeader from '../../components/panel/PanelHeader';
import PanelBody from '../../components/panel/PanelBody';
import JobsLogAPI from '../../api/jobs-log/JobsLogAPI';
import ProcessesList from './list/ProcessesList';
import Panel from '../../components/panel/Panel';

class ProcessesApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
        };
    }

    componentWillMount() {
        JobsLogAPI.fetchJobslogs().then(payload => {
            this.setState({
                jobs: payload.data,
            });
        });
    }

    render() {
        return (
            <div className="JobLog-Processes-List">
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Processen logs</span>
                    </PanelHeader>
                    <PanelBody>
                        <ProcessesList jobs={this.state.jobs} />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

export default ProcessesApp;
