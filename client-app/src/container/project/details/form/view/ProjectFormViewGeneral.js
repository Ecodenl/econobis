import React from 'react';
import { connect } from 'react-redux';
import ViewText from '../../../../../components/form/ViewText';
import moment from 'moment';
import ViewTextLong from '../../../../../components/form/ViewTextLong';

const ProjectFormViewGeneral = ({
    name,
    code,
    description,
    projectStatus,
    projectType,
    postalCode,
    address,
    city,
    dateStartRegistrations,
    dateEndRegistrations,
    ownedBy,
    administration,
    usesMollie,
    dateStart,
    dateEnd,
    dateEntry,
    contactGroupIds,
    dateProduction,
    isMembershipRequired,
    administrations,
    hasPaymentInvoices,
    requiresContactGroups,
    documentTemplateAgreement,
    emailTemplateAgreement,
    linkAgreeTerms,
    linkUnderstandInfo,
    linkProjectInfo,
    showQuestionAboutMembership,
    questionAboutMembershipGroup,
    textIsMember,
    textIsNoMember,
    textBecomeMember,
    memberGroup,
    textBecomeNoMember,
    noMemberGroup,
    textAgreeTerms,
    textLinkAgreeTerms,
    textLinkUnderstandInfo,
    textAcceptAgreement,
    textAcceptAgreementQuestion,
    textRegistrationFinished,
    textTransactionCosts,
    transactionCostsCodeRef,
    transactionCostsCodeRefWithName,
    transactionCostsAmountMin,
    transactionCostsAmountMax,
    transactionCostsAmount,
    transactionCostsPercentage,
    transactionCostsAmount2,
    transactionCostsPercentage2,
    transactionCostsAmount3,
    transactionCostsPercentage3,
}) => (
    <React.Fragment>
        <h4>Algemeen</h4>
        <div className="row">
            <ViewText label={'Project'} value={name} />
            <ViewText label={'Projectcode'} value={code} />
        </div>
        <div className="row">
            <ViewText label={'Type project'} value={projectType ? projectType.name : ''} />
            <ViewText label={'Status'} value={projectStatus ? projectStatus.name : ''} />
        </div>
        <div className="row">
            <div className="col-sm-3">
                <label htmlFor="description" className="col-sm-12">
                    Omschrijving
                </label>
            </div>
            <div className="col-sm-9" id="description">
                {description}
            </div>
        </div>
        <div className="row">
            <ViewText label={'Postcode'} value={postalCode} />
            <ViewText label={'Adres'} value={address} />
        </div>
        <div className="row">
            <ViewText label={'Plaats'} value={city} />
        </div>
        <div className="row">
            <ViewText
                label={'Start inschrijving'}
                value={dateStartRegistrations ? moment(dateStartRegistrations).format('L') : ''}
            />
            <ViewText label={'Verantwoordelijke'} value={ownedBy ? ownedBy.fullName : ''} />
        </div>
        <div className="row">
            <ViewText
                label={'Eind inschrijving'}
                value={dateEndRegistrations ? moment(dateEndRegistrations).format('L') : ''}
            />

            <ViewText label={'Administratie'} value={administration ? administration.name : ''} />
        </div>
        <div className="row">
            <ViewText />
            <ViewText label={'Gebruikt Mollie'} value={usesMollie ? 'Ja' : 'Nee'} />
        </div>
        <div className="row">
            <ViewText label={'Start project'} value={dateStart ? moment(dateStart).format('L') : ''} />
            <ViewText label={'Deelname aan groep verplicht'} value={isMembershipRequired ? 'Ja' : 'Nee'} />
        </div>
        <div className="row">
            <ViewText label={'Einde project'} value={dateEnd ? moment(dateEnd).format('L') : ''} />
            {isMembershipRequired ? (
                <ViewText
                    label={'Onderdeel van groep'}
                    value={
                        requiresContactGroups &&
                        requiresContactGroups.map(requiresContactGroup => requiresContactGroup.name).join(', ')
                    }
                />
            ) : null}
        </div>
        <div className="row">
            <ViewText label={'Start productie'} value={dateProduction ? moment(dateProduction).format('L') : ''} />
            <ViewText label={'Standaard ingangsdatum mutatie'} value={dateEntry ? moment(dateEntry).format('L') : ''} />
        </div>
        <hr />
        <h4>Contacten portal instellingen</h4>
        <div className="row">
            <label htmlFor="projectInfo" className="col-sm-12">
                <strong>Project informatie</strong>
            </label>
        </div>
        <div className="row">
            <ViewTextLong label={'Informatie link'} value={linkProjectInfo} />
        </div>
        <hr />
        <div className="row">
            <label htmlFor="transactionCosts" className="col-sm-12">
                <strong>Transactiekosten</strong>
            </label>
        </div>
        <div className="row">
            <ViewText
                label={'Kosten'}
                value={
                    transactionCostsCodeRefWithName
                        ? projectType.codeRef === 'obligation'
                            ? transactionCostsCodeRefWithName.name.replace('participatie', 'obligatie')
                            : transactionCostsCodeRefWithName.name
                        : ''
                }
            />
            <ViewText label={'Naam op de portal'} value={textTransactionCosts} />
        </div>
        {transactionCostsCodeRef === 'amount' || transactionCostsCodeRef === 'percentage' ? (
            <div className="row">
                <ViewText label={'Minimaal bedrag'} value={transactionCostsAmountMin} />
                <ViewText label={'Maximaal bedrag'} value={transactionCostsAmountMax} />
            </div>
        ) : null}
        {transactionCostsCodeRef === 'amount-once' ? (
            <div className="row">
                <ViewText label={'Vast bedrag'} value={transactionCostsAmount} />
            </div>
        ) : null}
        {transactionCostsCodeRef === 'amount' ? (
            <div className="row">
                <ViewText
                    label={projectType.codeRef === 'obligation' ? 'Bedrag per obligatie' : 'Bedrag per participatie'}
                    value={transactionCostsAmount}
                />
            </div>
        ) : null}
        {transactionCostsCodeRef === 'percentage' ? (
            <>
                <div className="row">
                    <ViewText label={'Vanaf bedrag'} value={transactionCostsAmount} />
                    <ViewText label={'% van de inleg'} value={transactionCostsPercentage} />
                </div>
                {transactionCostsAmount2 !== null ? (
                    <div className="row">
                        <ViewText label={'Vanaf bedrag'} value={transactionCostsAmount2} />
                        <ViewText label={'% van de inleg'} value={transactionCostsPercentage2} />
                    </div>
                ) : null}
                {transactionCostsAmount3 !== null ? (
                    <div className="row">
                        <ViewText label={'Vanaf bedrag'} value={transactionCostsAmount3} />
                        <ViewText label={'% van de inleg'} value={transactionCostsPercentage3} />
                    </div>
                ) : null}
            </>
        ) : null}
        <hr />
        <div className="row">
            <label htmlFor="registerProject" className="col-sm-12">
                <strong>Inschrijven</strong>
            </label>
        </div>
        <div className="row">
            <ViewText label={'Vragen over lid worden aan of uit?'} value={showQuestionAboutMembership ? 'Ja' : 'Nee'} />
        </div>
        {showQuestionAboutMembership == true && (
            <>
                <div className={'row'}>
                    <ViewTextLong
                        label={'Leden groep'}
                        value={questionAboutMembershipGroup ? questionAboutMembershipGroup.name : ''}
                    />
                </div>
                <hr />
                <div className={'row'}>
                    <ViewTextLong label={'Regel tekst bij leden'} value={textIsMember} />
                </div>
                <hr />
                <div className={'row'}>
                    <ViewTextLong label={'Regel tekst bij niet leden'} value={textIsNoMember} />
                </div>
                <div className={'row'}>
                    <ViewTextLong label={'Keuzetekst (1) bij niet leden'} value={textBecomeMember} />
                </div>
                <div className={'row'}>
                    <ViewTextLong
                        label={'Contacten die keuze 1 maken toevoegen aan'}
                        value={memberGroup ? memberGroup.name : ''}
                    />
                </div>
                <div className={'row'}>
                    <ViewTextLong label={'Keuzetekst (2) bij niet leden'} value={textBecomeNoMember} />
                </div>
                <div className={'row'}>
                    <ViewTextLong
                        label={'Contacten die keuze 2 maken toevoegen aan'}
                        value={noMemberGroup ? noMemberGroup.name : ''}
                    />
                </div>
            </>
        )}
        <hr />
        <div className="row">
            <label htmlFor="agreeTerms" className="col-sm-12">
                <strong>Voorwaarden</strong>
            </label>
        </div>
        <div className="row">
            <div className="col-sm-3">
                <label htmlFor="textAgreeTerms" className="col-sm-12">
                    Voorwaarden tekst
                </label>
            </div>
            <div className="col-sm-9" id="textAgreeTerms">
                {textAgreeTerms}
            </div>
        </div>
        <hr />
        <div className="row">
            <ViewTextLong label={'Voorwaarden link'} value={linkAgreeTerms} />
        </div>
        <div className="row">
            <ViewTextLong label={'Voorwaarden link tekst'} value={textLinkAgreeTerms} />
        </div>
        <hr />
        <div className="row">
            <ViewTextLong label={'Project informatie link'} value={linkUnderstandInfo} />
        </div>
        <div className="row">
            <ViewTextLong label={'Project informatie link tekst'} value={textLinkUnderstandInfo} />
        </div>
        <hr />
        <div className="row">
            <label htmlFor="confirmAgreement" className="col-sm-12">
                <strong>Bevestigen</strong>
            </label>
        </div>
        <div className="row">
            <div className="col-sm-3">
                <label htmlFor="textAcceptAgreement" className="col-sm-12">
                    Bevestigen tekst
                </label>
            </div>
            <div className="col-sm-9" id="textAcceptAgreement">
                {textAcceptAgreement}
            </div>
        </div>
        <div className="row">
            <ViewTextLong label={'Bevestigen knop tekst'} value={textAcceptAgreementQuestion} />
        </div>
        <div className="row">
            <ViewTextLong
                label={'Document template inschrijfformulier'}
                value={documentTemplateAgreement ? documentTemplateAgreement.name : ''}
            />
        </div>
        <div className="row">
            <ViewTextLong
                label={'Email template inschrijfbevestiging'}
                value={emailTemplateAgreement ? emailTemplateAgreement.name : ''}
            />
        </div>
        <div className="row">
            <ViewTextLong label={'Inschrijving afgerond tekst'} value={textRegistrationFinished} />
        </div>
    </React.Fragment>
);

const mapStateToProps = state => {
    return {
        administrations: state.meDetails.administrations,
    };
};

export default connect(mapStateToProps)(ProjectFormViewGeneral);
