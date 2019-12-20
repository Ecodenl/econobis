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
        participationsCapitalWorth,
        amountDefinitive,
        didAcceptAgreement,
        dateDidAcceptAgreement,
        didUnderstandInfo,
        dateDidUnderstandInfo,
        giftedByContact,
        ibanPayout,
        ibanPayoutAttn,
        type,
        powerKwhConsumption,
        participationsReturnsTotal,
        participationsReturnsKwhTotal,
        participationsIndicationOfRestitutionEnergyTaxTotal,
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
                <ViewText
                    label={'Akkoord voorwaarden'}
                    value={
                        didAcceptAgreement ? (
                            <span>
                                Ja <em>({dateDidAcceptAgreement ? moment(dateDidAcceptAgreement).format('L') : ''})</em>
                            </span>
                        ) : (
                            'Nee'
                        )
                    }
                />
                <ViewText
                    label={'Projectinfo begrepen'}
                    value={
                        didUnderstandInfo ? (
                            <span>
                                Ja <em>({dateDidUnderstandInfo ? moment(dateDidUnderstandInfo).format('L') : ''})</em>
                            </span>
                        ) : (
                            'Nee'
                        )
                    }
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Schenker'} value={giftedByContact ? giftedByContact.fullName : ''} />
                <ViewText label={'IBAN uitkeren'} value={ibanPayout ? ibanPayout : ''} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                {projectTypeCodeRef === 'obligation' ? <div className="col-md-6" /> : null}
                {projectTypeCodeRef === 'loan' ? (
                    <ViewText label={`Huidig saldo lening rekening`} value={moneyPresenter(amountDefinitive)} />
                ) : null}
                {projectTypeCodeRef === 'capital' || projectTypeCodeRef === 'postalcode_link_capital' ? (
                    <ViewText
                        label={`Huidig saldo kapitaal rekening`}
                        value={moneyPresenter(participationsCapitalWorth)}
                    />
                ) : null}

                <ViewText label={'IBAN uitkeren t.n.v.'} value={ibanPayoutAttn ? ibanPayoutAttn : ''} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Totale opbrengsten'} value={moneyPresenter(participationsReturnsTotal)} />
                {project.projectType.codeRef === 'loan' ? (
                    <ViewText label={'Uitkeren op'} value={type ? type.name : ''} />
                ) : null}
            </div>

            {projectTypeCodeRef === 'obligation' ? (
                <ParticipantFormViewObligation
                    onClick={props.switchToEdit}
                    participationWorth={project.participationWorth ? project.participationWorth : ''}
                    participationsDefinitive={participationsDefinitive}
                    participationsDefinitiveWorth={participationsDefinitiveWorth}
                    currentBookWorth={project.currentBookWorth}
                />
            ) : null}

            {projectTypeCodeRef === 'capital' ? (
                <ParticipantFormViewCapital
                    onClick={props.switchToEdit}
                    participationWorth={project.participationWorth ? project.participationWorth : ''}
                    participationsDefinitive={participationsDefinitive}
                    participationsDefinitiveWorth={participationsDefinitiveWorth}
                    currentBookWorth={project.currentBookWorth}
                />
            ) : null}

            {projectTypeCodeRef === 'postalcode_link_capital' ? (
                <ParticipantFormViewPostalcodeLinkCapital
                    onClick={props.switchToEdit}
                    participationWorth={project.participationWorth ? project.participationWorth : ''}
                    participationsDefinitive={participationsDefinitive}
                    participationsDefinitiveWorth={participationsDefinitiveWorth}
                    currentBookWorth={project.currentBookWorth}
                    participationsReturnsKwhTotal={participationsReturnsKwhTotal}
                    participationsIndicationOfRestitutionEnergyTaxTotal={
                        participationsIndicationOfRestitutionEnergyTaxTotal
                    }
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
