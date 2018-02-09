import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import IntakeMeasuresRequestedView from './IntakeMeasuresRequestedView';
import IntakeMeasuresRequestedDelete from './IntakeMeasuresRequestedDelete';
import IntakeMeasuresRequestedEdit from "./IntakeMeasuresRequestedEdit";
import IntakeDetailsAPI from "../../../../api/intake/IntakeDetailsAPI";


class IntakeMeasuresRequestedItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,
            showEdit: false,
            measureRequested: {
                ...props.measureRequested,
            },
            desiredDateNew: this.props.desiredDate ? this.props.desiredDate.date : ''
        };
    };

    openEdit = () => {
        if(this.props.permissions.manageIntake) {
            this.setState({showEdit: true});
        }
    };

    closeEdit = () => {
        this.setState({showEdit: false});
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            measureRequested: {
                ...this.props.measureRequested,
            }
        });

        this.closeEdit();
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

    handleDegreeInterest = (value) => {

        this.setState({
            ...this.state,
            measureRequested: {
                ...this.state.measureRequested,
                degreeInterest: value
            },
        });
    };

    handleDesiredDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            measureRequested: {
                ...this.state.measureRequested,
                desiredDate: {
                    ...this.state.desiredDate,
                    date: formattedDate
                },
                desiredDateNew: formattedDate
            },
        });
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
                  openEdit={this.openEdit}
              />
                {
                    this.state.showEdit &&
                    <IntakeMeasuresRequestedEdit
                        measureRequested={this.state.measureRequested}
                        handleDesiredDate={this.handleDesiredDate}
                        handleDegreeInterest={this.handleDegreeInterest}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                    />
                }
                {
                    this.state.showDelete &&
                    <IntakeMeasuresRequestedDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.measureRequested}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(IntakeMeasuresRequestedItem);
