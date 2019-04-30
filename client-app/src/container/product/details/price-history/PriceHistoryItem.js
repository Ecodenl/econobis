import React, { Component } from 'react';

import PriceHistoryView from './PriceHistoryView';
import { connect } from 'react-redux';

class PriceHistoryItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,

            price: props.price,
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
                <PriceHistoryView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    price={this.state.price}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(PriceHistoryItem);
