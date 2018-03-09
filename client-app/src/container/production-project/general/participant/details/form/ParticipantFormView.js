import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../../../components/form/ViewText';

const ParticipantFormView = props => {
    const {
        contact, status, productionProject, dateRegister, participationsRequested, participationsGranted, participationsSold, participationsCurrent,
        participationsWorthTotal, participationsRestSale, dateContractSend, dateContractRetour, datePayed, ibanPayed, didAcceptAgreement,
        ibanAttn, giftedByContact, ibanPayout, legalRepContact, ibanPayoutAttn, dateEnd, type, powerKwhConsumption
    } = props.participantProductionProject;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Contact"}
                    value={contact ? contact.fullName : ''}
                />
                <ViewText
                    label={"Status"}
                    value={status ? status.name : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Productieproject"}
                    value={productionProject ? productionProject.name : ''}
                />
                <ViewText
                    label={"Inschrijf datum"}
                    value={dateRegister ? moment(dateRegister).format('L') : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Participaties aangevraagd"}
                    value={participationsRequested ? participationsRequested : ''}
                />
                <ViewText
                    label={"Participaties toegekend"}
                    value={participationsGranted ? participationsGranted : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Participaties verkocht"}
                    value={participationsSold ? participationsSold : ''}
                />
                <ViewText
                    label={"Huidig aantal participaties"}
                    value={participationsCurrent ? participationsCurrent : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Waarde participaties"}
                    value={participationsWorthTotal ? participationsWorthTotal : ''}
                />
                <ViewText
                    label={"Restverkoop participaties"}
                    value={participationsRestSale ? participationsRestSale : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Contract verstuurd"}
                    value={dateContractSend ? moment(dateContractSend).format('L') : ''}
                />
                <ViewText
                    label={"Contract retour"}
                    value={dateContractRetour ? moment(dateContractRetour).format('L') : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Betaald op"}
                    value={datePayed ? moment(datePayed).format('L') : ''}
                />
                <ViewText
                    label={"IBAN betaald"}
                    value={ibanPayed ? ibanPayed : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Akkoord regelement"}
                    value={didAcceptAgreement ? 'Ja' : 'Nee'}
                />
                <ViewText
                    label={"IBAN tnv"}
                    value={ibanAttn ? ibanAttn : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Geschonken door"}
                    value={giftedByContact ? giftedByContact.fullName : ''}
                />
                <ViewText
                    label={"IBAN uitkeren"}
                    value={ibanPayout ? ibanPayout : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Wettelijke vertegenwoordiger"}
                    value={legalRepContact ? legalRepContact.fullName : ''}
                />
                <ViewText
                    label={"IBAN uitkeren tnv"}
                    value={ibanPayoutAttn ? ibanPayoutAttn : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Einddatum"}
                    value={dateEnd ? moment(dateEnd).format('L') : ''}
                />
                <ViewText
                    label={"Uitkeren op"}
                    value={type ? type.name : ''}
                />
            </div>
            { props.participantProductionProject.productionProject.typeId == 2 &&
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Jaarlijks verbruik"}
                    value={powerKwhConsumption && powerKwhConsumption}
                />
            </div>
            }



        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        participantProductionProject: state.participantProductionProjectDetails,
    }
};

export default connect(mapStateToProps)(ParticipantFormView);