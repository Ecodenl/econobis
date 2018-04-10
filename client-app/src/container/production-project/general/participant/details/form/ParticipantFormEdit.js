import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import validator from 'validator';

import InputText from '../../../../../../components/form/InputText';
import InputSelect from '../../../../../../components/form/InputSelect';
import InputDate from '../../../../../../components/form/InputDate';
import ButtonText from '../../../../../../components/button/ButtonText';
import PanelFooter from "../../../../../../components/panel/PanelFooter";

import ParticipantProductionProjectDetailsAPI from '../../../../../../api/participant-production-project/ParticipantProductionProjectDetailsAPI';

import { fetchParticipantProductionProjectDetails } from '../../../../../../actions/participants-production-project/ParticipantProductionProjectDetailsActions';
import InputToggle from "../../../../../../components/form/InputToggle";
import ContactsAPI from "../../../../../../api/contact/ContactsAPI";
import ProductionProjectsAPI from "../../../../../../api/production-project/ProductionProjectsAPI";
import * as ibantools from "ibantools/build/ibantools";

class ParticipantFormEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id, contact, statusId, productionProject, dateRegister, participationsRequested, participationsGranted, participationsSold, participationsRestSale,
            dateContractSend, dateContractRetour, datePayed, ibanPayed, didAcceptAgreement, ibanAttn, giftedByContactId, ibanPayout, legalRepContactId, ibanPayoutAttn, dateEnd,
            typeId, powerKwhConsumption
        } = props.participation;

        this.state = {
            contacts: [],
            participationWorth: productionProject.participationWorth ? productionProject.participationWorth : 0,
            participation: {
                id,
                contactName: contact.fullName,
                statusId,
                productionProjectName: productionProject.name,
                dateRegister: dateRegister ? dateRegister : '',
                participationsRequested: participationsRequested ? participationsRequested : '',
                participationsGranted: participationsGranted ? participationsGranted : '',
                participationsSold: participationsSold ? participationsSold : '',
                participationsRestSale: participationsRestSale ? participationsRestSale : '',
                dateContractSend: dateContractSend ? dateContractSend : '',
                dateContractRetour: dateContractRetour ? dateContractRetour : '',
                datePayed: datePayed ? datePayed : '',
                ibanPayed: ibanPayed ? ibanPayed : '',
                didAcceptAgreement: !!didAcceptAgreement,
                ibanAttn: ibanAttn ? ibanAttn : '',
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
                productionProjectId: false,
                typeId: false,
                ibanPayed: false,
                ibanPayout: false,
            },
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    componentWillMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload
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
                [name]: value
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            participation: {
                ...this.state.participation,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {participation} = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(participation.contactId + '')) {
            errors.contactId = true;
            hasErrors = true;
        }
        ;

        if (validator.isEmpty(participation.statusId + '')) {
            errors.statusId = true;
            hasErrors = true;
        }
        ;

        if (validator.isEmpty(participation.productionProjectId + '')) {
            errors.productionProjectId = true;
            hasErrors = true;
        }
        ;

        if (validator.isEmpty(participation.typeId + '')) {
            errors.typeId = true;
            hasErrors = true;
        }
        ;

        if (!validator.isEmpty(participation.ibanPayed)) {
            if (!ibantools.isValidIBAN(participation.ibanPayed)) {
                errors.ibanPayed = true;
                hasErrors = true;
            }
        }

        if (!validator.isEmpty(participation.ibanPayout)) {
            if (!ibantools.isValidIBAN(participation.ibanPayout)) {
                errors.ibanPayed = true;
                hasErrors = true;
            }
        }

        this.setState({...this.state, errors: errors});

        !hasErrors &&
        ParticipantProductionProjectDetailsAPI.updateParticipantProductionProject(participation.id, participation).then(payload => {
            this.props.fetchParticipantProductionProjectDetails(participation.id);
            this.props.switchToView();
        });
    };

    render() {
        const {
            contactName, statusId, productionProjectName, dateRegister, participationsRequested, participationsGranted, participationsSold, participationsRestSale,
            dateContractSend, dateContractRetour, datePayed, ibanPayed, didAcceptAgreement, ibanAttn, giftedByContactId, ibanPayout, legalRepContactId, ibanPayoutAttn, dateEnd,
            typeId, powerKwhConsumption
        }  = this.state.participation;


        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Contact"}
                        name={"contactName"}
                        value={contactName}
                        readOnly={true}
                    />
                    <InputSelect
                        label={"Status"}
                        name={"statusId"}
                        options={this.props.participantProductionProjectStatuses}
                        value={statusId}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.statusId}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={"Productieproject"}
                        name={"productionProjectName"}
                        value={productionProjectName}
                        readOnly={true}
                    />
                    <InputDate
                        label={"Inschrijfdatum"}
                        name={"dateRegister"}
                        value={dateRegister}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>

                <div className="row">
                    <InputText
                        type={"number"}
                        label={"Participaties aangevraagd"}
                        name={"participationsRequested"}
                        value={participationsRequested}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        type={"number"}
                        label={"Participaties toegekend"}
                        name={"participationsGranted"}
                        value={participationsGranted}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        type={"number"}
                        label={"Participaties overgedragen"}
                        name={"participationsSold"}
                        value={participationsSold}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        type={"number"}
                        label={"Huidig aantal participaties"}
                        name={"participationsCurrent"}
                        value={participationsGranted - participationsSold}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={"Waarde participaties"}
                        name={"totalWorthParticipations"}
                        value={ ((participationsGranted - participationsSold) * this.state.participationWorth)}
                        readOnly={true}
                    />
                    <InputText
                        type={"number"}
                        label={"Restverkoop participaties"}
                        name={"participationsRestSale"}
                        value={participationsRestSale}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label={"Contract verstuurd"}
                        name={"dateContractSend"}
                        value={dateContractSend}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputDate
                        label={"Contract retour"}
                        name={"dateContractRetour"}
                        value={dateContractRetour}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label={"Betaald op"}
                        name={"datePayed"}
                        value={datePayed}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputText
                        label={"IBAN betaald"}
                        name={"ibanPayed"}
                        value={ibanPayed}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={"Akkoord reglement"}
                        name={"didAcceptAgreement"}
                        value={didAcceptAgreement}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"IBAN t.n.v."}
                        name={"ibanAttn"}
                        value={ibanAttn}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Geschonken door"}
                        name={"giftedByContactId"}
                        options={this.state.contacts}
                        optionName={'fullName'}
                        value={giftedByContactId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"IBAN uitkeren"}
                        name={"ibanPayout"}
                        value={ibanPayout}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Wettelijke vertegenwoordiger"}
                        name={"legalRepContactId"}
                        options={this.state.contacts}
                        optionName={'fullName'}
                        value={legalRepContactId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"IBAN uitkeren t.n.v."}
                        name={"ibanPayoutAttn"}
                        value={ibanPayoutAttn}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label={"Einddatum"}
                        name={"dateEnd"}
                        value={dateEnd}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputSelect
                        label={"Uitkeren op"}
                        name={"typeId"}
                        options={this.props.participantProductionProjectPayoutTypes}
                        value={typeId}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.typeId}
                    />
                </div>

                { this.props.participation.productionProject.typeId == 2 &&
                <div className="row">
                    <InputText
                        label={"Jaarlijks verbruik"}
                        name={"powerKwhConsumption"}
                        value={powerKwhConsumption}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                }

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                    onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"}
                                    value={"Submit"}/>
                    </div>
                </PanelFooter>
            </form>
        );
    };
};

const mapDispatchToProps = dispatch => ({
    fetchParticipantProductionProjectDetails: (id) => {
        dispatch(fetchParticipantProductionProjectDetails(id));
    },
});

const mapStateToProps = (state) => {
    return {
        participation: state.participantProductionProjectDetails,
        participantProductionProjectStatuses: state.systemData.participantProductionProjectStatus,
        participantProductionProjectPayoutTypes: state.systemData.participantProductionProjectPayoutTypes,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantFormEdit);
