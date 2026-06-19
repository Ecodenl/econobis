import React, { Component } from 'react';

import RevenuesListFormView from './RevenuesListFormView';

class RevenuesListFormItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
        };
    }

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    render() {
        return (
            <div>
                <RevenuesListFormView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    revenue={this.props.revenue}
                />
            </div>
        );
    }
}

export default RevenuesListFormItem;
