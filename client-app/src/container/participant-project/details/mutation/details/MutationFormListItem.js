import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParticipantMutationAPI from '../../../../../api/participant-project/ParticipantMutationAPI';
import { fetchParticipantProjectDetails } from '../../../../../actions/participants-project/ParticipantProjectDetailsActions';
import MutationFormView from './MutationFormView';
import MutationFormEdit from './MutationFormEdit';
import MutationFormDelete from '../list/MutationFormDelete';
import { isEqual } from 'lodash';
import MutationValidateForm from './MutationValidateForm';
import MutationSubmitHelper from './MutationSubmitHelper';
import moment from 'moment/moment';

class MutationFormListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            participantMutation: {
                ...props.participantMutation,
                dateInterest: props.participantMutation.dateInterest
                    ? props.participantMutation.dateInterest.date
                    : moment().format('YYYY-MM-DD'),
                dateOption: props.participantMutation.dateOption
                    ? props.participantMutation.dateOption.date
                    : moment().format('YYYY-MM-DD'),
                dateGranted: props.participantMutation.dateGranted
                    ? props.participantMutation.dateGranted.date
                    : moment().format('YYYY-MM-DD'),
                dateContractRetour: props.participantMutation.dateContractRetour
                    ? props.participantMutation.dateContractRetour.date
                    : '',
                datePayment: props.participantMutation.datePayment ? props.participantMutation.datePayment.date : '',
                dateEntry: props.participantMutation.dateEntry
                    ? props.participantMutation.dateEntry.date
                    : props.projectDateEntry
                    ? props.projectDateEntry
                    : moment().format('YYYY-MM-DD'),
                quantityInterest: props.participantMutation.quantityInterest
                    ? props.participantMutation.quantityInterest
                    : props.participantMutation.quantity,
                quantityOption: props.participantMutation.quantityOption
                    ? props.participantMutation.quantityOption
                    : props.participantMutation.quantity,
                quantityGranted: props.participantMutation.quantityGranted
                    ? props.participantMutation.quantityGranted
                    : props.participantMutation.quantity,
                quantityFinal: props.participantMutation.quantityFinal
                    ? props.participantMutation.quantityFinal
                    : props.participantMutation.quantity,
                amountInterest: props.participantMutation.amountInterest
                    ? props.participantMutation.amountInterest
                    : props.participantMutation.amount,
                amountOption: props.participantMutation.amountOption
                    ? props.participantMutation.amountOption
                    : props.participantMutation.amount,
                amountGranted: props.participantMutation.amountGranted
                    ? props.participantMutation.amountGranted
                    : props.participantMutation.amount,
                amountFinal: props.participantMutation.amountFinal
                    ? props.participantMutation.amountFinal
                    : props.participantMutation.amount,
            },
            errors: {},
            errorMessage: {},
        };
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.participantMutation, this.props.participantMutation)) {
            this.setState({
                ...this.state,
                participantMutation: {
                    ...this.props.participantMutation,
                    dateInterest: this.props.participantMutation.dateInterest
                        ? this.props.participantMutation.dateInterest.date
                        : moment().format('YYYY-MM-DD'),
                    dateOption: this.props.participantMutation.dateOption
                        ? this.props.participantMutation.dateOption.date
                        : moment().format('YYYY-MM-DD'),
                    dateGranted: this.props.participantMutation.dateGranted
                        ? this.props.participantMutation.dateGranted.date
                        : moment().format('YYYY-MM-DD'),
                    dateContractRetour: this.props.participantMutation.dateContractRetour
                        ? this.props.participantMutation.dateContractRetour.date
                        : '',
                    datePayment: this.props.participantMutation.datePayment
                        ? this.props.participantMutation.datePayment.date
                        : '',
                    dateEntry: this.props.participantMutation.dateEntry
                        ? this.props.participantMutation.dateEntry.date
                        : this.props.projectDateEntry
                        ? this.props.projectDateEntry
                        : moment().format('YYYY-MM-DD'),
                    quantityInterest: this.props.participantMutation.quantityInterest
                        ? this.props.participantMutation.quantityInterest
                        : this.props.participantMutation.quantity,
                    quantityOption: this.props.participantMutation.quantityOption
                        ? this.props.participantMutation.quantityOption
                        : this.props.participantMutation.quantity,
                    quantityGranted: this.props.participantMutation.quantityGranted
                        ? this.props.participantMutation.quantityGranted
                        : this.props.participantMutation.quantity,
                    quantityFinal: this.props.participantMutation.quantityFinal
                        ? this.props.participantMutation.quantityFinal
                        : this.props.participantMutation.quantity,
                    amountInterest: this.props.participantMutation.amountInterest
                        ? this.props.participantMutation.amountInterest
                        : this.props.participantMutation.amount,
                    amountOption: this.props.participantMutation.amountOption
                        ? this.props.participantMutation.amountOption
                        : this.props.participantMutation.amount,
                    amountGranted: this.props.participantMutation.amountGranted
                        ? this.props.participantMutation.amountGranted
                        : this.props.participantMutation.amount,
                    amountFinal: this.props.participantMutation.amountFinal
                        ? this.props.participantMutation.amountFinal
                        : this.props.participantMutation.amount,
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

    openEdit = () => {
        this.setState({ showEdit: true });
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            participantMutation: {
                ...this.props.participantMutation,
                dateInterest: this.props.participantMutation.dateInterest
                    ? this.props.participantMutation.dateInterest.date
                    : '',
                dateOption: this.props.participantMutation.dateOption
                    ? this.props.participantMutation.dateOption.date
                    : '',
                dateGranted: this.props.participantMutation.dateGranted
                    ? this.props.participantMutation.dateGranted.date
                    : '',
                dateContractRetour: this.props.participantMutation.dateContractRetour
                    ? this.props.participantMutation.dateContractRetour.date
                    : '',
                datePayment: this.props.participantMutation.datePayment
                    ? this.props.participantMutation.datePayment.date
                    : '',
                dateEntry: this.props.participantMutation.dateEntry
                    ? this.props.participantMutation.dateEntry.date
                    : this.props.projectDateEntry
                    ? this.props.projectDateEntry
                    : moment().format('YYYY-MM-DD'),
            },
        });

        this.closeEdit();
    };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            participantMutation: {
                ...this.state.participantMutation,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            participantMutation: {
                ...this.state.participantMutation,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        const { participantMutation } = this.state;

        const validatedForm = MutationValidateForm(
            participantMutation,
            errors,
            errorMessage,
            hasErrors,
            this.props.projectTypeCodeRef
        );

        this.setState({ ...this.state, errors: validatedForm.errors, errorMessage: validatedForm.errorMessage });

        if (!validatedForm.hasErrors) {
            const values = MutationSubmitHelper(participantMutation, this.props.projectTypeCodeRef);

            ParticipantMutationAPI.updateParticipantMutation(values).then(payload => {
                this.props.fetchParticipantProjectDetails(this.props.id);
                this.closeEdit();
            });
        }
    };

    render() {
        return (
            <div>
                <MutationFormView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    participantMutation={this.props.participantMutation}
                />
                {this.state.showEdit && this.props.permissions.manageFinancial && (
                    <MutationFormEdit
                        participantMutationFromState={this.state.participantMutation}
                        participantMutationFromProps={this.props.participantMutation}
                        handleInputChange={this.handleInputChange}
                        handleInputChangeDate={this.handleInputChangeDate}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                        errors={this.state.errors}
                        errorMessage={this.state.errorMessage}
                    />
                )}
                {this.state.showDelete && this.props.permissions.manageFinancial && (
                    <MutationFormDelete closeDeleteItemModal={this.toggleDelete} {...this.props.participantMutation} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        id: state.participantProjectDetails.id,
        participantMutationStatuses: state.systemData.participantMutationStatuses,
        projectTypeCodeRef: state.participantProjectDetails.project.projectType.codeRef,
        projectDateEntry: state.participantProjectDetails.project.dateEntry,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: id => {
        dispatch(fetchParticipantProjectDetails(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MutationFormListItem);
