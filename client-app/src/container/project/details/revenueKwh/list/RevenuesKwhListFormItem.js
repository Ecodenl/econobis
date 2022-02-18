import React, { Component } from 'react';

import RevenuesKwhListFormView from './RevenuesKwhListFormView';
import RevenuesKwhListFormDelete from './RevenuesKwhListFormDelete';

class RevenuesKwhListFormItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,
            revenueKwh: {
                ...props.revenueKwh,
            },
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

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        return (
            <div>
                <RevenuesKwhListFormView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    revenueKwh={this.state.revenueKwh}
                />
                {this.state.showDelete && (
                    <RevenuesKwhListFormDelete closeDeleteItemModal={this.toggleDelete} {...this.props.revenueKwh} />
                )}
            </div>
        );
    }
}

export default RevenuesKwhListFormItem;
