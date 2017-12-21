import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import RegistrationMeasuresRequestedView from './RegistrationMeasuresRequestedView';
import RegistrationMeasuresRequestedDelete from './RegistrationMeasuresRequestedDelete';
import RegistrationMeasuresRequestedEdit from "./RegistrationMeasuresRequestedEdit";
import RegistrationDetailsAPI from "../../../../api/registration/RegistrationDetailsAPI";


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
            desiredDateNew: this.props.desiredDate ? this.props.desiredDate.date : ''
        };
    };

    openEdit = () => {
        if(this.props.permissions.manageRegistration) {
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

        RegistrationDetailsAPI.updateMeasureRequested(measureRequested).then(() => {
            this.closeEdit();
        });

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
                  openEdit={this.openEdit}
              />
                {
                    this.state.showEdit &&
                    <RegistrationMeasuresRequestedEdit
                        measureRequested={this.state.measureRequested}
                        handleDesiredDate={this.handleDesiredDate}
                        handleDegreeInterest={this.handleDegreeInterest}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                    />
                }
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

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(RegistrationMeasuresRequestedItem);
