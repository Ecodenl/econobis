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
        datePlannedAttempt1,
        datePlannedAttempt2,
        datePlannedAttempt3,
        datePlanned,
        dateApprovedExternal,
        dateUnderReview,
        dateApprovedProjectManager,
        dateApprovedClient,
        dateExecuted,
        quotationText,
        quotationAmount,
        costAdjustment,
        awardAmount,
        dateUnderReviewDetermination,
        dateApprovedDetermination,
        amountDetermination,
        opportunity,
        coachOrOrganisationNote,
        projectmanagerNote,
        externalpartyNote,
        clientNote,
    } = props.quotationRequestDetails;

    const timePlannedFormated = datePlanned ? moment(datePlanned).format('HH:mm') : '';
    const timeRecordedFormated = dateRecorded ? moment(dateRecorded).format('HH:mm') : '';
    const timeReleasedFormated = dateReleased ? moment(dateReleased).format('HH:mm') : '';

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
                ) : null}
            </div>

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

            {opportunityAction.codeRef === 'visit' || opportunityAction.codeRef === 'redirection' ? (
                <>
                    <div className="row">
                        <ViewText
                            label={'Datum afspraakpoging 1'}
                            value={datePlannedAttempt1 ? moment(datePlannedAttempt1).format('L') : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Datum afspraakpoging 2'}
                            value={datePlannedAttempt2 ? moment(datePlannedAttempt2).format('L') : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Datum afspraakpoging 3'}
                            value={datePlannedAttempt3 ? moment(datePlannedAttempt3).format('L') : ''}
                        />
                    </div>
                </>
            ) : null}

            {opportunityAction.codeRef === 'visit' ||
            opportunityAction.codeRef === 'quotation-request' ||
            opportunityAction.codeRef === 'subsidy-request' ? (
                <div className="row">
                    <ViewText label={'Datum afspraak'} value={datePlanned ? moment(datePlanned).format('L') : ''} />
                    {datePlanned ? (
                        <ViewText
                            label={'Tijd afspraak'}
                            value={timePlannedFormated != '00:00' ? timePlannedFormated : 'Onbekend'}
                        />
                    ) : null}
                </div>
            ) : null}

            <div className="row">
                <ViewText
                    label={opportunityAction.codeRef === 'redirection' ? 'Datum afgehandeld' : 'Afspraak gedaan op'}
                    value={dateRecorded ? moment(dateRecorded).format('L') : ''}
                />
                {dateRecorded ? (
                    <ViewText
                        label={'Tijd opname'}
                        value={timeRecordedFormated != '00:00' ? timeRecordedFormated : 'Onbekend'}
                    />
                ) : null}
            </div>

            {opportunityAction.codeRef === 'quotation-request' || opportunityAction.codeRef === 'subsidy-request' ? (
                <>
                    <div className="row">
                        <ViewText
                            label={'Datum uitgebracht'}
                            value={dateReleased ? moment(dateReleased).format('L') : ''}
                        />
                        {dateReleased ? (
                            <ViewText
                                label={'Tijd uitgebracht'}
                                value={timeReleasedFormated != '00:00' ? timeReleasedFormated : 'Onbekend'}
                            />
                        ) : null}
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Datum akkoord bewoner'}
                            value={dateApprovedClient ? moment(dateApprovedClient).format('L ') : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Datum akkoord projectleider'}
                            value={dateApprovedProjectManager ? moment(dateApprovedProjectManager).format('L') : ''}
                        />
                    </div>
                </>
            ) : null}
            {opportunityAction.codeRef === 'subsidy-request' ? (
                <>
                    <div className="row">
                        <ViewText
                            label={'Datum akkoord toekenning'}
                            value={dateApprovedExternal ? moment(dateApprovedExternal).format('L') : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Datum toekenning in behandeling'}
                            value={dateUnderReview ? moment(dateUnderReview).format('L') : ''}
                        />
                    </div>
                </>
            ) : null}
            {opportunityAction.codeRef === 'quotation-request' || opportunityAction.codeRef === 'subsidy-request' ? (
                <>
                    <div className="row">
                        <ViewText
                            label={'Datum uitgevoerd'}
                            value={dateExecuted ? moment(dateExecuted).format('L') : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={
                                opportunityAction.codeRef === 'subsidy-request'
                                    ? 'Budgetaanvraagbedrag'
                                    : 'Offertebedrag'
                            }
                            value={quotationAmount ? quotationAmount : ''}
                        />
                    </div>
                </>
            ) : null}

            {opportunityAction.codeRef === 'subsidy-request' ? (
                <>
                    <div className="row">
                        <ViewText label={'Kosten aanpassing'} value={costAdjustment ? costAdjustment : ''} />
                    </div>
                    <div className="row">
                        <ViewText label={'Bedrag toekenning'} value={awardAmount ? awardAmount : ''} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Datum vaststelling in behandeling'}
                            value={dateUnderReviewDetermination && moment(dateUnderReviewDetermination).format('L')}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Datum akkoord vaststelling'}
                            value={dateApprovedDetermination && moment(dateApprovedDetermination).format('L')}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Bedrag vaststelling'}
                            value={amountDetermination ? amountDetermination : ''}
                        />
                    </div>
                </>
            ) : null}

            {opportunityAction.codeRef === 'visit' ||
            opportunityAction.codeRef === 'quotation-request' ||
            opportunityAction.codeRef === 'subsidy-request' ? (
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
            ) : null}

            {opportunityAction.codeRef === 'quotation-request' || opportunityAction.codeRef === 'subsidy-request' ? (
                <div className="row">
                    <div className="col-sm-3">
                        <label htmlFor="projectmanagerNote" className="col-sm-12">
                            Opmerkingen projectleider
                        </label>
                    </div>
                    <div className="col-sm-9" id="projectmanagerNote">
                        {projectmanagerNote}
                    </div>
                </div>
            ) : null}
            {opportunityAction.codeRef === 'quotation-request' ||
            opportunityAction.codeRef === 'subsidy-request' ||
            opportunityAction.codeRef === 'redirection' ? (
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
            {opportunityAction.codeRef === 'quotation-request' || opportunityAction.codeRef === 'subsidy-request' ? (
                <div className="row">
                    <div className="col-sm-3">
                        <label htmlFor="clientNote" className="col-sm-12">
                            Opmerkingen bewoner
                        </label>
                    </div>
                    <div className="col-sm-9" id="clientNote">
                        {clientNote}
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
