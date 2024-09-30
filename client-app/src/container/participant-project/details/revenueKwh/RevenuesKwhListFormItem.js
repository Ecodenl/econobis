import React, { Component } from 'react';

import RevenuesKwhListFormView from './RevenuesKwhListFormView';

class RevenuesKwhListFormItem extends Component {
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
                <RevenuesKwhListFormView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    revenueKwh={this.props.revenueKwh}
                />
            </div>
        );
    }
}

export default RevenuesKwhListFormItem;
