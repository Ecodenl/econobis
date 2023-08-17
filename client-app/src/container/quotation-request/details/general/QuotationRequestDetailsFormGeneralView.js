import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';

const QuotationRequestDetailsFormGeneralView = props => {
    const {
        organisationOrCoach,
        projectManager,
        externalParty,
        status,
        opportunityAction,
        datePlannedToSendWfEmailStatus,
        dateRecorded,
        dateReleased,
        datePlanned,
        dateApprovedExternal,
        dateUnderReview,
        dateApprovedProjectManager,
        dateApprovedClient,
        dateExecuted,
        quotationText,
        quotationAmount,
        opportunity,
        coachOrOrganisationNote,
        externalpartyNote,
    } = props.quotationRequestDetails;

    const timePlannedFormated = datePlanned ? moment(datePlanned).format('HH:mm') : null;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={'Organisatie/Coach'}
                    value={organisationOrCoach && organisationOrCoach.fullName}
                    link={organisationOrCoach ? 'contact/' + organisationOrCoach.id : ''}
                />
                <ViewText
                    label={'Verzoek voor bewoner'}
                    value={opportunity.intake && opportunity.intake.contact.fullName}
                    link={'contact/' + opportunity.intake.contact.id}
                />
            </div>
            {opportunityAction.codeRef === 'quotation-request' ? (
                <>
                    <div className="row">
                        <ViewText
                            label={'Externe Partij'}
                            value={externalParty && externalParty.fullName}
                            link={externalParty ? 'contact/' + externalParty.id : ''}
                        />
                        <ViewText label={'Adres'} value={opportunity.intake && opportunity.intake.fullAddress} />
                    </div>
                </>
            ) : null}
            {opportunityAction.codeRef === 'visit' || opportunityAction.codeRef === 'subsidy-request' ? (
                <>
                    <div className="row">
                        <ViewText
                            label={'Projectleider'}
                            value={projectManager && projectManager.fullName}
                            link={projectManager ? 'contact/' + projectManager.id : ''}
                        />
                        <ViewText label={'Adres'} value={opportunity.intake && opportunity.intake.fullAddress} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Externe Partij'}
                            value={externalParty && externalParty.fullName}
                            link={externalParty ? 'contact/' + externalParty.id : ''}
                        />
                    </div>
                </>
            ) : null}

            {organisationOrCoach && organisationOrCoach.typeId === 'organisation' && (
                <div className="row">
                    <ViewText
                        label={'Organisatie contactpersoon'}
                        value={
                            organisationOrCoach.contactPerson ? organisationOrCoach.contactPerson.contact.fullName : ''
                        }
                        link={
                            organisationOrCoach.contactPerson
                                ? 'contact/' + organisationOrCoach.contactPerson.contact.id
                                : ''
                        }
                    />
                </div>
            )}

            <div className="row">
                <ViewText
                    label={'Maatregel categorie'}
                    value={opportunity.measureCategory && opportunity.measureCategory.name}
                />
            </div>

            <div className="row">
                <ViewText
                    label={'Maatregelen specifiek'}
                    value={opportunity.measures && opportunity.measures.map(measure => measure.name).join(', ')}
                />
            </div>

            <div className="row">
                <ViewText label={'Status'} value={status && status.name} />
                {status && status.usesWf ? (
                    <ViewText
                        label={'Datum workflow email'}
                        value={datePlannedToSendWfEmailStatus ? moment(datePlannedToSendWfEmailStatus).format('L') : ''}
                    />
                ) : (
                    ''
                )}
                ;
            </div>

            <div className="row">
                <ViewText label={'Datum afspraak'} value={datePlanned ? moment(datePlanned).format('L') : ''} />
                <ViewText
                    label={'Tijd afspraak'}
                    value={
                        timePlannedFormated ? (timePlannedFormated != '00:00' ? timePlannedFormated : 'Onbekend') : ''
                    }
                />
            </div>

            <div className="row">
                <ViewText label={'Datum opname'} value={dateRecorded ? moment(dateRecorded).format('L') : ''} />
                <ViewText label={'Tijd opname'} value={dateRecorded ? moment(dateRecorded).format('HH:mm') : ''} />
            </div>

            {opportunityAction.codeRef === 'quotation-request' || opportunityAction.codeRef === 'subsidy-request' ? (
                <div className="row">
                    <ViewText
                        label={'Datum uitgebracht'}
                        value={dateReleased ? moment(dateReleased).format('L') : ''}
                    />
                    <ViewText
                        label={'Tijd uitgebracht'}
                        value={dateReleased ? moment(dateReleased).format('HH:mm') : ''}
                    />
                </div>
            ) : null}

            {opportunityAction.codeRef === 'subsidy-request' ? (
                <div className="row">
                    <ViewText
                        label={'Datum akkoord bewoner'}
                        value={dateApprovedClient ? moment(dateApprovedClient).format('L ') : ''}
                    />
                </div>
            ) : null}
            {opportunityAction.codeRef === 'quotation-request' || opportunityAction.codeRef === 'subsidy-request' ? (
                <div className="row">
                    <ViewText
                        label={'Datum akkoord projectleider'}
                        value={dateApprovedProjectManager ? moment(dateApprovedProjectManager).format('L') : ''}
                    />
                </div>
            ) : null}
            {opportunityAction.codeRef === 'quotation-request' || opportunityAction.codeRef === 'subsidy-request' ? (
                <div className="row">
                    <ViewText
                        label={'Datum akkoord extern'}
                        value={dateApprovedExternal ? moment(dateApprovedExternal).format('L') : ''}
                    />
                </div>
            ) : null}
            {opportunityAction.codeRef === 'quotation-request' || opportunityAction.codeRef === 'subsidy-request' ? (
                <div className="row">
                    <ViewText
                        label={'Datum in behandeling'}
                        value={dateUnderReview ? moment(dateUnderReview).format('L') : ''}
                    />
                </div>
            ) : null}

            {opportunityAction.codeRef === 'quotation-request' || opportunityAction.codeRef === 'subsidy-request' ? (
                <div className="row">
                    <ViewText label={'Datum uitgevoerd'} value={dateExecuted ? moment(dateExecuted).format('L') : ''} />
                </div>
            ) : null}

            <div className="row">
                <div className="col-sm-3">
                    <label htmlFor="quotationText" className="col-sm-12">
                        Omschrijving
                    </label>
                </div>
                <div className="col-sm-9" id="quotationText">
                    {quotationText}
                </div>
            </div>
            {opportunityAction.codeRef === 'quotation-request' || opportunityAction.codeRef === 'subsidy-request' ? (
                <div className="row">
                    <ViewText
                        label={
                            opportunityAction.codeRef === 'subsidy-request' ? 'Budgetaanvraagbedrag' : 'Offertebedrag'
                        }
                        value={quotationAmount ? quotationAmount : ''}
                    />
                </div>
            ) : null}

            <div className="row">
                <div className="col-sm-3">
                    <label htmlFor="coachOrOrganisationNote" className="col-sm-12">
                        Opmerkingen coach of organisatie
                    </label>
                </div>
                <div className="col-sm-9" id="coachOrOrganisationNote">
                    {coachOrOrganisationNote}
                </div>
            </div>

            {opportunityAction.codeRef === 'quotation-request' || opportunityAction.codeRef === 'subsidy-request' ? (
                <div className="row">
                    <div className="col-sm-3">
                        <label htmlFor="externalpartyNote" className="col-sm-12">
                            Opmerkingen externe partij
                        </label>
                    </div>
                    <div className="col-sm-9" id="externalpartyNote">
                        {externalpartyNote}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        quotationRequestDetails: state.quotationRequestDetails,
    };
};

export default connect(mapStateToProps)(QuotationRequestDetailsFormGeneralView);
