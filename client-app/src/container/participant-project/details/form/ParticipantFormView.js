import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';
import ParticipantFormViewObligation from './view/ParticipantFormViewObligation';
import ParticipantFormViewCapital from './view/ParticipantFormViewCapital';

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
        updatedAt,
        dateContractSend,
        dateContractRetour,
        didAcceptAgreement,
        giftedByContact,
        ibanPayout,
        ibanPayoutAttn,
        dateEnd,
        type,
    } = props.participantProject;

    const projectTypeCodeRef = props.participantProject.project.projectType.codeRef;

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
                    label={'Project'}
                    value={project ? project.name : ''}
                    link={project ? 'project/' + project.id : ''}
                />
                <ViewText
                    label={'Contract verstuurd'}
                    value={dateContractSend ? moment(dateContractSend).format('L') : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Datum'} value={updatedAt ? moment(updatedAt.date).format('L') : ''} />
                <ViewText
                    label={'Contract retour'}
                    value={dateContractRetour ? moment(dateContractRetour).format('L') : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Administratie'} value={project.administration ? project.administration.name : ''} />
                <ViewText label={'Einddatum'} value={dateEnd ? moment(dateEnd.date).format('L') : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Akkoord reglement'} value={didAcceptAgreement ? 'Ja' : 'Nee'} />
                <ViewText label={'Inschrijfdatum'} value={dateRegister ? moment(dateRegister).format('L') : ''} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Schenker'} value={giftedByContact ? giftedByContact.fullName : ''} />
                <ViewText label={'IBAN uitkeren'} value={ibanPayout ? ibanPayout : ''} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Huidige saldo kapitaal rekening'} value={'????'} />
                <ViewText label={'IBAN uitkeren t.n.v.'} value={ibanPayoutAttn ? ibanPayoutAttn : ''} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Totale opbrengsten'} value={'????'} />
                <ViewText label={'Uitkeren op'} value={type ? type.name : ''} />
            </div>

            {projectTypeCodeRef === 'obligation' ? (
                <ParticipantFormViewObligation
                    onClick={props.switchToEdit}
                    participationsRequested={participationsRequested}
                    participationsGranted={participationsGranted}
                />
            ) : null}

            {projectTypeCodeRef === 'capital' ? (
                <ParticipantFormViewCapital
                    onClick={props.switchToEdit}
                    participationsRequested={participationsRequested}
                    participationsGranted={participationsGranted}
                />
            ) : null}

            {projectTypeCodeRef === 'postalcode_link_capital' ? (
                <React.Fragment>
                    <hr style={{ margin: '10px 0' }} />
                    <h4>Postcoderoos</h4>
                </React.Fragment>
            ) : null}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        participantProject: state.participantProjectDetails,
    };
};

export default connect(mapStateToProps)(ParticipantFormView);
