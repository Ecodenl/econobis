import React, { Component } from 'react';

import JobLogsView from './JobLogsView';

class JobLogs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            job: props.job,
        };
    }

    onLineEnter = () => {
        this.setState({
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            highlightLine: '',
        });
    };

    render() {
        return (
            <div>
                <JobLogsView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    job={this.state.job}
                />
            </div>
        );
    }
}

export default JobLogs;
