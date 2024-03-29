import React, { Component } from 'react';
import { isEqual } from 'lodash';

import RevenuesListFormView from './RevenuesListFormView';
import RevenuesListFormDelete from './RevenuesListFormDelete';

class RevenuesListFormItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,
            revenue: {
                ...props.revenue,
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
                <RevenuesListFormView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    revenue={this.state.revenue}
                />
                {this.state.showDelete && (
                    <RevenuesListFormDelete closeDeleteItemModal={this.toggleDelete} {...this.props.revenue} />
                )}
            </div>
        );
    }
}

export default RevenuesListFormItem;
