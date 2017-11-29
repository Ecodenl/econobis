import React, {Component} from 'react';
import { connect } from 'react-redux';

import RegistrationMeasureTakenAPI from '../../../../api/registration/RegistrationMeasureTakenAPI';
import { updateRegistrationMeasureTaken } from '../../../../actions/registration/RegistrationDetailsActions';
import RegistrationMeasuresTakenView from './RegistrationMeasuresTakenView';
import RegistrationMeasuresTakenEdit from './RegistrationMeasuresTakenEdit';
import RegistrationMeasuresTakenDelete from './RegistrationMeasuresTakenDelete';

class RegistrationMeasuresTakenItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
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

    openEdit = () => {
        this.setState({showEdit: true});
    };

    closeEdit = () => {
        this.setState({showEdit: false});
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            emailAddress: {...this.props.emailAddress}
        });

        this.closeEdit();
    };

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            measureTaken: {
                ...this.state.measureTaken,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { measureTaken } = this.state;

        RegistrationMeasureTakenAPI.updateRegistrationMeasureTaken(measureTaken).then((payload) => {
            this.props.updateRegistrationMeasureTaken(payload);
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
                  openEdit={this.openEdit}
                  toggleDelete={this.toggleDelete}
                  measureTaken={this.state.measureTaken}
              />
                {
                    this.state.showEdit &&
                    <RegistrationMeasuresTakenEdit
                        measureTaken={this.state.measureTaken}
                        handleInputChange={this.handleInputChange}
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

const mapDispatchToProps = dispatch => ({
    updateRegistrationMeasureTaken: (id) => {
        dispatch(updateRegistrationMeasureTaken(id));
    },
});

export default connect(null, mapDispatchToProps)(RegistrationMeasuresTakenItem);