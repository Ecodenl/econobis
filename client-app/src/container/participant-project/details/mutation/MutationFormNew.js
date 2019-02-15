import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParticipantMutationAPI from '../../../../api/participant-project/ParticipantMutationAPI';
import { newParticipationMutation } from '../../../../actions/participants-project/ParticipantProjectDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import validator from 'validator';
import InputDate from '../../../../components/form/InputDate';
import * as ibantools from 'ibantools';

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
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={'Soort'}
                                id="typeId"
                                name={'typeId'}
                                options={this.props.participantMutationTypes}
                                value={typeId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.typeId}
                            />
                            <InputDate
                                label="Transactie datum"
                                name="dateMutation"
                                value={dateMutation}
                                onChangeAction={this.handleInputChangeDate}
                                required={'required'}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                type={'number'}
                                label={'Bedrag'}
                                id={'amount'}
                                name={'amount'}
                                value={amount}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.amount}
                            />
                            <InputText
                                label={'IBAN'}
                                id={'iban'}
                                name={'iban'}
                                value={iban}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.iban}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'Kenmerk'}
                                id={'referral'}
                                name={'referral'}
                                value={referral}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label={'Boekstuk'}
                                id={'entry'}
                                name={'entry'}
                                value={entry}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Boek datum"
                                name="dateBooking"
                                value={dateBooking}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNew}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
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
