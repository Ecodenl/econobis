import React, { Component } from 'react';

import JobLogsList from './JobLogsList';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PanelHeader from '../../../components/panel/PanelHeader';
import JobAPI from '../../../api/job/JobAPI';

class JobLogs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
        };
    }

    UNSAFE_componentWillMount() {
        JobAPI.getLastJobs().then(payload => {
            this.setState({
                jobs: payload.data,
            });
        });
    }

    render() {
        return (
            <div className={`${this.props.size}`}>
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Processen</span>
                    </PanelHeader>
                    <PanelBody>
                        <div className="col-md-12">
                            <JobLogsList jobs={this.state.jobs} />
                        </div>
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

export default JobLogs;
