import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParticipantMutationAPI from '../../../../api/participant-project/ParticipantMutationAPI';
import { newParticipationMutation } from '../../../../actions/participants-project/ParticipantProjectDetailsActions';
import validator from 'validator';
import * as ibantools from 'ibantools';
import MutationFormDefault from './MutationFormDefault';

class MutationFormNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            participationMutation: {
                participationId: this.props.id,
                typeId: '',
                dateMutation: '',
                amount: '',
                iban: '',
                referral: '',
                entry: '',
                dateBooking: '',
            },
            errors: {
                typeId: false,
                dateMutation: false,
                amount: false,
                iban: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            participationMutation: {
                ...this.state.participationMutation,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            participationMutation: {
                ...this.state.participationMutation,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { participationMutation } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(participationMutation.typeId)) {
            errors.typeId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(participationMutation.dateMutation)) {
            errors.dateMutation = true;
            hasErrors = true;
        }

        if (validator.isEmpty(participationMutation.amount)) {
            errors.amount = true;
            hasErrors = true;
        }

        if (!validator.isEmpty(participationMutation.iban)) {
            if (!ibantools.isValidIBAN(participationMutation.iban)) {
                errors.iban = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            ParticipantMutationAPI.newParticipantMutation(participationMutation).then(payload => {
                this.props.newParticipationMutation(payload);
                this.props.toggleShowNew();
            });
    };

    render() {
        const { typeId, dateMutation, amount, iban, referral, entry, dateBooking } = this.state.participationMutation;

        return (
            <MutationFormDefault
                editForm={false}
                typeId={typeId}
                dateMutation={dateMutation}
                amount={amount}
                iban={iban}
                referral={referral}
                entry={entry}
                dateBooking={dateBooking}
                errors={this.state.errors}
                participantMutationTypes={this.props.participantMutationTypes}
                handleSubmit={this.handleSubmit}
                handleInputChange={this.handleInputChange}
                handleInputChangeDate={this.handleInputChangeDate}
                toggleShow={this.props.toggleShowNew}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        participantMutationTypes: state.systemData.participantMutationTypes,
        id: state.participantProjectDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newParticipationMutation: participationMutation => {
        dispatch(newParticipationMutation(participationMutation));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MutationFormNew);
