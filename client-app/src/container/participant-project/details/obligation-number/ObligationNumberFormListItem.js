import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParticipantObligationNumberAPI from '../../../../api/participant-project/ParticipantObligationNumberAPI';
import { updateObligationNumber } from '../../../../actions/participants-project/ParticipantProjectDetailsActions';
import ObligationNumberFormView from './ObligationNumberFormView';
import ObligationNumberFormEdit from './ObligationNumberFormEdit';
import ObligationNumberFormDelete from './ObligationNumberFormDelete';
import validator from 'validator';
import ErrorModal from '../../../../components/modal/ErrorModal';
import ProjectDetailsAPI from '../../../../api/project/ProjectDetailsAPI';

class ObligationNumberFormListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            obligationNumbers: [],
            obligationNumber: {
                ...props.obligationNumber,
            },
            errors: {
                number: false,
            },
        };
    }

    componentDidMount() {
        ProjectDetailsAPI.fetchObligationNumbers(this.props.projectId).then(payload => {
            this.setState({
                obligationNumbers: payload,
            });
        });
    }

    toggleErrorModal = () => {
        this.setState({
            showModalError: !this.state.showModalError,
        });
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
        this.setState({ showEdit: true });
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            obligationNumber: { ...this.props.obligationNumber },
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
            ...this.state,
            obligationNumber: {
                ...this.state.obligationNumber,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { obligationNumber } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(obligationNumber.number)) {
            errors.number = true;
            hasErrors = true;
        } else {
            if (this.state.obligationNumbers.includes(obligationNumber.number)) {
                this.setState({
                    showModalError: !this.state.showModalError,
                    modalErrorTitle: 'Waarschuwing',
                    modalErrorMessage: 'Dit obligatienummer bestaat al.',
                });

                errors.number = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            ParticipantObligationNumberAPI.updateObligationNumber(obligationNumber).then(payload => {
                this.props.updateObligationNumber(payload);
                this.closeEdit();
            });
    };

    render() {
        return (
            <div>
                <ObligationNumberFormView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    obligationNumber={this.state.obligationNumber}
                />
                {this.state.showEdit && this.props.permissions.manageParticipation && (
                    <ObligationNumberFormEdit
                        obligationNumber={this.state.obligationNumber}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                        errors={this.state.errors}
                    />
                )}
                {this.state.showDelete && this.props.permissions.manageParticipation && (
                    <ObligationNumberFormDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.obligationNumber}
                    />
                )}
                {this.state.showModalError && (
                    <ErrorModal
                        closeModal={this.toggleErrorModal}
                        title={this.state.modalErrorTitle}
                        errorMessage={this.state.modalErrorMessage}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.participantProjectDetails.id,
        projectId: state.participantProjectDetails.projectId,
        permissions: state.meDetails.permissions,
    };
};

const mapDispatchToProps = dispatch => ({
    updateObligationNumber: obligationNumber => {
        dispatch(updateObligationNumber(obligationNumber));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ObligationNumberFormListItem);
