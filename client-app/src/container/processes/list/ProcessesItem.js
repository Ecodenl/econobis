import React, { Component } from 'react';

import ProcessesView from './ProcessesView';

class ProcessesItem extends Component {
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
                <ProcessesView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    job={this.state.job}
                />
            </div>
        );
    }
}

export default ProcessesItem;
