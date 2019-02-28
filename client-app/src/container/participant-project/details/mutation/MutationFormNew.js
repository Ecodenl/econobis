import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParticipantMutationAPI from '../../../../api/participant-project/ParticipantMutationAPI';
import { fetchParticipantProjectDetails } from '../../../../actions/participants-project/ParticipantProjectDetailsActions';
import validator from 'validator';
import MutationFormDefault from './MutationFormDefault';
import moment from 'moment';

class MutationFormNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            participationMutation: {
                participationId: this.props.id,
                dateCreation: moment().format('Y-MM-DD'),
                typeId: '',
                statusId: '',
                datePayment: '',
                amount: '',
                quantity: '',
                returns: '',
            },
            errors: {
                typeId: false,
                dateCreation: false,
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

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            ParticipantMutationAPI.newParticipantMutation(participationMutation).then(payload => {
                this.props.fetchParticipantProjectDetails(this.props.id);
                this.props.toggleShowNew();
            });
    };

    render() {
        const {
            dateCreation,
            typeId,
            statusId,
            datePayment,
            amount,
            quantity,
            returns,
        } = this.state.participationMutation;

        const { participantMutationStatuses, projectTypeCodeRef } = this.props;

        const participantMutationTypes = this.props.participantMutationTypes.filter(
            participantMutationType => participantMutationType.projectTypeCodeRef === projectTypeCodeRef
        );

        return (
            <MutationFormDefault
                editForm={false}
                projectTypeCodeRef={projectTypeCodeRef}
                typeId={typeId}
                statusId={statusId}
                dateCreation={dateCreation}
                datePayment={datePayment}
                amount={amount}
                quantity={quantity}
                returns={returns}
                errors={this.state.errors}
                participantMutationTypes={participantMutationTypes}
                participantMutationStatuses={participantMutationStatuses}
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
        participantMutationStatuses: state.systemData.participantMutationStatuses,
        id: state.participantProjectDetails.id,
        projectTypeCodeRef: state.participantProjectDetails.project.projectType.codeRef,
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
)(MutationFormNew);
