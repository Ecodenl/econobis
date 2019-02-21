import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParticipantMutationAPI from '../../../../api/participant-project/ParticipantMutationAPI';
import { newParticipationMutation } from '../../../../actions/participants-project/ParticipantProjectDetailsActions';
import validator from 'validator';
import * as ibantools from 'ibantools';
import MutationFormDefault from './MutationFormDefault';
import moment from 'moment';

class MutationFormNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            participationMutation: {
                participationId: this.props.id,
                typeId: '',
                dateCreation: moment().format('Y-MM-DD'),
                typeId: '',
                statusId: '',
                datePayment: '',
                account: '',
                quantity: '',
                returns: '',
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

        if (validator.isEmpty(participationMutation.dateCreation)) {
            errors.dateCreation = true;
            hasErrors = true;
        }

        // if (!validator.isEmpty(participationMutation.iban)) {
        //     if (!ibantools.isValidIBAN(participationMutation.iban)) {
        //         errors.iban = true;
        //         hasErrors = true;
        //     }
        // }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            ParticipantMutationAPI.newParticipantMutation(participationMutation).then(payload => {
                this.props.newParticipationMutation(payload);
                this.props.toggleShowNew();
            });
    };

    render() {
        const { dateCreation, typeId, datePayment, account, quantity, returns } = this.state.participationMutation;

        const projectTypeCodeRef =
            this.props.projectTypeCodeRef === 'postalcode_link_capital' ? 'capital' : this.props.projectTypeCodeRef;

        const participantMutationTypes = this.props.participantMutationTypes.filter(
            participantMutationType => participantMutationType.groupName === projectTypeCodeRef
        );

        return (
            <MutationFormDefault
                editForm={false}
                typeId={typeId}
                dateCreation={dateCreation}
                datePayment={datePayment}
                account={account}
                quantity={quantity}
                returns={returns}
                errors={this.state.errors}
                participantMutationTypes={participantMutationTypes}
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
        projectTypeCodeRef: state.participantProjectDetails.project.projectType.codeRef,
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
