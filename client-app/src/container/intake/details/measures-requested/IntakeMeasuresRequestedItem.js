import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import IntakeMeasuresRequestedView from './IntakeMeasuresRequestedView';
import IntakeMeasuresRequestedDelete from './IntakeMeasuresRequestedDelete';
import IntakeMeasuresRequestedEdit from './IntakeMeasuresRequestedEdit';
import IntakeDetailsAPI from '../../../../api/intake/IntakeDetailsAPI';
import { isEqual } from 'lodash';

class IntakeMeasuresRequestedItem extends Component {
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
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.measureRequested, nextProps.measureRequested)) {
            this.setState({
                ...this.state,
                measureRequested: {
                    ...nextProps.measureRequested,
                },
            });
        }
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

    handleSubmit = event => {
        event.preventDefault();

        const { measureRequested } = this.state;

        IntakeDetailsAPI.updateMeasureRequested(measureRequested).then(() => {
            this.closeEdit();
        });
    };

    render() {
        return (
            <div>
                <IntakeMeasuresRequestedView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    measureRequested={this.state.measureRequested}
                />
                {this.state.showDelete && (
                    <IntakeMeasuresRequestedDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.measureRequested}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(IntakeMeasuresRequestedItem);
