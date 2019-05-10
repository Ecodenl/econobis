import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import moneyPresenter from '../../../../helpers/MoneyPresenter';
import ViewText from '../../../../components/form/ViewText';
import ParticipantFormViewObligation from './view/ParticipantFormViewObligation';
import ParticipantFormViewCapital from './view/ParticipantFormViewCapital';
import ParticipantFormViewPostalcodeLinkCapital from './view/ParticipantFormViewPostalcodeLinkCapital';

const ParticipantFormView = props => {
    const {
        contact,
        uniqueMutationStatuses,
        project,
        participationsDefinitive,
        participationsDefinitiveWorth,
        amountDefinitive,
        didAcceptAgreement,
        giftedByContact,
        ibanPayout,
        ibanPayoutAttn,
        type,
        powerKwhConsumption,
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
                <ViewText label={'Status'} value={uniqueMutationStatuses.map(item => item.name).join(', ')} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Project'}
                    value={project ? project.name : ''}
                    link={project ? 'project/' + project.id : ''}
                />
                <ViewText label={'Administratie'} value={project.administration ? project.administration.name : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Akkoord reglement'} value={didAcceptAgreement ? 'Ja' : 'Nee'} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Schenker'} value={giftedByContact ? giftedByContact.fullName : ''} />
                <ViewText label={'IBAN uitkeren'} value={ibanPayout ? ibanPayout : ''} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                {projectTypeCodeRef === 'obligation' ? (
                    <div className="col-md-6" />
                ) : (
                    <ViewText
                        label={`Huidig saldo ${projectTypeCodeRef === 'loan' ? 'lening' : 'kapitaal'} rekening`}
                        value={amountDefinitive && moneyPresenter(amountDefinitive)}
                    />
                )}
                <ViewText label={'IBAN uitkeren t.n.v.'} value={ibanPayoutAttn ? ibanPayoutAttn : ''} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Totale opbrengsten'} value={moneyPresenter(0)} />
                <ViewText label={'Uitkeren op'} value={type ? type.name : ''} />
            </div>

            {projectTypeCodeRef === 'obligation' ? (
                <ParticipantFormViewObligation
                    onClick={props.switchToEdit}
                    participationWorth={project.participationWorth ? project.participationWorth : ''}
                    participationsDefinitive={participationsDefinitive}
                    participationsDefinitiveWorth={participationsDefinitiveWorth}
                    valueCourses={project.valueCourses}
                />
            ) : null}

            {projectTypeCodeRef === 'capital' ? (
                <ParticipantFormViewCapital
                    onClick={props.switchToEdit}
                    participationWorth={project.participationWorth ? project.participationWorth : ''}
                    participationsDefinitive={participationsDefinitive}
                    participationsDefinitiveWorth={participationsDefinitiveWorth}
                    valueCourses={project.valueCourses}
                />
            ) : null}

            {projectTypeCodeRef === 'postalcode_link_capital' ? (
                <ParticipantFormViewPostalcodeLinkCapital
                    onClick={props.switchToEdit}
                    participationWorth={project.participationWorth ? project.participationWorth : ''}
                    participationsDefinitive={participationsDefinitive}
                    participationsDefinitiveWorth={participationsDefinitiveWorth}
                    valueCourses={project.valueCourses}
                    powerKwhConsumption={powerKwhConsumption}
                />
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
