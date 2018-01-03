import React, {Component} from 'react';

import MeasureDetailsMeasureRequestedView from './MeasureDetailsMeasureRequestedView';

class MeasureDetailsMeasureRequestedItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,

            measureRequested: {
                ...props.measureRequested,
            },
        };
    };

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
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        return (
            <div>
                <MeasureDetailsMeasureRequestedView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    measureRequested={this.state.measureRequested}
                />
            </div>
        );
    }
};

export default MeasureDetailsMeasureRequestedItem;
