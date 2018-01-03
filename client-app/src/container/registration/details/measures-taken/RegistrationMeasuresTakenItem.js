import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import RegistrationMeasuresTakenView from './RegistrationMeasuresTakenView';
import RegistrationMeasuresTakenDelete from './RegistrationMeasuresTakenDelete';
import RegistrationMeasuresTakenEdit from "./RegistrationMeasuresTakenEdit";
import RegistrationDetailsAPI from "../../../../api/registration/RegistrationDetailsAPI";

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
            measureDateNew: this.props.measureDateNew ? this.props.measureDateNew.date : ''
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
            measureTaken: {
                ...this.props.measureTaken,
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

    handleEnergyLabel = (id, value) => {

        this.setState({
            ...this.state,
            measureTaken: {
                ...this.state.measureTaken,
                energyLabelId: id,
                energyLabelName: value
            },
        });
    };

    handleMeasureDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            measureTaken: {
                ...this.state.measureTaken,
                measureDate: {
                    ...this.state.measureDate,
                    date: formattedDate
                },
                measureDateNew: formattedDate
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { measureTaken } = this.state;

        RegistrationDetailsAPI.updateMeasureTaken(measureTaken).then(() => {
            this.closeEdit();
        });

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
                  openEdit={this.openEdit}
              />
                {
                    this.state.showEdit &&
                    <RegistrationMeasuresTakenEdit
                        measureTaken={this.state.measureTaken}
                        handleMeasureDate={this.handleMeasureDate}
                        handleEnergyLabel={this.handleEnergyLabel}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                    />
                }
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

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(RegistrationMeasuresTakenItem);