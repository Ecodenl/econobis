import React, { Component } from 'react';
import RevenuePartsKwhListFormView from './RevenuePartsKwhListFormView';
import RevenuePartsKwhListFormDelete from './RevenuePartsKwhListFormDelete';

class RevenuePartsKwhListFormItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,
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
                <RevenuePartsKwhListFormView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    revenuePartKwh={this.props.revenuePartKwh}
                />
                {this.state.showDelete && (
                    <RevenuePartsKwhListFormDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.revenuePartKwh}
                    />
                )}
            </div>
        );
    }
}

export default RevenuePartsKwhListFormItem;
