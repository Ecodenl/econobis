import React from 'react';
import ViewText from '../../../../../components/form/ViewText';
import moment from 'moment';
import ViewTextLong from '../../../../../components/form/ViewTextLong';
import Icon from 'react-icons-kit';
import { angleRight } from 'react-icons-kit/fa/angleRight';
import { angleDown } from 'react-icons-kit/fa/angleDown';
import FreeFields from '../../../../../components/freeFields/FreeFields';
import InputToggle from '../../../../../components/form/InputToggle';
import InputReactSelectLong from '../../../../../components/form/InputReactSelectLong';

const ProjectFormViewGeneral = ({
    switchToEdit,
    showCustomerPortalSettings,
    toggleCustomerPortalSettings,
    name,
    code,
    description,
    projectStatus,
    projectType,
    isSceProject,
    baseProjectCodeRefWithName,
    checkDoubleAddresses,
    powerKwAvailable,
    requiredParticipants,
    postalcodeLink,
    addressNumberSeries,
    numberOfParticipantsStillNeeded,
    checkPostalcodeLink,
    hideWhenNotMatchingPostalCheck,
    disableChangeContactNameOnPortal,
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
    dateProduction,
    dateInterestBearingKwh,
    dateInterestBearing,
    dateInterestBearingRedemption,
    kwhStartHighNextRevenue,
    kwhStartLowNextRevenue,
    isMembershipRequired,
    visibleForAllContacts,
    textInfoProjectOnlyMembers,
    requiresContactGroups,
    documentTemplateAgreement,
    emailTemplateAgreement,
    allowIncreaseParticipationsInPortal,
    documentTemplateIncreaseParticipations,
    emailTemplateIncreaseParticipations,
    linkAgreeTerms,
    linkUnderstandInfo,
    linkProjectInfo,
    documentAgreeTerms,
    documentUnderstandInfo,
    documentProjectInfo,
    showQuestionAboutMembership,
    useTransactionCostsWithMembership,
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
}) => {
    let addressNumberSeriesFieldEnabled = postalcodeLink
        ? postalcodeLink.replace(/\D/g, '').length === 4 && postalcodeLink.replace(/[0-9]/g, '').trim().length === 2
        : false;

    return (
        <React.Fragment>
            <section
                onClick={
                    projectStatus.codeRef === 'concept' || projectStatus.codeRef === 'active' ? switchToEdit : null
                }
            >
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
                    <ViewText label={'Controle voor SCE subsidie'} value={isSceProject ? 'Ja' : 'Nee'} />
                    {isSceProject ? (
                        <ViewText
                            label={'Basis project'}
                            value={baseProjectCodeRefWithName ? baseProjectCodeRefWithName.name : ''}
                        />
                    ) : null}
                </div>
                <div className="row">
                    <ViewText label={'Opgesteld vermogen kWp'} value={powerKwAvailable} />
                    {isSceProject ? (
                        <ViewText
                            className={'form-group col-sm-6'}
                            label={'Benodigd aantal deelnemende leden'}
                            value={requiredParticipants}
                        />
                    ) : null}
                </div>
                {isSceProject ? (
                    <>
                        <div className="row">
                            <div className="col-sm-6" />
                            <ViewText
                                className={'form-group col-sm-6'}
                                label={'Aantal deelnemende leden nog nodig'}
                                value={numberOfParticipantsStillNeeded}
                            />
                        </div>
                        <div className="row">
                            <ViewText
                                label={'Controle postcoderoosgebied'}
                                value={checkPostalcodeLink ? 'Ja' : 'Nee'}
                            />
                            <ViewText
                                label={'Verberg project in contacten portal wanneer controle niet overeenkomt'}
                                value={hideWhenNotMatchingPostalCheck ? 'Ja' : 'Nee'}
                            />
                        </div>
                        <div className="row">
                            <ViewText
                                label={'Postcoderoosgebied'}
                                value={postalcodeLink}
                                name={'postalcodeLink'}
                                textToolTip={`Voor postcoderoosgebied geef de postcodes op gescheiden door een comma(,). Gebruik geen spaties. Voorbeeld: 1001,1002,1003AA,1003AB`}
                            />
                            {addressNumberSeriesFieldEnabled ? (
                                <ViewText
                                    label={'Huisnummergebied'}
                                    value={addressNumberSeries}
                                    size={'col-sm-5'}
                                    name={'addressNumberSeries'}
                                    textToolTip={`Voor huisnummergebied geef de huisnummers op gescheiden door een comma(,). Gebruik geen spaties. Gebruik een koppelteken (-) voor huisnummer toevoegingen.
                                      Voor huisnummer reeksen gebruik dubbelpunt (:). Voorbeeld: 1,2,4-10,11-a,11-b`}
                                />
                            ) : (
                                <div className="form-group col-sm-6" />
                            )}
                        </div>
                        <div className="row">
                            <ViewText
                                label={'Controle op dubbele adressen'}
                                value={checkDoubleAddresses ? 'Ja' : 'Nee'}
                            />
                        </div>
                    </>
                ) : null}
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
                {isMembershipRequired ? (
                    <>
                        <div className="row">
                            <div className="col-sm-6" />
                            <ViewText
                                label={'Zichtbaar voor alle contacten'}
                                value={visibleForAllContacts ? 'Ja' : 'Nee'}
                            />
                        </div>
                        {visibleForAllContacts ? (
                            <div className="row">
                                <div className="col-sm-6" />
                                <ViewText label={'Groepsinfo tekst'} value={textInfoProjectOnlyMembers} />
                            </div>
                        ) : null}
                    </>
                ) : null}
                <div className="row">
                    <ViewText
                        label={'Start productie'}
                        value={dateProduction ? moment(dateProduction).format('L') : ''}
                    />
                    <ViewText
                        label={'Standaard ingangsdatum mutatie'}
                        value={dateEntry ? moment(dateEntry).format('L') : ''}
                    />
                </div>
                <div className="row">
                    <ViewText
                        label={'Begindatum volgende periode opbrengst euro'}
                        value={dateInterestBearing ? moment(dateInterestBearing).format('L') : ''}
                    />
                </div>
                {projectType.codeRef === 'loan' || projectType.codeRef === 'obligation' ? (
                    <div className="row">
                        <ViewText
                            label={'Begindatum volgende periode aflossing euro'}
                            value={
                                dateInterestBearingRedemption ? moment(dateInterestBearingRedemption).format('L') : ''
                            }
                        />
                    </div>
                ) : null}
                {projectType.codeRef === 'postalcode_link_capital' ? (
                    <>
                        <div className="row">
                            <ViewText
                                label={'Begindatum volgende periode opbrengst kWh'}
                                value={dateInterestBearingKwh ? moment(dateInterestBearingKwh).format('L') : ''}
                            />
                        </div>
                        <div className="row">
                            <ViewText
                                label={'Beginstand hoog volgende kwh opbrengstverdeling'}
                                value={kwhStartHighNextRevenue ? kwhStartHighNextRevenue : ''}
                            />
                        </div>
                        <div className="row">
                            <ViewText
                                label={'Beginstand laag volgende kwh opbrengstverdeling'}
                                value={kwhStartLowNextRevenue ? kwhStartLowNextRevenue : ''}
                            />
                        </div>
                    </>
                ) : null}
            </section>
            <section>
                <hr />
                <h4 onClick={() => toggleCustomerPortalSettings(!showCustomerPortalSettings)}>
                    {showCustomerPortalSettings ? (
                        <Icon size={21} icon={angleDown} />
                    ) : (
                        <Icon size={21} icon={angleRight} />
                    )}
                    &nbsp;Contacten portal instellingen
                </h4>
            </section>
            {showCustomerPortalSettings ? (
                <section
                    onClick={
                        projectStatus.codeRef === 'concept' || projectStatus.codeRef === 'active' ? switchToEdit : null
                    }
                >
                    <div className="row">
                        <label htmlFor="contactInfo" className="col-sm-12">
                            <strong>Contact informatie</strong>
                        </label>
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Blokkeer wijzigen naam via contactenportal.'}
                            value={disableChangeContactNameOnPortal ? 'Ja' : 'Nee'}
                            textToolTip={`Als deze instelling actief is kunnen contacten die deelnemen in dit project hun naam niet wijzigen via de contactenportal. In verband met customer due diligence (voorkomen fraude en witwassen) zijn extra controles wenselijk bij naamswijziging of overdracht. Daarom kun je met deze instelling naamswijziging door contacten in het portal blokkeren.`}
                        />
                    </div>
                    <hr />
                    <div className="row">
                        <label htmlFor="projectInfo" className="col-sm-12">
                            <strong>Project informatie</strong>
                        </label>
                    </div>
                    <div className="row">
                        {documentProjectInfo != null ? (
                            <ViewTextLong label={'Informatie document'} value={documentProjectInfo.description} />
                        ) : (
                            <ViewTextLong label={'Informatie link'} value={linkProjectInfo} />
                        )}
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
                            <ViewText label={'Minimaal kosten'} value={transactionCostsAmountMin} />
                            <ViewText label={'Maximaal kosten'} value={transactionCostsAmountMax} />
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
                                label={
                                    projectType.codeRef === 'obligation'
                                        ? 'Bedrag per obligatie'
                                        : 'Bedrag per participatie'
                                }
                                value={transactionCostsAmount}
                            />
                        </div>
                    ) : null}
                    {transactionCostsCodeRef === 'percentage' ? (
                        <>
                            <div className="row">
                                <ViewText label={'Vanaf inleg'} value={transactionCostsAmount} />
                                <ViewText label={'% van de inleg'} value={transactionCostsPercentage} />
                            </div>
                            {transactionCostsAmount2 !== null ? (
                                <div className="row">
                                    <ViewText label={'Vanaf inleg'} value={transactionCostsAmount2} />
                                    <ViewText label={'% van de inleg'} value={transactionCostsPercentage2} />
                                </div>
                            ) : null}
                            {transactionCostsAmount3 !== null ? (
                                <div className="row">
                                    <ViewText label={'Vanaf inleg'} value={transactionCostsAmount3} />
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
                        <ViewText
                            label={'Vragen over lid worden aan of uit?'}
                            value={showQuestionAboutMembership ? 'Ja' : 'Nee'}
                        />
                        {showQuestionAboutMembership ? (
                            <ViewText
                                label={'Transactie kosten ook bij lidmaatschap (Keuze 1)?'}
                                value={useTransactionCostsWithMembership ? 'Ja' : 'Nee'}
                            />
                        ) : null}
                    </div>
                    {showQuestionAboutMembership ? (
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
                    ) : null}
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
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: textAgreeTerms.replace(/\n/g, '<br />'),
                                }}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        {documentAgreeTerms != null ? (
                            <ViewTextLong label={'Voorwaarden document'} value={documentAgreeTerms.description} />
                        ) : (
                            <ViewTextLong label={'Voorwaarden link'} value={linkAgreeTerms} />
                        )}
                    </div>
                    <div className="row">
                        <ViewTextLong label={'Voorwaarden tekst'} value={textLinkAgreeTerms} />
                    </div>
                    <hr />
                    <div className="row">
                        {documentUnderstandInfo != null ? (
                            <ViewTextLong
                                label={'Project informatie  document'}
                                value={documentUnderstandInfo.description}
                            />
                        ) : (
                            <ViewTextLong label={'Project informatie link'} value={linkUnderstandInfo} />
                        )}
                    </div>
                    <div className="row">
                        <ViewTextLong label={'Project informatie tekst'} value={textLinkUnderstandInfo} />
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
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: textAcceptAgreement.replace(/\n/g, '<br />'),
                                }}
                            />
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
                        <ViewText
                            label={'Contacten mogen deelnames/bedragen bijschrijven na initiele inschrijving'}
                            value={allowIncreaseParticipationsInPortal ? 'Ja' : 'Nee'}
                        />{' '}
                    </div>
                    {allowIncreaseParticipationsInPortal ? (
                        <>
                            <div className="row">
                                <ViewTextLong
                                    label="Document template bijschrijfformulier"
                                    value={
                                        documentTemplateIncreaseParticipations
                                            ? documentTemplateIncreaseParticipations.name
                                            : ''
                                    }
                                />
                            </div>
                            <div className="row">
                                <ViewTextLong
                                    label="E-mail template bijschrijfformulier"
                                    value={
                                        emailTemplateIncreaseParticipations
                                            ? emailTemplateIncreaseParticipations.name
                                            : ''
                                    }
                                />
                            </div>
                        </>
                    ) : null}

                    <hr />
                    <div className="row">
                        <label htmlFor="confirmAgreementAndPayment" className="col-sm-12">
                            <strong>Bevestigen en betalen</strong>
                        </label>
                    </div>
                    <div className="row">
                        <ViewText label={'Direct elektronisch betalen via Mollie'} value={usesMollie ? 'Ja' : 'Nee'} />
                    </div>
                    <hr />
                    <div className="row">
                        <label htmlFor="registrationConfirmed" className="col-sm-12">
                            <strong>Bevestiging inschrijving</strong>
                        </label>
                    </div>
                    <div className="row">
                        <ViewTextLong label={'Inschrijving afgerond tekst'} value={textRegistrationFinished} />
                    </div>
                </section>
            ) : null}
        </React.Fragment>
    );
};

export default ProjectFormViewGeneral;
