import React, {Component} from 'react';
import { connect } from 'react-redux';

import ParticipantTransactionAPI from '../../../../../../api/participant-production-project/ParticipantTransactionAPI';
import {updateParticipationTransaction} from '../../../../../../actions/participants-production-project/ParticipantProductionProjectDetailsActions';
import TransactionFormView from './TransactionFormView';
import TransactionFormEdit from './TransactionFormEdit';
import TransactionFormDelete from './TransactionFormDelete';
import {isEqual} from "lodash";
import * as ibantools from "ibantools/build/ibantools";
import validator from "validator";

class TransactionFormListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            participantTransaction: {
                ...props.participantTransaction,
            },
            errors: {
                dateTransaction: false,
                amount: false,
                iban: false,
            }
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        if(!isEqual(this.state.participantTransaction, nextProps.participantTransaction)){
            this.setState({
                ...this.state,
                participantTransaction: {
                    ...nextProps.participantTransaction,
                },
            });
        }
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
            participantTransaction: {...this.props.participantTransaction},
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
            participantTransaction: {
                ...this.state.participantTransaction,
                [name]: value
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            participantTransaction: {
                ...this.state.participantTransaction,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        let errors = {};
        let hasErrors = false;

        const {participantTransaction} = this.state;

        if(validator.isEmpty(participantTransaction.dateTransaction + '')){
            errors.dateTransaction = true;
            hasErrors = true;
        };

        if(validator.isEmpty(participantTransaction.amount  + '')){
            errors.amount = true;
            hasErrors = true;
        };

        if(participantTransaction.iban && !validator.isEmpty(participantTransaction.iban + '')){
            if (!ibantools.isValidIBAN(participantTransaction.iban + '')) {
                errors.iban = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
        ParticipantTransactionAPI.updateParticipantTransaction(participantTransaction).then((payload) => {
            this.props.updateParticipationTransaction(payload);
            this.closeEdit();
        });
    };

    render() {
        return (
            <div>
                <TransactionFormView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    participantTransaction={this.state.participantTransaction}
                />
                {
                    this.state.showEdit &&
                    <TransactionFormEdit
                        participantTransaction={this.state.participantTransaction}
                        handleInputChange={this.handleInputChange}
                        handleInputChangeDate={this.handleInputChangeDate}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                        errors={this.state.errors}
                    />
                }
                {
                    this.state.showDelete &&
                    <TransactionFormDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.participantTransaction}
                    />
                }
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    updateParticipationTransaction: (participationTransaction) => {
        dispatch(updateParticipationTransaction(participationTransaction));
    },
});

export default connect(null, mapDispatchToProps)(TransactionFormListItem);
