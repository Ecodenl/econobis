import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../../../components/form/ViewText';

const ParticipantFormView = props => {
    const {
        contact,
        status,
        project,
        dateRegister,
        participationsRequested,
        participationsGranted,
        participationsSold,
        participationsCurrent,
        participationsWorthTotal,
        participationsRestSale,
        dateContractSend,
        dateContractRetour,
        datePayed,
        didAcceptAgreement,
        giftedByContact,
        ibanPayout,
        legalRepContact,
        ibanPayoutAttn,
        dateEnd,
        type,
        powerKwhConsumption,
    } = props.participantProject;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Contact'}
                    value={contact ? contact.fullName : ''}
                    link={contact ? 'contact/' + contact.id : ''}
                />
                <ViewText label={'Status'} value={status ? status.name : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Productieproject'}
                    value={project ? project.name : ''}
                    link={project ? 'project/' + project.id : ''}
                />
                <ViewText label={'Inschrijfdatum'} value={dateRegister ? moment(dateRegister).format('L') : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Participaties aangevraagd'}
                    value={participationsRequested ? participationsRequested : ''}
                />
                <ViewText
                    label={'Participaties toegekend'}
                    value={participationsGranted ? participationsGranted : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Participaties overgedragen'} value={participationsSold ? participationsSold : ''} />
                <ViewText
                    label={'Huidig aantal participaties'}
                    value={participationsCurrent ? participationsCurrent : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Waarde participaties'}
                    value={participationsWorthTotal ? participationsWorthTotal : ''}
                />
                <ViewText
                    label={'Restverkoop participaties'}
                    value={participationsRestSale ? participationsRestSale : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Contract verstuurd'}
                    value={dateContractSend ? moment(dateContractSend).format('L') : ''}
                />
                <ViewText
                    label={'Contract retour'}
                    value={dateContractRetour ? moment(dateContractRetour).format('L') : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Betaald op'} value={datePayed ? moment(datePayed).format('L') : ''} />
                <ViewText label={'Akkoord reglement'} value={didAcceptAgreement ? 'Ja' : 'Nee'} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Geschonken door'} value={giftedByContact ? giftedByContact.fullName : ''} />
                <ViewText label={'IBAN uitkeren'} value={ibanPayout ? ibanPayout : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Wettelijke vertegenwoordiger'}
                    className={'col-xs-6 field-to-be-removed'}
                    value={legalRepContact ? legalRepContact.fullName : ''}
                />
                <ViewText label={'IBAN uitkeren t.n.v.'} value={ibanPayoutAttn ? ibanPayoutAttn : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Einddatum'} value={dateEnd ? moment(dateEnd).format('L') : ''} />
                <ViewText label={'Uitkeren op'} value={type ? type.name : ''} />
            </div>
            {props.participantProject.project.typeId == 2 && (
                <div className="row" onClick={props.switchToEdit}>
                    <ViewText label={'Jaarlijks verbruik'} value={powerKwhConsumption && powerKwhConsumption} />
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        participantProject: state.participantProjectDetails,
    };
};

export default connect(mapStateToProps)(ParticipantFormView);
