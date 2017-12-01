import React, {Component} from 'react';
import { connect } from 'react-redux';

import RegistrationMeasuresRequestedView from './RegistrationMeasuresRequestedView';
import RegistrationMeasuresRequestedDelete from './RegistrationMeasuresRequestedDelete';

class RegistrationMeasuresRequestedItem extends Component {
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
              <RegistrationMeasuresRequestedView
                  highlightLine={this.state.highlightLine}
                  showActionButtons={this.state.showActionButtons}
                  onLineEnter={this.onLineEnter}
                  onLineLeave={this.onLineLeave}
                  toggleDelete={this.toggleDelete}
                  measureRequested={this.state.measureRequested}
              />
                {
                    this.state.showDelete &&
                    <RegistrationMeasuresRequestedDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.measureRequested}
                    />
                }
            </div>
        );
    }
};

export default RegistrationMeasuresRequestedItem;