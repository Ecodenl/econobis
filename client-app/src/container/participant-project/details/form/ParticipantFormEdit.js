import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import validator from 'validator';

import ParticipantProjectDetailsAPI from '../../../../api/participant-project/ParticipantProjectDetailsAPI';

import { fetchParticipantProjectDetails } from '../../../../actions/participants-project/ParticipantProjectDetailsActions';
import ContactsAPI from '../../../../api/contact/ContactsAPI';
import * as ibantools from 'ibantools';
import ViewText from '../../../../components/form/ViewText';
import InputToggle from '../../../../components/form/InputToggle';
import InputSelect from '../../../../components/form/InputSelect';
import InputText from '../../../../components/form/InputText';
import moneyPresenter from '../../../../helpers/MoneyPresenter';
import PanelFooter from '../../../../components/panel/PanelFooter';
import ButtonText from '../../../../components/button/ButtonText';
import ParticipantFormEditPostalcodeLinkCapital from './edit/ParticipantFormEditPostalcodeLinkCapital';
import ParticipantFormEditCapital from './edit/ParticipantFormEditCapital';
import ParticipantFormEditObligation from './edit/ParticipantFormEditObligation';
import InputDate from '../../../../components/form/InputDate';

class ParticipantFormEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            didAcceptAgreement,
            dateDidAcceptAgreement,
            didUnderstandInfo,
            dateDidUnderstandInfo,
            giftedByContactId,
            ibanPayout,
            ibanPayoutAttn,
            typeId,
            powerKwhConsumption,
            dateRegister,
            dateTerminated,
        } = props.participation;

        this.state = {
            contacts: [],
            participation: {
                id,
                didAcceptAgreement: Boolean(didAcceptAgreement),
                dateDidAcceptAgreement: dateDidAcceptAgreement ? dateDidAcceptAgreement : '',
                didUnderstandInfo: Boolean(didUnderstandInfo),
                dateDidUnderstandInfo: dateDidUnderstandInfo ? dateDidUnderstandInfo : '',
                giftedByContactId: giftedByContactId ? giftedByContactId : '',
                ibanPayout: ibanPayout ? ibanPayout : '',
                ibanPayoutAttn: ibanPayoutAttn ? ibanPayoutAttn : '',
                typeId: typeId ? typeId : '',
                powerKwhConsumption: powerKwhConsumption ? powerKwhConsumption : '',
                dateRegister: dateRegister
                    ? dateRegister
                    : this.props.participation.project.dateEntry
                    ? this.props.participation.project.dateEntry
                    : '',
                dateTerminated: dateTerminated ? dateTerminated : '',
            },
            errors: {
                typeId: false,
                ibanPayout: false,
            },
            isSaving: false,
        };
    }

    componentDidMount() {
        ContactsAPI.getContactsAddressesPeek().then(payload => {
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

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            participation: {
                ...this.state.participation,
                [name]: value,
            },
        });
    };

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
        if (this.props.participation.project.typeCodeRef === 'loan') {
            if (validator.isEmpty(participation.typeId + '')) {
                errors.typeId = true;
                hasErrors = true;
            }
        }

        if (!validator.isEmpty(participation.ibanPayout)) {
            if (!ibantools.isValidIBAN(participation.ibanPayout)) {
                errors.ibanPayout = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        if (!hasErrors) {
            this.setState({ isSaving: true });
            ParticipantProjectDetailsAPI.updateParticipantProject(participation.id, participation).then(payload => {
                this.setState({ isSaving: false });
                this.props.fetchParticipantProjectDetails(participation.id);
                this.props.switchToView();
            });
        }
    };

    render() {
        const {
            didAcceptAgreement,
            dateDidAcceptAgreement,
            didUnderstandInfo,
            dateDidUnderstandInfo,
            giftedByContactId,
            ibanPayout,
            ibanPayoutAttn,
            typeId,
            powerKwhConsumption,
            dateRegister,
            dateTerminated,
        } = this.state.participation;

        const {
            contact,
            address,
            uniqueMutationStatuses,
            project,
            participationsDefinitive,
            participationsDefinitiveWorth,
            participationsCapitalWorth,
            amountDefinitive,
            participationsReturnsTotal,
            participationsReturnsKwhTotal,
            participationsIndicationOfRestitutionEnergyTaxTotal,
        } = this.props.participation;

        const projectTypeCodeRef = project.typeCodeRef;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <ViewText
                        label={'Project'}
                        value={project ? project.name : ''}
                        link={project ? 'project/' + project.id : ''}
                        className={'col-sm-6 form-group'}
                    />
                    <ViewText
                        label={'Status'}
                        value={uniqueMutationStatuses.map(item => item.name).join(', ')}
                        className={'col-sm-6 form-group'}
                    />
                </div>
                <div className="row">
                    <ViewText
                        label={'Contact'}
                        value={contact ? contact.fullName : ''}
                        link={contact ? 'contact/' + contact.id : ''}
                        className={'col-sm-6 form-group'}
                    />
                    <ViewText
                        label={'Administratie'}
                        value={project ? project.administrationName : ''}
                        className={'col-sm-6 form-group'}
                    />
                </div>
                <div className="row">
                    <ViewText
                        label={'Adres'}
                        value={
                            address
                                ? address.streetPostalCodeCity
                                : contact && contact.primaryAddress
                                ? contact.primaryAddress.streetPostalCodeCity
                                : ''
                        }
                        className={'col-sm-6 form-group'}
                    />
                    <ViewText
                        label={'Adrestype'}
                        value={
                            address
                                ? address.typeAndPrimary
                                : contact && contact.primaryAddress
                                ? contact.primaryAddress.typeAndPrimary
                                : ''
                        }
                        className={'col-sm-6 form-group'}
                    />
                </div>

                <div className="row">
                    {!didAcceptAgreement ? (
                        <InputToggle
                            label={'Akkoord voorwaarden'}
                            name={'didAcceptAgreement'}
                            id={'didAcceptAgreement'}
                            value={didAcceptAgreement}
                            onChangeAction={this.handleInputChange}
                        />
                    ) : (
                        <ViewText
                            label={'Akkoord voorwaarden'}
                            id={'didAcceptAgreement'}
                            className={'form-group col-md-6'}
                            value={
                                didAcceptAgreement ? (
                                    <span>
                                        Ja{' '}
                                        <em>
                                            ({dateDidAcceptAgreement ? moment(dateDidAcceptAgreement).format('L') : ''})
                                        </em>
                                    </span>
                                ) : (
                                    'Nee'
                                )
                            }
                        />
                    )}
                    {!didUnderstandInfo ? (
                        <InputToggle
                            label={'Projectinfo begrepen'}
                            name={'didUnderstandInfo'}
                            id={'didUnderstandInfo'}
                            value={didUnderstandInfo}
                            onChangeAction={this.handleInputChange}
                        />
                    ) : (
                        <ViewText
                            label={'Projectinfo begrepen'}
                            id={'didUnderstandInfo'}
                            className={'form-group col-md-6'}
                            value={
                                didUnderstandInfo ? (
                                    <span>
                                        Ja{' '}
                                        <em>
                                            ({dateDidUnderstandInfo ? moment(dateDidUnderstandInfo).format('L') : ''})
                                        </em>
                                    </span>
                                ) : (
                                    'Nee'
                                )
                            }
                        />
                    )}
                </div>

                <div className="row">
                    <InputSelect
                        label={'Schenker'}
                        name={'giftedByContactId'}
                        id={'giftedByContactId'}
                        options={this.state.contacts}
                        optionName={'fullName'}
                        value={giftedByContactId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={'IBAN uitkeren'}
                        name={'ibanPayout'}
                        id={'ibanPayout'}
                        value={ibanPayout}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.ibanPayout}
                    />
                </div>
                <div className="row">
                    {projectTypeCodeRef === 'obligation' ? <div className={'form-group col-md-6'} /> : null}
                    {projectTypeCodeRef === 'loan' ? (
                        <ViewText
                            label={`Huidig saldo lening rekening`}
                            id={'amountDefinitive'}
                            value={moneyPresenter(amountDefinitive)}
                            className={'form-group col-md-6'}
                        />
                    ) : null}
                    {projectTypeCodeRef === 'capital' || projectTypeCodeRef === 'postalcode_link_capital' ? (
                        <ViewText
                            label={`Huidig saldo kapitaal rekening`}
                            id={'amountDefinitive'}
                            value={moneyPresenter(participationsCapitalWorth)}
                            className={'form-group col-md-6'}
                        />
                    ) : null}

                    <InputText
                        label={'IBAN uitkeren t.n.v.'}
                        name={'ibanPayoutAttn'}
                        id={'ibanPayoutAttn'}
                        value={ibanPayoutAttn}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <ViewText
                        label={'Totale opbrengsten'}
                        id={'totalWorthParticipations'}
                        className={'col-sm-6 form-group'}
                        value={moneyPresenter(participationsReturnsTotal)}
                    />

                    {projectTypeCodeRef === 'loan' ? (
                        <InputSelect
                            label={'Uitkeren op'}
                            name={'typeId'}
                            id={'typeId'}
                            options={this.props.participantProjectPayoutTypes}
                            value={typeId}
                            onChangeAction={this.handleInputChange}
                            required={'required'}
                            error={this.state.errors.typeId}
                        />
                    ) : null}
                </div>
                <div className="row">
                    <ViewText
                        label={'Eerste ingangsdatum deelname'}
                        id={'dateRegister'}
                        value={dateRegister ? moment(dateRegister).format('DD-MM-Y') : ''}
                        className={'col-sm-6 form-group'}
                    />
                    {dateTerminated ? (
                        <ViewText
                            label={'Datum beëindiging deelname'}
                            id={'dateTerminated'}
                            value={dateTerminated ? moment(dateTerminated).format('DD-MM-Y') : ''}
                            className={'col-sm-6 form-group'}
                        />
                    ) : null}
                </div>
                {projectTypeCodeRef === 'obligation' ? (
                    <ParticipantFormEditObligation
                        participationWorth={project.participationWorth}
                        participationsDefinitive={participationsDefinitive}
                        participationsDefinitiveWorth={participationsDefinitiveWorth}
                        currentBookWorth={project.currentBookWorth}
                    />
                ) : null}
                {projectTypeCodeRef === 'capital' ? (
                    <ParticipantFormEditCapital
                        participationWorth={project.participationWorth}
                        participationsDefinitive={participationsDefinitive}
                        participationsDefinitiveWorth={participationsDefinitiveWorth}
                        currentBookWorth={project.currentBookWorth}
                    />
                ) : null}
                {projectTypeCodeRef === 'postalcode_link_capital' ? (
                    <ParticipantFormEditPostalcodeLinkCapital
                        participationWorth={project.participationWorth}
                        participationsDefinitive={participationsDefinitive}
                        participationsDefinitiveWorth={participationsDefinitiveWorth}
                        currentBookWorth={project.currentBookWorth}
                        powerKwhConsumption={powerKwhConsumption}
                        participationsReturnsKwhTotal={participationsReturnsKwhTotal}
                        participationsIndicationOfRestitutionEnergyTaxTotal={
                            participationsIndicationOfRestitutionEnergyTaxTotal
                        }
                        handleInputChange={this.handleInputChange}
                    />
                ) : null}
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
                            loading={this.state.isSaving}
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
        participantProjectPayoutTypes: state.systemData.participantProjectPayoutTypes,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantFormEdit);
