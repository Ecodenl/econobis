import React, {Component} from 'react';
import { connect } from 'react-redux';

import RegistrationMeasuresTakenView from './RegistrationMeasuresTakenView';
import RegistrationMeasuresTakenDelete from './RegistrationMeasuresTakenDelete';

class RegistrationMeasuresTakenItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,
            measureTaken: {
                ...props.measureTaken,
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
              <RegistrationMeasuresTakenView
                  highlightLine={this.state.highlightLine}
                  showActionButtons={this.state.showActionButtons}
                  onLineEnter={this.onLineEnter}
                  onLineLeave={this.onLineLeave}
                  toggleDelete={this.toggleDelete}
                  measureTaken={this.state.measureTaken}
              />
                {
                    this.state.showDelete &&
                    <RegistrationMeasuresTakenDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.measureTaken}
                    />
                }
            </div>
        );
    }
};

export default RegistrationMeasuresTakenItem;