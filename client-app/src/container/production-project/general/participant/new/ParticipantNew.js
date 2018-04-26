import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import InputSelect from '../../../../../components/form/InputSelect';
import InputDate from '../../../../../components/form/InputDate';
import ButtonText from '../../../../../components/button/ButtonText';
import PanelFooter from "../../../../../components/panel/PanelFooter";
import InputText from "../../../../../components/form/InputText";
import InputToggle from "../../../../../components/form/InputToggle";

const ParticipantNew = props => {
    const {
        contactId, statusId, productionProjectId, dateRegister, participationsRequested, participationsGranted, participationsSold, participationsRestSale,
        dateContractSend, dateContractRetour, datePayed, ibanPayed, didAcceptAgreement, ibanAttn, giftedByContactId, ibanPayout, legalRepContactId, ibanPayoutAttn, dateEnd,
        typeId, powerKwhConsumption
    } = props.participation;

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <InputSelect
                    label={"Contact"}
                    name={"contactId"}
                    options={props.contacts}
                    optionName={'fullName'}
                    value={contactId}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.contactId}
                />
                <InputSelect
                    label={"Status"}
                    name={"statusId"}
                    options={props.participantProductionProjectStatuses}
                    value={statusId}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.statusId}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={"Productieproject"}
                    name={"productionProjectId"}
                    options={props.productionProjects}
                    value={productionProjectId}
                    onChangeAction={props.handleProductionProjectChange}
                    required={"required"}
                    error={props.errors.productionProjectId}
                />
                <InputDate
                    label={"Inschrijfdatum"}
                    name={"dateRegister"}
                    value={dateRegister}
                    onChangeAction={props.handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputText
                    type={"number"}
                    label={"Participaties aangevraagd"}
                    name={"participationsRequested"}
                    value={participationsRequested}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    type={"number"}
                    label={"Participaties toegekend"}
                    name={"participationsGranted"}
                    value={participationsGranted}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputText
                    type={"number"}
                    label={"Participaties overgedragen"}
                    name={"participationsSold"}
                    value={participationsSold}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    type={"number"}
                    label={"Huidig aantal participaties"}
                    name={"participationsCurrent"}
                    value={statusId == 2 ? participationsGranted - participationsSold: 0}
                    readOnly={true}
                />
            </div>

            <div className="row">
                <InputText
                    label={"Waarde participaties"}
                    name={"totalWorthParticipations"}
                    value={ statusId == 2 ? ((participationsGranted - participationsSold) * props.participationWorth) : 0}
                    readOnly={true}
                />
                <InputText
                    type={"number"}
                    label={"Restverkoop participaties"}
                    name={"participationsRestSale"}
                    value={participationsRestSale}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputDate
                    label={"Contract verstuurd"}
                    name={"dateContractSend"}
                    value={dateContractSend}
                    onChangeAction={props.handleInputChangeDate}
                />
                <InputDate
                    label={"Contract retour"}
                    name={"dateContractRetour"}
                    value={dateContractRetour}
                    onChangeAction={props.handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputDate
                    label={"Betaald op"}
                    name={"datePayed"}
                    value={datePayed}
                    onChangeAction={props.handleInputChangeDate}
                />
                <InputText
                    label={"IBAN betaald"}
                    name={"ibanPayed"}
                    value={ibanPayed}
                    onChangeAction={props.handleInputChange}
                    error={props.errors.ibanPayed}
                />
            </div>

            <div className="row">
                <InputToggle
                    label={"Akkoord reglement"}
                    name={"didAcceptAgreement"}
                    value={didAcceptAgreement}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    label={"IBAN t.n.v."}
                    name={"ibanAttn"}
                    value={ibanAttn}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={"Geschonken door"}
                    name={"giftedByContactId"}
                    options={props.contacts}
                    optionName={'fullName'}
                    value={giftedByContactId}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    label={"IBAN uitkeren"}
                    name={"ibanPayout"}
                    value={ibanPayout}
                    onChangeAction={props.handleInputChange}
                    error={props.errors.ibanPayout}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={"Wettelijke vertegenwoordiger"}
                    name={"legalRepContactId"}
                    options={props.contacts}
                    optionName={'fullName'}
                    value={legalRepContactId}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    label={"IBAN uitkeren t.n.v."}
                    name={"ibanPayoutAttn"}
                    value={ibanPayoutAttn}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputDate
                    label={"Einddatum"}
                    name={"dateEnd"}
                    value={dateEnd}
                    onChangeAction={props.handleInputChangeDate}
                />
                <InputSelect
                    label={"Uitkeren op"}
                    name={"typeId"}
                    options={props.participantProductionProjectPayoutTypes}
                    value={typeId}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.typeId}
                />
            </div>

            {props.isPCR &&
            <div className="row">
                <InputText
                    type={"number"}
                    label={"Jaarlijks verbruik"}
                    name={"powerKwhConsumption"}
                    value={powerKwhConsumption}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.powerKwhConsumption}
                />
            </div>
            }

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"}
                                value={"Submit"}/>
                </div>
            </PanelFooter>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        participantProductionProjectStatuses: state.systemData.participantProductionProjectStatus,
        participantProductionProjectPayoutTypes: state.systemData.participantProductionProjectPayoutTypes,
    }
};

export default connect(mapStateToProps)(ParticipantNew);
