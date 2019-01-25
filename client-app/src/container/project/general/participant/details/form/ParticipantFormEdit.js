import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import validator from 'validator';

import InputText from '../../../../../../components/form/InputText';
import InputSelect from '../../../../../../components/form/InputSelect';
import InputDate from '../../../../../../components/form/InputDate';
import ButtonText from '../../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../../components/panel/PanelFooter';

import ParticipantProjectDetailsAPI from '../../../../../../api/participant-project/ParticipantProjectDetailsAPI';

import { fetchParticipantProjectDetails } from '../../../../../../actions/participants-project/ParticipantProjectDetailsActions';
import InputToggle from '../../../../../../components/form/InputToggle';
import ContactsAPI from '../../../../../../api/contact/ContactsAPI';
import * as ibantools from 'ibantools';

class ParticipantFormEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            contact,
            statusId,
            project,
            dateRegister,
            participationsRequested,
            participationsGranted,
            participationsSold,
            participationsRestSale,
            dateContractSend,
            dateContractRetour,
            datePayed,
            didAcceptAgreement,
            giftedByContactId,
            ibanPayout,
            legalRepContactId,
            ibanPayoutAttn,
            dateEnd,
            typeId,
            powerKwhConsumption,
        } = props.participation;

        this.state = {
            contacts: [],
            participationWorth: project.participationWorth ? project.participationWorth : 0,
            participation: {
                id,
                contactName: contact.fullName,
                statusId,
                projectName: project.name,
                dateRegister: dateRegister ? dateRegister : '',
                participationsRequested: participationsRequested ? participationsRequested : '',
                participationsGranted: participationsGranted ? participationsGranted : '',
                participationsSold: participationsSold ? participationsSold : '',
                participationsRestSale: participationsRestSale ? participationsRestSale : '',
                dateContractSend: dateContractSend ? dateContractSend : '',
                dateContractRetour: dateContractRetour ? dateContractRetour : '',
                datePayed: datePayed ? datePayed : '',
                didAcceptAgreement: !!didAcceptAgreement,
                giftedByContactId: giftedByContactId ? giftedByContactId : '',
                ibanPayout: ibanPayout ? ibanPayout : '',
                legalRepContactId: legalRepContactId ? legalRepContactId : '',
                ibanPayoutAttn: ibanPayoutAttn ? ibanPayoutAttn : '',
                dateEnd: dateEnd ? dateEnd : '',
                typeId,
                powerKwhConsumption: powerKwhConsumption ? powerKwhConsumption : '',
            },
            errors: {
                contactId: false,
                statusId: false,
                projectId: false,
                typeId: false,
                ibanPayout: false,
            },
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    componentWillMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload,
            });
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            participation: {
                ...this.state.participation,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            participation: {
                ...this.state.participation,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { participation } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(participation.contactId + '')) {
            errors.contactId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.statusId + '')) {
            errors.statusId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.projectId + '')) {
            errors.projectId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.typeId + '')) {
            errors.typeId = true;
            hasErrors = true;
        }
        if (!validator.isEmpty(participation.ibanPayout)) {
            if (!ibantools.isValidIBAN(participation.ibanPayout)) {
                errors.ibanPayout = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            ParticipantProjectDetailsAPI.updateParticipantProject(participation.id, participation).then(payload => {
                this.props.fetchParticipantProjectDetails(participation.id);
                this.props.switchToView();
            });
    };

    render() {
        const {
            contactName,
            statusId,
            projectName,
            dateRegister,
            participationsRequested,
            participationsGranted,
            participationsSold,
            participationsRestSale,
            dateContractSend,
            dateContractRetour,
            datePayed,
            didAcceptAgreement,
            giftedByContactId,
            ibanPayout,
            legalRepContactId,
            ibanPayoutAttn,
            dateEnd,
            typeId,
            powerKwhConsumption,
        } = this.state.participation;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText label={'Contact'} name={'contactName'} value={contactName} readOnly={true} />
                    <InputSelect
                        label={'Status'}
                        name={'statusId'}
                        options={this.props.participantProjectStatuses}
                        value={statusId}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.statusId}
                    />
                </div>

                <div className="row">
                    <InputText label={'Project'} name={'projectName'} value={projectName} readOnly={true} />
                    <InputDate
                        label={'Inschrijfdatum'}
                        name={'dateRegister'}
                        value={dateRegister}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>

                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Deelnames aangevraagd'}
                        name={'participationsRequested'}
                        value={participationsRequested}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        type={'number'}
                        label={'Deelnames toegekend'}
                        name={'participationsGranted'}
                        value={participationsGranted}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Deelnames overgedragen'}
                        name={'participationsSold'}
                        value={participationsSold}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        type={'number'}
                        label={'Huidig aantal deelnames'}
                        name={'participationsCurrent'}
                        value={statusId == 2 ? participationsGranted - participationsSold : 0}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Waarde deelnames'}
                        name={'totalWorthParticipations'}
                        value={
                            statusId == 2
                                ? (participationsGranted - participationsSold) * this.state.participationWorth
                                : 0
                        }
                        readOnly={true}
                    />
                    <InputText
                        type={'number'}
                        label={'Restverkoop deelnames'}
                        name={'participationsRestSale'}
                        value={participationsRestSale}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label={'Contract verstuurd'}
                        name={'dateContractSend'}
                        value={dateContractSend}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputDate
                        label={'Contract retour'}
                        name={'dateContractRetour'}
                        value={dateContractRetour}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label={'Betaald op'}
                        name={'datePayed'}
                        value={datePayed}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputToggle
                        label={'Akkoord reglement'}
                        name={'didAcceptAgreement'}
                        value={didAcceptAgreement}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Geschonken door'}
                        name={'giftedByContactId'}
                        options={this.state.contacts}
                        optionName={'fullName'}
                        value={giftedByContactId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={'IBAN uitkeren'}
                        name={'ibanPayout'}
                        value={ibanPayout}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.ibanPayout}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Wettelijke vertegenwoordiger'}
                        divClassName={'field-to-be-removed'}
                        name={'legalRepContactId'}
                        options={this.state.contacts}
                        optionName={'fullName'}
                        value={legalRepContactId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={'IBAN uitkeren t.n.v.'}
                        name={'ibanPayoutAttn'}
                        value={ibanPayoutAttn}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label={'Einddatum'}
                        name={'dateEnd'}
                        value={dateEnd}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputSelect
                        label={'Uitkeren op'}
                        name={'typeId'}
                        options={this.props.participantProjectPayoutTypes}
                        value={typeId}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.typeId}
                    />
                </div>

                {this.props.participation.project.typeId == 2 && (
                    <div className="row">
                        <InputText
                            label={'Jaarlijks verbruik'}
                            name={'powerKwhConsumption'}
                            value={powerKwhConsumption}
                            onChangeAction={this.handleInputChange}
                        />
                    </div>
                )}

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelFooter>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: id => {
        dispatch(fetchParticipantProjectDetails(id));
    },
});

const mapStateToProps = state => {
    return {
        participation: state.participantProjectDetails,
        participantProjectStatuses: state.systemData.participantProjectStatus,
        participantProjectPayoutTypes: state.systemData.participantProjectPayoutTypes,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParticipantFormEdit);
