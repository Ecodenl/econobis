import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParticipantMutationAPI from '../../../../api/participant-project/ParticipantMutationAPI';
import { fetchParticipantProjectDetails } from '../../../../actions/participants-project/ParticipantProjectDetailsActions';
import MutationFormView from './MutationFormView';
import MutationFormEdit from './MutationFormEdit';
import MutationFormDelete from './MutationFormDelete';
import { isEqual } from 'lodash';
import validator from 'validator';

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
                dateCreation: props.participantMutation.dateCreation ? props.participantMutation.dateCreation.date : '',
                datePayment: props.participantMutation.datePayment ? props.participantMutation.datePayment.date : '',
            },
            errors: {
                dateMutation: false,
                iban: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.participantMutation, this.props.participantMutation)) {
            this.setState({
                ...this.state,
                participantMutation: {
                    ...this.props.participantMutation,
                    dateCreation: this.props.participantMutation.dateCreation
                        ? this.props.participantMutation.dateCreation.date
                        : '',
                    datePayment: this.props.participantMutation.datePayment
                        ? this.props.participantMutation.datePayment.date
                        : '',
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
                dateCreation: this.props.participantMutation.dateCreation
                    ? this.props.participantMutation.dateCreation.date
                    : '',
                datePayment: this.props.participantMutation.datePayment
                    ? this.props.participantMutation.datePayment.date
                    : '',
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
            ...this.state,
            participantMutation: {
                ...this.state.participantMutation,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            participantMutation: {
                ...this.state.participantMutation,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        let errors = {};
        let hasErrors = false;

        const { participantMutation } = this.state;

        if (validator.isEmpty(participantMutation.dateCreation + '')) {
            errors.dateCreation = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            ParticipantMutationAPI.updateParticipantMutation(participantMutation).then(payload => {
                this.props.fetchParticipantProjectDetails(this.props.id);
                this.closeEdit();
            });
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
                    participantMutation={this.state.participantMutation}
                />
                {this.state.showEdit && this.props.permissions.manageFinancial && (
                    <MutationFormEdit
                        participantMutation={this.state.participantMutation}
                        handleInputChange={this.handleInputChange}
                        handleInputChangeDate={this.handleInputChangeDate}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                        errors={this.state.errors}
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
