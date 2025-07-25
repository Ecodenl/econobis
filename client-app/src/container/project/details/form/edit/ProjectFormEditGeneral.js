import React from 'react';
import { connect } from 'react-redux';
import InputText from '../../../../../components/form/InputText';
import InputSelect from '../../../../../components/form/InputSelect';
import InputDate from '../../../../../components/form/InputDate';
import InputToggle from '../../../../../components/form/InputToggle';
import InputMultiSelect from '../../../../../components/form/InputMultiSelect';
import ViewText from '../../../../../components/form/ViewText';
import InputTextLong from '../../../../../components/form/InputTextLong';
import InputReactSelectLong from '../../../../../components/form/InputReactSelectLong';
import Icon from 'react-icons-kit';
import { angleRight } from 'react-icons-kit/fa/angleRight';
import { angleDown } from 'react-icons-kit/fa/angleDown';
import validator from 'validator';
import InputTextArea from '../../../../../components/form/InputTextArea';

const ProjectFormEditGeneral = ({
    showCustomerPortalSettings,
    toggleCustomerPortalSettings,
    permissions,
    name,
    code,
    description,
    projectStatusId,
    projectType,
    useSceProject,
    isSceProject,
    baseProjectCodeRef,
    baseProjectCodeRefs,
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
    ownedById,
    administrationId,
    administration,
    usesMollie,
    dateStart,
    dateEnd,
    dateEntry,
    disableBeforeEntryDate,
    contactGroupIdsSelected,
    dateProduction,
    dateInterestBearingKwh,
    allowChangeDateInterestBearingKwh,
    dateInterestBearing,
    allowChangeDateInterestBearing,
    dateInterestBearingRedemption,
    allowChangeDateInterestBearingRedemption,
    kwhStartHighNextRevenue,
    allowChangeKwhStartHighNextRevenue,
    kwhStartLowNextRevenue,
    allowChangeKwhStartLowNextRevenue,
    isMembershipRequired,
    visibleForAllContacts,
    textInfoProjectOnlyMembers,
    handleInputChange,
    handleInputChangeAdministration,
    handleInputChangeDate,
    handleContactGroupIds,
    handleReactSelectChange,
    projectStatuses,
    transactionCostsCodeRefs,
    administrations,
    hasPaymentInvoices,
    hasFinancialOverviewDefinitive,
    users,
    contactGroups,
    staticContactGroups,
    errors,
    errorMessages,
    amountOfParticipants,
    documentTemplates,
    emailTemplates,
    documentTemplateAgreementId,
    emailTemplateAgreementId,
    allowIncreaseParticipationsInPortal,
    documentTemplateIncreaseParticipationsId,
    emailTemplateIncreaseParticipationsId,
    linkAgreeTerms,
    linkUnderstandInfo,
    linkProjectInfo,
    documentIdAgreeTerms,
    agreeTermsLinkOrDocument,
    handleChangeAgreeTermsLinkOrDocument,
    documentIdUnderstandInfo,
    understandInfoLinkOrDocument,
    handleChangeUnderstandInfoLinkOrDocument,
    documentIdProjectInfo,
    projectInfoLinkOrDocument,
    handleChangeProjectInfoLinkOrDocument,
    relatedDocumentsOnPortal,
    showQuestionAboutMembership,
    useTransactionCostsWithMembership,
    questionAboutMembershipGroupId,
    textRegisterPageHeader,
    textRegisterCurrentBookWorth,
    textRegisterParticipationSingular,
    textRegisterParticipationPlural,
    textIsMember,
    textIsNoMember,
    textBecomeMember,
    memberGroupId,
    textBecomeNoMember,
    noMemberGroupId,
    textAgreeTerms,
    textLinkAgreeTerms,
    textLinkNameAgreeTerms,
    textLinkUnderstandInfo,
    textLinkNameUnderstandInfo,
    textAcceptAgreement,
    textAcceptAgreementQuestion,
    textRegistrationFinished,
    textTransactionCosts,
    transactionCostsCodeRef,
    transactionCostsAmountMin,
    transactionCostsAmountMax,
    transactionCostsAmount,
    transactionCostsPercentage,
    transactionCostsAmount2,
    transactionCostsPercentage2,
    transactionCostsAmount3,
    transactionCostsPercentage3,
}) => {
    let projectStatusCustomOptions = projectStatuses;

    if (amountOfParticipants) {
        projectStatusCustomOptions = projectStatuses.filter(projectStatus => projectStatus.codeRef !== 'concept');
    }

    let transactionCostsCodeRefsOptions = transactionCostsCodeRefs;
    if (projectType.codeRef === 'loan') {
        transactionCostsCodeRefsOptions = transactionCostsCodeRefs.filter(
            transactionCostsCodeRef => transactionCostsCodeRef.id !== 'amount'
        );
    }
    if (projectType.codeRef === 'obligation') {
        transactionCostsCodeRefsOptions = transactionCostsCodeRefs.map(transactionCostsCodeRef => {
            if (transactionCostsCodeRef.id === 'amount') {
                transactionCostsCodeRef.name = transactionCostsCodeRef.name.replace('participatie', 'obligatie');
            }
            return transactionCostsCodeRef;
        });
    }

    const helpTextLinkAgreeTerms =
        'Gebruik {voorwaarden_link} in tekst voor plaatsing van de voorwaarden link. Download link voor voorwaarden document komt altijd na deze tekst.';
    const helpTextLinkUnderstandInfo =
        'Gebruik {project_informatie_link} in tekst voor plaatsing van de project informatie link. Download link voor project informatie document komt altijd na deze tekst.';

    let addressNumberSeriesFieldEnabled = postalcodeLink
        ? postalcodeLink.replace(/\D/g, '').length === 4 && postalcodeLink.replace(/[0-9]/g, '').trim().length === 2
        : false;

    // todo WM: zelfde controle postalcodeLink / addressNumberSeries zit nu ook in ProjectFormEdit
    errors.postalcodeLink = false;
    errorMessages.postalcodeLink = '';
    if (
        (checkPostalcodeLink || projectType.codeRef === 'postalcode_link_capital') &&
        (!postalcodeLink || validator.isEmpty('' + postalcodeLink))
    ) {
        errors.postalcodeLink = true;
        errorMessages.postalcodeLink = 'Verplicht als controle postcoderoosgebied aan staat.';
    } else if (postalcodeLink) {
        let regExpPostalcodeLink = new RegExp('^[0-9a-zA-Z,]*$');
        if (!regExpPostalcodeLink.exec(postalcodeLink)) {
            errors.postalcodeLink = true;
            errorMessages.postalcodeLink = 'Ongeldige invoer, klik (i) voor uitleg.';
        }
    }

    errors.addressNumberSeries = false;
    errorMessages.addressNumberSeries = '';
    if (addressNumberSeries) {
        let regExpAddressNumberSeries = new RegExp('^[0-9a-zA-Z,:-]*$');
        if (!regExpAddressNumberSeries.exec(addressNumberSeries)) {
            errors.addressNumberSeries = true;
            errorMessages.addressNumberSeries = 'Ongeldige invoer, klik (i) voor uitleg.';
        }
    }

    return (
        <React.Fragment>
            <h4>Algemeen</h4>
            <div className="row">
                <InputText
                    label={'Project'}
                    name={'name'}
                    value={name}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.name}
                    errorMessage={errorMessages.name}
                />
                <InputText
                    label={'Projectcode'}
                    name={'code'}
                    value={code}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.code}
                    errorMessage={errorMessages.code}
                />
            </div>

            <div className="row">
                <ViewText
                    label={'Type project'}
                    value={projectType && projectType.name}
                    className={'form-group col-sm-6'}
                />
                <InputSelect
                    label={'Status'}
                    name={'projectStatusId'}
                    options={projectStatusCustomOptions}
                    value={projectStatusId}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.projectStatusId}
                    errorMessage={errorMessages.projectStatusId}
                />
            </div>
            <div className="row">
                <InputToggle
                    label={'Controle voor SCE subsidie'}
                    name={'isSceProject'}
                    value={isSceProject}
                    onChangeAction={handleInputChange}
                    disabled={!useSceProject}
                />
                {isSceProject ? (
                    <InputSelect
                        label={'Basis project'}
                        name={'baseProjectCodeRef'}
                        options={baseProjectCodeRefs}
                        value={baseProjectCodeRef}
                        onChangeAction={handleInputChange}
                        required={isSceProject ? 'required' : ''}
                        error={errors.baseProjectCodeRef}
                        errorMessage={errorMessages.baseProjectCodeRef}
                    />
                ) : null}
            </div>

            <div className="row">
                <InputText
                    type={'number'}
                    label={'Opgesteld vermogen kWp'}
                    name={'powerKwAvailable'}
                    value={powerKwAvailable}
                    onChangeAction={handleInputChange}
                />
                {isSceProject ? (
                    <ViewText
                        className={'form-group col-sm-6'}
                        label={'Benodigd aantal deelnemende leden'}
                        value={requiredParticipants}
                        textToolTip={`Dit aantal wordt berekend door het opgesteld vermogen kWp door 5 te delen. Dit om aan de voorwaarden van het RVO te voldoen. Zie https://www.rvo.nl/subsidies-financiering/sce/voorwaarden`}
                    />
                ) : null}
            </div>

            {isSceProject ? (
                <>
                    <div className="row">
                        <div className="form-group col-sm-6" />
                        <ViewText
                            className={'form-group col-sm-6'}
                            label={'Aantal deelnemende leden nog nodig'}
                            value={numberOfParticipantsStillNeeded}
                        />
                    </div>
                    <div className="row">
                        <InputToggle
                            label={'Controle postcoderoosgebied'}
                            name={'checkPostalcodeLink'}
                            value={checkPostalcodeLink}
                            onChangeAction={handleInputChange}
                        />
                        <InputToggle
                            label={'Verberg project in contacten portal wanneer controle niet overeenkomt'}
                            name={'hideWhenNotMatchingPostalCheck'}
                            value={hideWhenNotMatchingPostalCheck}
                            onChangeAction={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <InputText
                            label={'Postcoderoosgebied'}
                            name={'postalcodeLink'}
                            value={postalcodeLink}
                            maxLength="300"
                            onChangeAction={handleInputChange}
                            required={checkPostalcodeLink ? 'required' : ''}
                            size={'col-sm-5'}
                            textToolTip={`Voor postcoderoosgebied geef de postcodes op gescheiden door een comma(,). Gebruik geen spaties. Voorbeeld: 1001,1002,1003AA,1003AB`}
                            error={errors.postalcodeLink}
                            errorMessage={errorMessages.postalcodeLink}
                        />
                        {addressNumberSeriesFieldEnabled ? (
                            <InputText
                                label={'Huisnummergebied'}
                                name={'addressNumberSeries'}
                                value={addressNumberSeries}
                                onChangeAction={handleInputChange}
                                size={'col-sm-5'}
                                textToolTip={`Voor huisnummergebied geef de huisnummers op gescheiden door een comma(,). Gebruik een koppelteken (-) voor huisnummer toevoegingen.
                                      Voor huisnummer reeksen gebruik dubbelpunt (:). Gebruik geen spaties. Voorbeeld: 1,2,4-10,11-a,11-b`}
                                error={errors.addressNumberSeries}
                                errorMessage={errorMessages.addressNumberSeries}
                            />
                        ) : (
                            <div className="form-group col-sm-6" />
                        )}
                    </div>
                    <div className="row">
                        <InputToggle
                            label={'Controle op dubbele adressen'}
                            name={'checkDoubleAddresses'}
                            value={checkDoubleAddresses}
                            onChangeAction={handleInputChange}
                        />
                    </div>
                </>
            ) : null}

            <div className="row">
                {/*<div className="form-group col-sm-12">*/}
                {/*    <div className="row">*/}
                {/*        <div className="col-sm-3">*/}
                {/*            <label htmlFor="description" className="col-sm-12">*/}
                {/*                Omschrijving*/}
                {/*            </label>*/}
                {/*        </div>*/}
                {/*        <div className="col-sm-8">*/}
                {/*            <textarea*/}
                {/*                name="description"*/}
                {/*                value={description}*/}
                {/*                onChange={handleInputChange}*/}
                {/*                className="form-control input-sm"*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <InputTextArea
                    label="Omschrijving"
                    name={'description'}
                    sizeInput={'col-sm-8'}
                    rows={2}
                    value={description}
                    onChangeAction={handleInputChange}
                    // required={'required'}
                    // error={errors.description}
                    // errorMessage={errorMessages.description}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Postcode'}
                    name={'postalCode'}
                    value={postalCode}
                    onChangeAction={handleInputChange}
                    error={errors.postalCode}
                    errorMessage={errorMessages.postalCode}
                />
                <InputText label={'Adres'} name={'address'} value={address} onChangeAction={handleInputChange} />
            </div>

            <div className="row">
                <InputText label={'Plaats'} name={'city'} value={city} onChangeAction={handleInputChange} />
            </div>

            <div className="row">
                <InputDate
                    label={'Start inschrijving'}
                    name={'dateStartRegistrations'}
                    value={dateStartRegistrations}
                    onChangeAction={handleInputChangeDate}
                />
                <InputSelect
                    label={'Verantwoordelijke'}
                    name={'ownedById'}
                    options={users}
                    optionName={'fullName'}
                    value={ownedById}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.ownedById}
                    errorMessage={errorMessages.ownedById}
                />
            </div>

            <div className="row">
                <InputDate
                    label={'Eind inschrijving'}
                    name={'dateEndRegistrations'}
                    value={dateEndRegistrations}
                    onChangeAction={handleInputChangeDate}
                />

                {/*Als er al nota's of waardestaten zijn gemaakt mag de administratie niet meer gewijzigd worden*/}
                {hasPaymentInvoices || hasFinancialOverviewDefinitive ? (
                    <InputText
                        label={'Administratie'}
                        name={'administration'}
                        value={administration ? administration.name : ''}
                        readOnly={true}
                    />
                ) : (
                    <InputSelect
                        label={'Administratie'}
                        name={'administrationId'}
                        options={administrations}
                        value={administrationId}
                        onChangeAction={handleInputChangeAdministration}
                        required={'required'}
                        error={errors.administrationId}
                        errorMessage={errorMessages.administrationId}
                    />
                )}
            </div>

            <div className="row">
                <InputDate
                    label={'Start project'}
                    name={'dateStart'}
                    value={dateStart}
                    onChangeAction={handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputDate
                    label={'Einde project'}
                    name={'dateEnd'}
                    value={dateEnd}
                    onChangeAction={handleInputChangeDate}
                />
                <InputToggle
                    label={'Deelname aan groep verplicht'}
                    name={'isMembershipRequired'}
                    value={isMembershipRequired}
                    onChangeAction={handleInputChange}
                />
            </div>
            {isMembershipRequired ? (
                <div className={'row'}>
                    <InputMultiSelect
                        label={'Onderdeel van groep'}
                        name={'contactGroupsIds'}
                        size={'col-sm-8'}
                        options={contactGroups}
                        value={contactGroupIdsSelected}
                        onChangeAction={handleContactGroupIds}
                        error={errors.contactGroupIds}
                        errorMessage={errorMessages.contactGroupIds}
                        required={'required'}
                    />
                </div>
            ) : null}
            {isMembershipRequired ? (
                <>
                    <div className="row">
                        <div className="form-group col-sm-6" />
                        <InputToggle
                            label={'Zichtbaar voor alle contacten'}
                            name={'visibleForAllContacts'}
                            value={visibleForAllContacts}
                            onChangeAction={handleInputChange}
                        />
                    </div>
                    {visibleForAllContacts ? (
                        <div className="row">
                            <div className="form-group col-sm-6" />
                            <InputText
                                label={'Groepsinfo tekst'}
                                name={'textInfoProjectOnlyMembers'}
                                value={textInfoProjectOnlyMembers}
                                onChangeAction={handleInputChange}
                            />
                        </div>
                    ) : null}
                </>
            ) : null}

            <div className="row">
                <InputDate
                    label={'Start productie'}
                    name={'dateProduction'}
                    value={dateProduction}
                    onChangeAction={handleInputChangeDate}
                />
                <InputDate
                    label={'Standaard ingangsdatum mutatie'}
                    name={'dateEntry'}
                    value={dateEntry}
                    onChangeAction={handleInputChangeDate}
                    disabledBefore={disableBeforeEntryDate}
                    error={errors.dateEntry}
                    errorMessage={errorMessages.dateEntry}
                />
            </div>

            <div className="row">
                <InputDate
                    label={'Begindatum volgende periode opbrengst euro'}
                    name={'dateInterestBearing'}
                    value={dateInterestBearing}
                    onChangeAction={handleInputChangeDate}
                    disabledBefore={dateProduction}
                    readOnly={!allowChangeDateInterestBearing}
                />
            </div>

            {projectType.codeRef === 'loan' || projectType.codeRef === 'obligation' ? (
                <div className="row">
                    <InputDate
                        label={'Begindatum volgende periode aflossing euro'}
                        name={'dateInterestBearingRedemption'}
                        value={dateInterestBearingRedemption}
                        onChangeAction={handleInputChangeDate}
                        disabledBefore={dateProduction}
                        readOnly={!allowChangeDateInterestBearingRedemption}
                    />
                </div>
            ) : null}
            {projectType.codeRef === 'postalcode_link_capital' ? (
                <>
                    <div className="row">
                        <InputDate
                            label={'Begindatum volgende periode opbrengst kWh'}
                            name={'dateInterestBearingKwh'}
                            value={dateInterestBearingKwh}
                            onChangeAction={handleInputChangeDate}
                            disabledBefore={dateProduction}
                            readOnly={!allowChangeDateInterestBearingKwh}
                        />
                    </div>
                    <div className="row">
                        <InputText
                            label={'Beginstand hoog volgende kwh opbrengstverdeling'}
                            name={'kwhStartHighNextRevenue'}
                            value={kwhStartHighNextRevenue}
                            onChangeAction={handleInputChange}
                            readOnly={!allowChangeKwhStartHighNextRevenue}
                        />
                    </div>
                    <div className="row">
                        <InputText
                            label={'Beginstand laag volgende kwh opbrengstverdeling'}
                            name={'kwhStartLowNextRevenue'}
                            value={kwhStartLowNextRevenue}
                            onChangeAction={handleInputChange}
                            readOnly={!allowChangeKwhStartLowNextRevenue}
                        />
                    </div>
                </>
            ) : null}

            <hr />
            <h4 onClick={() => toggleCustomerPortalSettings(!showCustomerPortalSettings)}>
                {showCustomerPortalSettings ? (
                    <Icon size={21} icon={angleDown} />
                ) : (
                    <Icon size={21} icon={angleRight} />
                )}
                &nbsp;Contacten portal instellingen
            </h4>
            {showCustomerPortalSettings ? (
                <>
                    <div className="row">
                        <label htmlFor="contactInfo" className="col-sm-12">
                            <strong>Contact informatie</strong>
                        </label>
                    </div>
                    <div className="row">
                        <InputToggle
                            label={
                                'Blokkeer wijzigen naam via contacten portal. Voor contacten die ook in een project. waarbij "naam wijzigen" wel is toegestaan, deelnemen geldt dit dan ook.'
                            }
                            name={'disableChangeContactNameOnPortal'}
                            value={disableChangeContactNameOnPortal}
                            onChangeAction={handleInputChange}
                            size={'col-sm-5'}
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
                        <div className="form-group col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label htmlFor="projectInfoLinkOrDocument" className="col-sm-12">
                                        Informatie link of document
                                    </label>
                                </div>
                                <div className="col-sm-3">
                                    <div className={'row'}>
                                        <div className={'col-xs-6'}>
                                            <input
                                                onChange={() => handleChangeProjectInfoLinkOrDocument('link')}
                                                type="radio"
                                                name="projectInfoLinkOrDocument"
                                                value="link"
                                                id="link"
                                                defaultChecked={documentIdProjectInfo === null}
                                                disabled={!permissions.managePortalSettings}
                                            />
                                            <label htmlFor="link">&nbsp;Link</label>
                                        </div>
                                        <div className={'col-xs-6'}>
                                            <input
                                                onChange={() => handleChangeProjectInfoLinkOrDocument('document')}
                                                type="radio"
                                                name="projectInfoLinkOrDocument"
                                                value="document"
                                                id="document"
                                                defaultChecked={documentIdProjectInfo !== null}
                                                disabled={!permissions.managePortalSettings}
                                            />
                                            <label htmlFor="document">&nbsp;Document</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <InputTextLong
                            label="Informatie link"
                            name={'linkProjectInfo'}
                            value={linkProjectInfo}
                            onChangeAction={handleInputChange}
                            error={errors.linkProjectInfo}
                            errorMessage={errorMessages.linkProjectInfo}
                            readOnly={!permissions.managePortalSettings || projectInfoLinkOrDocument !== 'link'}
                        />
                    </div>
                    <div className="row">
                        <InputReactSelectLong
                            label="Informatie document"
                            description
                            name={'documentIdProjectInfo'}
                            options={relatedDocumentsOnPortal}
                            optionId={'id'}
                            optionName={'description'}
                            value={documentIdProjectInfo}
                            onChangeAction={handleReactSelectChange}
                            error={errors.documentIdProjectInfo}
                            errorMessage={errorMessages.documentIdProjectInfo}
                            disabled={!permissions.managePortalSettings || projectInfoLinkOrDocument !== 'document'}
                        />
                    </div>

                    <hr />
                    <div className="row">
                        <label htmlFor="transactionCosts" className="col-sm-12">
                            <strong>Transactiekosten</strong>
                        </label>
                    </div>
                    <div className="row">
                        <InputSelect
                            label={'Kosten'}
                            name={'transactionCostsCodeRef'}
                            options={transactionCostsCodeRefsOptions}
                            value={transactionCostsCodeRef}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.transactionCostsCodeRef}
                            errorMessage={errorMessages.transactionCostsCodeRef}
                            readOnly={!permissions.managePortalSettings}
                        />
                        <InputText
                            label="Naam op de portal"
                            name={'textTransactionCosts'}
                            value={textTransactionCosts}
                            maxLength="50"
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textTransactionCosts}
                            errorMessage={errorMessages.textTransactionCosts}
                            readOnly={!permissions.managePortalSettings}
                        />
                    </div>
                    {transactionCostsCodeRef === 'amount' || transactionCostsCodeRef === 'percentage' ? (
                        <div className="row">
                            <InputText
                                type={'number'}
                                label={'Minimaal kosten'}
                                name={'transactionCostsAmountMin'}
                                value={transactionCostsAmountMin}
                                onChangeAction={handleInputChange}
                                error={errors.transactionCostsAmountMin}
                                errorMessage={errorMessages.transactionCostsAmountMin}
                                readOnly={!permissions.managePortalSettings}
                            />
                            <InputText
                                type={'number'}
                                label={'Maximaal kosten'}
                                name={'transactionCostsAmountMax'}
                                value={transactionCostsAmountMax}
                                onChangeAction={handleInputChange}
                                error={errors.transactionCostsAmountMax}
                                errorMessage={errorMessages.transactionCostsAmountMax}
                                readOnly={!permissions.managePortalSettings}
                            />
                        </div>
                    ) : null}

                    {transactionCostsCodeRef === 'amount-once' ? (
                        <div className="row">
                            <InputText
                                type={'number'}
                                label={'Vast bedrag'}
                                name={'transactionCostsAmount'}
                                value={transactionCostsAmount}
                                onChangeAction={handleInputChange}
                                required={'required'}
                                error={errors.transactionCostsAmount}
                                errorMessage={errorMessages.transactionCostsAmount}
                                readOnly={!permissions.managePortalSettings}
                            />
                        </div>
                    ) : null}
                    {transactionCostsCodeRef === 'amount' ? (
                        <div className="row">
                            <InputText
                                type={'number'}
                                label={
                                    projectType.codeRef === 'obligation'
                                        ? 'Bedrag per obligatie'
                                        : 'Bedrag per participatie'
                                }
                                name={'transactionCostsAmount'}
                                value={transactionCostsAmount}
                                onChangeAction={handleInputChange}
                                required={'required'}
                                error={errors.transactionCostsAmount}
                                errorMessage={errorMessages.transactionCostsAmount}
                                readOnly={!permissions.managePortalSettings}
                            />
                        </div>
                    ) : null}
                    {transactionCostsCodeRef === 'percentage' ? (
                        <>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Vanaf inleg'}
                                    name={'transactionCostsAmount'}
                                    value={transactionCostsAmount}
                                    onChangeAction={handleInputChange}
                                    required={'required'}
                                    error={errors.transactionCostsAmount}
                                    errorMessage={errorMessages.transactionCostsAmount}
                                    readOnly={!permissions.managePortalSettings}
                                />
                                <InputText
                                    type={'number'}
                                    label={'% van de inleg'}
                                    name={'transactionCostsPercentage'}
                                    value={transactionCostsPercentage}
                                    onChangeAction={handleInputChange}
                                    required={'required'}
                                    error={errors.transactionCostsPercentage}
                                    errorMessage={errorMessages.transactionCostsPercentage}
                                    readOnly={!permissions.managePortalSettings}
                                />
                            </div>
                            {transactionCostsPercentage !== null ? (
                                <div className="row">
                                    <InputText
                                        type={'number'}
                                        label={'Vanaf inleg'}
                                        name={'transactionCostsAmount2'}
                                        value={transactionCostsAmount2}
                                        onChangeAction={handleInputChange}
                                        error={errors.transactionCostsAmount2}
                                        errorMessage={errorMessages.transactionCostsAmount2}
                                        readOnly={!permissions.managePortalSettings}
                                    />
                                    {transactionCostsAmount2 !== null ? (
                                        <>
                                            <InputText
                                                type={'number'}
                                                label={'% van de inleg'}
                                                name={'transactionCostsPercentage2'}
                                                value={transactionCostsPercentage2}
                                                onChangeAction={handleInputChange}
                                                error={errors.transactionCostsPercentage2}
                                                errorMessage={errorMessages.transactionCostsPercentage2}
                                                readOnly={!permissions.managePortalSettings}
                                            />
                                        </>
                                    ) : null}
                                </div>
                            ) : null}
                            {transactionCostsPercentage2 !== null ? (
                                <div className="row">
                                    <>
                                        <InputText
                                            type={'number'}
                                            label={'Vanaf inleg'}
                                            name={'transactionCostsAmount3'}
                                            value={transactionCostsAmount3}
                                            onChangeAction={handleInputChange}
                                            error={errors.transactionCostsAmount3}
                                            errorMessage={errorMessages.transactionCostsAmount3}
                                            readOnly={!permissions.managePortalSettings}
                                        />
                                        {transactionCostsAmount3 !== null ? (
                                            <InputText
                                                type={'number'}
                                                label={'% van de inleg'}
                                                name={'transactionCostsPercentage3'}
                                                value={transactionCostsPercentage3}
                                                onChangeAction={handleInputChange}
                                                error={errors.transactionCostsPercentage3}
                                                errorMessage={errorMessages.transactionCostsPercentage3}
                                                readOnly={!permissions.managePortalSettings}
                                            />
                                        ) : null}
                                    </>
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
                    <div className={'row'}>
                        <InputText
                            label="Koptekst inschrijfpagina"
                            name={'textRegisterPageHeader'}
                            value={textRegisterPageHeader}
                            maxLength="191"
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textRegisterPageHeader}
                            errorMessage={errorMessages.textRegisterPageHeader}
                            readOnly={!permissions.managePortalSettings}
                            size={'col-sm-5'}
                            textToolTip={`De tekst die een portal gebruiker ziet zodra hij heeft gekozen om op dit project te gaan inschrijven links boven op de pagina.`}
                        />
                        <InputText
                            label="Communicatienaam Deelname (enkelvoud)"
                            name={'textRegisterParticipationSingular'}
                            value={textRegisterParticipationSingular}
                            maxLength="191"
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textRegisterParticipationSingular}
                            errorMessage={errorMessages.textRegisterParticipationSingular}
                            readOnly={!permissions.managePortalSettings}
                            size={'col-sm-5'}
                            textToolTip={`Dit veld wordt getoond op pagina 1 van het inschrijf formulier waar je kiest voor hoeveel participatie(s) of deelname(s) je inschrijft.`}
                        />
                    </div>
                    <div className={'row'}>
                        <InputText
                            label="Waarde aanduiding"
                            name={'textRegisterCurrentBookWorth'}
                            value={textRegisterCurrentBookWorth}
                            maxLength="191"
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textRegisterCurrentBookWorth}
                            errorMessage={errorMessages.textRegisterCurrentBookWorth}
                            readOnly={!permissions.managePortalSettings}
                            size={'col-sm-5'}
                            textToolTip={`Dit veld wordt getoond op pagina 1 van het inschrijf formulier, standaard is dit veld: “huidige waarde per participatie” als iemand 2 deelnames van 100 euro kiest komt onder dit veld 200 euro te staan. (dit kan afwijken van het te betalen bedrag als er bijvoorbeeld ook inschrijfkosten zijn).`}
                        />
                        <InputText
                            label="Communicatienaam Deelname (meervoud)"
                            name={'textRegisterParticipationPlural'}
                            value={textRegisterParticipationPlural}
                            maxLength="191"
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textRegisterParticipationPlural}
                            errorMessage={errorMessages.textRegisterParticipationPlural}
                            readOnly={!permissions.managePortalSettings}
                            size={'col-sm-5'}
                            textToolTip={`Dit veld wordt getoond op pagina 1 van het inschrijf formulier waar je kiest voor hoeveel participatie(s) of deelname(s) je inschrijft.`}
                        />
                    </div>
                    <div className="row">
                        <InputToggle
                            label={'Vragen over lid worden aan of uit?'}
                            name={'showQuestionAboutMembership'}
                            value={showQuestionAboutMembership}
                            onChangeAction={handleInputChange}
                            disabled={!permissions.managePortalSettings}
                        />
                        {showQuestionAboutMembership ? (
                            <InputToggle
                                label={'Transactie kosten ook bij lidmaatschap (Keuze 1)?'}
                                name={'useTransactionCostsWithMembership'}
                                value={useTransactionCostsWithMembership}
                                onChangeAction={handleInputChange}
                                disabled={!permissions.managePortalSettings}
                            />
                        ) : null}
                    </div>
                    {showQuestionAboutMembership ? (
                        <>
                            <div className={'row'}>
                                <InputReactSelectLong
                                    label="Leden groep"
                                    name={'questionAboutMembershipGroupId'}
                                    options={contactGroups}
                                    value={questionAboutMembershipGroupId}
                                    onChangeAction={handleReactSelectChange}
                                    required={'required'}
                                    error={errors.questionAboutMembershipGroupId}
                                    errorMessage={errorMessages.questionAboutMembershipGroupId}
                                    disabled={!permissions.managePortalSettings}
                                />
                            </div>
                            <hr />
                            <div className={'row'}>
                                <InputTextLong
                                    label="Regel tekst bij leden"
                                    name={'textIsMember'}
                                    value={textIsMember}
                                    maxLength="191"
                                    onChangeAction={handleInputChange}
                                    required={'required'}
                                    error={errors.textIsMember}
                                    errorMessage={errorMessages.textIsMember}
                                    readOnly={!permissions.managePortalSettings}
                                />
                            </div>
                            <hr />
                            <div className={'row'}>
                                <InputTextLong
                                    label="Regel tekst bij niet leden"
                                    name={'textIsNoMember'}
                                    value={textIsNoMember}
                                    maxLength="191"
                                    onChangeAction={handleInputChange}
                                    required={'required'}
                                    error={errors.textIsNoMember}
                                    errorMessage={errorMessages.textIsNoMember}
                                    readOnly={!permissions.managePortalSettings}
                                />
                            </div>
                            <div className={'row'}>
                                <InputTextLong
                                    label="Keuzetekst (1) bij niet leden"
                                    name={'textBecomeMember'}
                                    value={textBecomeMember}
                                    maxLength="191"
                                    onChangeAction={handleInputChange}
                                    required={'required'}
                                    error={errors.textBecomeMember}
                                    errorMessage={errorMessages.textBecomeMember}
                                    readOnly={!permissions.managePortalSettings}
                                />
                            </div>
                            <div className={'row'}>
                                <InputReactSelectLong
                                    label="Contacten die keuze 1 maken toevoegen aan"
                                    name={'memberGroupId'}
                                    options={staticContactGroups}
                                    value={memberGroupId}
                                    onChangeAction={handleReactSelectChange}
                                    required={'required'}
                                    error={errors.memberGroupId}
                                    errorMessage={errorMessages.memberGroupId}
                                    disabled={!permissions.managePortalSettings}
                                />
                            </div>
                            <div className={'row'}>
                                <InputTextLong
                                    label="Keuzetekst (2) bij niet leden"
                                    name={'textBecomeNoMember'}
                                    value={textBecomeNoMember}
                                    maxLength="191"
                                    onChangeAction={handleInputChange}
                                    required={'required'}
                                    error={errors.textBecomeNoMember}
                                    errorMessage={errorMessages.textBecomeNoMember}
                                    readOnly={!permissions.managePortalSettings}
                                />
                            </div>
                            <div className={'row'}>
                                <InputReactSelectLong
                                    label="Contacten die keuze 2 maken toevoegen aan"
                                    name={'noMemberGroupId'}
                                    options={staticContactGroups}
                                    value={noMemberGroupId}
                                    onChangeAction={handleReactSelectChange}
                                    required={'required'}
                                    error={errors.noMemberGroupId}
                                    errorMessage={errorMessages.noMemberGroupId}
                                    disabled={!permissions.managePortalSettings}
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
                    <div className={'row'}>
                        {/*<div className="form-group col-sm-12">*/}
                        {/*    <div className="row">*/}
                        {/*        <div className="col-sm-3">*/}
                        {/*            <label htmlFor="textAgreeTerms" className="col-sm-12">*/}
                        {/*                Voorwaarden tekst*/}
                        {/*            </label>*/}
                        {/*        </div>*/}
                        {/*        <div className="col-sm-8">*/}
                        {/*            <textarea*/}
                        {/*                name="textAgreeTerms"*/}
                        {/*                value={textAgreeTerms}*/}
                        {/*                onChange={handleInputChange}*/}
                        {/*                className="form-control input-sm"*/}
                        {/*                required={'required'}*/}
                        {/*                // error={errors.textAgreeTerms}*/}
                        {/*                // errorMessage={errorMessages.textAgreeTerms}*/}
                        {/*                readOnly={!permissions.managePortalSettings}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <InputTextArea
                            label="Voorwaarden tekst"
                            name={'textAgreeTerms'}
                            sizeInput={'col-sm-8'}
                            rows={2}
                            value={textAgreeTerms}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textAgreeTerms}
                            errorMessage={errorMessages.textAgreeTerms}
                            disabled={!permissions.managePortalSettings}
                        />
                    </div>
                    <hr />

                    <div className="row">
                        <div className="form-group col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label htmlFor="agreeTermsLinkOrDocument" className="col-sm-12">
                                        Voorwaarden link of document
                                    </label>
                                </div>
                                <div className="col-sm-3">
                                    <div className={'row'}>
                                        <div className={'col-xs-6'}>
                                            <input
                                                onChange={() => handleChangeAgreeTermsLinkOrDocument('link')}
                                                type="radio"
                                                name="agreeTermsLinkOrDocument"
                                                value="link"
                                                id="link"
                                                defaultChecked={documentIdAgreeTerms === null}
                                                disabled={!permissions.managePortalSettings}
                                            />
                                            <label htmlFor="link">&nbsp;Link</label>
                                        </div>
                                        <div className={'col-xs-6'}>
                                            <input
                                                onChange={() => handleChangeAgreeTermsLinkOrDocument('document')}
                                                type="radio"
                                                name="agreeTermsLinkOrDocument"
                                                value="document"
                                                id="document"
                                                defaultChecked={documentIdAgreeTerms !== null}
                                                disabled={!permissions.managePortalSettings}
                                            />
                                            <label htmlFor="document">&nbsp;Document</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <InputTextLong
                            label="Voorwaarden link"
                            name={'linkAgreeTerms'}
                            value={linkAgreeTerms}
                            onChangeAction={handleInputChange}
                            error={errors.linkAgreeTerms}
                            errorMessage={errorMessages.linkAgreeTerms}
                            readOnly={!permissions.managePortalSettings || agreeTermsLinkOrDocument !== 'link'}
                        />
                    </div>
                    <div className="row">
                        <InputReactSelectLong
                            label="Voorwaarden document"
                            description
                            name={'documentIdAgreeTerms'}
                            options={relatedDocumentsOnPortal}
                            optionId={'id'}
                            optionName={'description'}
                            value={documentIdAgreeTerms}
                            onChangeAction={handleReactSelectChange}
                            error={errors.documentIdAgreeTerms}
                            errorMessage={errorMessages.documentIdAgreeTerms}
                            disabled={!permissions.managePortalSettings || agreeTermsLinkOrDocument !== 'document'}
                        />
                    </div>

                    <div className={'row'}>
                        <InputTextLong
                            label="Voorwaarden tekst"
                            name={'textLinkAgreeTerms'}
                            value={textLinkAgreeTerms}
                            maxLength="191"
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textLinkAgreeTerms}
                            errorMessage={errorMessages.textLinkAgreeTerms}
                            readOnly={!permissions.managePortalSettings}
                            textToolTip={helpTextLinkAgreeTerms}
                        />
                    </div>
                    <div className={'row'}>
                        <InputTextLong
                            label="Voorwaarden link naam"
                            name={'textLinkNameAgreeTerms'}
                            value={textLinkNameAgreeTerms}
                            maxLength="191"
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textLinkNameAgreeTerms}
                            errorMessage={errorMessages.textLinkNameAgreeTerms}
                            readOnly={!permissions.managePortalSettings}
                            textToolTip={`Je kan hier het klikbare gedeelte van de linktekst aanpassen maar in de voorwaarde tekst moet het {voorwaarden_link} blijven`}
                        />
                    </div>

                    <hr />

                    <div className="row">
                        <div className="form-group col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label htmlFor="understandInfoLinkOrDocument" className="col-sm-12">
                                        Voorwaarden link of document
                                    </label>
                                </div>
                                <div className="col-sm-3">
                                    <div className={'row'}>
                                        <div className={'col-xs-6'}>
                                            <input
                                                onChange={() => handleChangeUnderstandInfoLinkOrDocument('link')}
                                                type="radio"
                                                name="understandInfoLinkOrDocument"
                                                value="link"
                                                id="link"
                                                defaultChecked={documentIdUnderstandInfo === null}
                                                disabled={!permissions.managePortalSettings}
                                            />
                                            <label htmlFor="link">&nbsp;Link</label>
                                        </div>
                                        <div className={'col-xs-6'}>
                                            <input
                                                onChange={() => handleChangeUnderstandInfoLinkOrDocument('document')}
                                                type="radio"
                                                name="understandInfoLinkOrDocument"
                                                value="document"
                                                id="document"
                                                defaultChecked={documentIdUnderstandInfo !== null}
                                                disabled={!permissions.managePortalSettings}
                                            />
                                            <label htmlFor="document">&nbsp;Document</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <InputTextLong
                            label="Project informatie link"
                            name={'linkUnderstandInfo'}
                            value={linkUnderstandInfo}
                            onChangeAction={handleInputChange}
                            error={errors.linkUnderstandInfo}
                            errorMessage={errorMessages.linkUnderstandInfo}
                            readOnly={!permissions.managePortalSettings || understandInfoLinkOrDocument !== 'link'}
                        />
                    </div>
                    <div className="row">
                        <InputReactSelectLong
                            label="Project informatie document"
                            description
                            name={'documentIdUnderstandInfo'}
                            options={relatedDocumentsOnPortal}
                            optionId={'id'}
                            optionName={'description'}
                            value={documentIdUnderstandInfo}
                            onChangeAction={handleReactSelectChange}
                            error={errors.documentIdUnderstandInfo}
                            errorMessage={errorMessages.documentIdUnderstandInfo}
                            disabled={!permissions.managePortalSettings || understandInfoLinkOrDocument !== 'document'}
                        />
                    </div>

                    <div className={'row'}>
                        <InputTextLong
                            label="Project informatie tekst"
                            name={'textLinkUnderstandInfo'}
                            value={textLinkUnderstandInfo}
                            maxLength="191"
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textLinkUnderstandInfo}
                            errorMessage={errorMessages.textLinkUnderstandInfo}
                            readOnly={!permissions.managePortalSettings}
                            textToolTip={helpTextLinkUnderstandInfo}
                        />
                    </div>
                    <div className={'row'}>
                        <InputTextLong
                            label="Project informatie link naam"
                            name={'textLinkNameUnderstandInfo'}
                            value={textLinkNameUnderstandInfo}
                            maxLength="191"
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textLinkNameUnderstandInfo}
                            errorMessage={errorMessages.textLinkNameUnderstandInfo}
                            readOnly={!permissions.managePortalSettings}
                            textToolTip={`Je kan hier het klikbare gedeelte van de linktekst aanpassen maar in het voorwaarden tekst veld moet het {project_informatie_link} blijven.`}
                        />
                    </div>

                    <hr />
                    <div className="row">
                        <label htmlFor="confirmAgreement" className="col-sm-12">
                            <strong>Bevestigen</strong>
                        </label>
                    </div>
                    <div className={'row'}>
                        {/*<div className="form-group col-sm-12">*/}
                        {/*    <div className="row">*/}
                        {/*        <div className="col-sm-3">*/}
                        {/*            <label htmlFor="textAcceptAgreement" className="col-sm-12">*/}
                        {/*                Bevestigen tekst*/}
                        {/*            </label>*/}
                        {/*        </div>*/}
                        {/*        <div className="col-sm-8">*/}
                        {/*            <textarea*/}
                        {/*                name="textAcceptAgreement"*/}
                        {/*                value={textAcceptAgreement}*/}
                        {/*                onChange={handleInputChange}*/}
                        {/*                className="form-control input-sm"*/}
                        {/*                required={'required'}*/}
                        {/*                // error={errors.textAcceptAgreement}*/}
                        {/*                // errorMessage={errorMessages.textAcceptAgreement}*/}
                        {/*                readOnly={!permissions.managePortalSettings}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <InputTextArea
                            label="Bevestigen tekst"
                            name={'textAcceptAgreement'}
                            sizeInput={'col-sm-8'}
                            rows={2}
                            value={textAcceptAgreement}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textAcceptAgreement}
                            errorMessage={errorMessages.textAcceptAgreement}
                            disabled={!permissions.managePortalSettings}
                        />
                    </div>
                    <div className="row">
                        <InputTextLong
                            label="Bevestigen knop tekst"
                            name={'textAcceptAgreementQuestion'}
                            value={textAcceptAgreementQuestion}
                            onChangeAction={handleInputChange}
                            error={errors.textAcceptAgreementQuestion}
                            errorMessage={errorMessages.textAcceptAgreementQuestion}
                            readOnly={!permissions.managePortalSettings}
                        />
                    </div>

                    <div className="row">
                        <InputReactSelectLong
                            label="Document template inschrijfformulier"
                            name={'documentTemplateAgreementId'}
                            options={documentTemplates}
                            value={documentTemplateAgreementId}
                            onChangeAction={handleReactSelectChange}
                            // isLoading={peekLoading.documentTemplates}
                            error={errors.documentTemplateAgreementId}
                            errorMessage={errorMessages.documentTemplateAgreementId}
                            disabled={!permissions.managePortalSettings}
                        />
                    </div>
                    <div className="row">
                        <InputReactSelectLong
                            label="E-mail template inschrijfbevestiging"
                            name={'emailTemplateAgreementId'}
                            options={emailTemplates}
                            value={emailTemplateAgreementId}
                            onChangeAction={handleReactSelectChange}
                            // isLoading={peekLoading.emailTemplates}
                            error={errors.emailTemplateAgreementId}
                            errorMessage={errorMessages.emailTemplateAgreementId}
                            disabled={!permissions.managePortalSettings}
                        />
                    </div>
                    <div className="row">
                        <InputToggle
                            label={'Contacten mogen deelnames/bedragen bijschrijven na initiele inschrijving'}
                            name={'allowIncreaseParticipationsInPortal'}
                            value={allowIncreaseParticipationsInPortal}
                            onChangeAction={handleInputChange}
                            disabled={!permissions.managePortalSettings}
                        />
                    </div>
                    {allowIncreaseParticipationsInPortal ? (
                        <>
                            <div className="row">
                                <InputReactSelectLong
                                    label="Document template bijschrijfformulier"
                                    name={'documentTemplateIncreaseParticipationsId'}
                                    options={documentTemplates}
                                    value={documentTemplateIncreaseParticipationsId}
                                    onChangeAction={handleReactSelectChange}
                                    // isLoading={peekLoading.documentTemplates}
                                    error={errors.documentTemplateIncreaseParticipationsId}
                                    errorMessage={errorMessages.documentTemplateIncreaseParticipationsId}
                                    disabled={!permissions.managePortalSettings}
                                />
                            </div>
                            <div className="row">
                                <InputReactSelectLong
                                    label="E-mail template bijschrijfformulier"
                                    name={'emailTemplateIncreaseParticipationsId'}
                                    options={emailTemplates}
                                    value={emailTemplateIncreaseParticipationsId}
                                    onChangeAction={handleReactSelectChange}
                                    // isLoading={peekLoading.emailTemplates}
                                    error={errors.emailTemplateIncreaseParticipationsId}
                                    errorMessage={errorMessages.emailTemplateIncreaseParticipationsId}
                                    disabled={!permissions.managePortalSettings}
                                />
                            </div>
                        </>
                    ) : null}

                    <hr />
                    <div className="row">
                        <label className="col-sm-12">
                            <strong>Bevestigen en betalen</strong>
                        </label>
                    </div>
                    {administrations.find(a => a.id === administrationId) &&
                    administrations.find(a => a.id === administrationId).usesMollie ? (
                        <div className="row">
                            <InputToggle
                                label={'Direct elektronisch betalen via Mollie'}
                                name={'usesMollie'}
                                value={usesMollie}
                                onChangeAction={handleInputChange}
                            />
                        </div>
                    ) : null}

                    <hr />
                    <div className="row">
                        <label className="col-sm-12">
                            <strong>Bevestiging inschrijving</strong>
                        </label>
                    </div>

                    <div className={'row'}>
                        {/*<div className="form-group col-sm-12">*/}
                        {/*    <div className="row">*/}
                        {/*        <div className="col-sm-3">*/}
                        {/*            <label htmlFor="textRegistrationFinished" className="col-sm-12">*/}
                        {/*                Inschrijving afgerond tekst*/}
                        {/*            </label>*/}
                        {/*        </div>*/}
                        {/*        <div className="col-sm-8">*/}
                        {/*            <textarea*/}
                        {/*                name="textRegistrationFinished"*/}
                        {/*                value={textRegistrationFinished}*/}
                        {/*                onChange={handleInputChange}*/}
                        {/*                className="form-control input-sm"*/}
                        {/*                required={'required'}*/}
                        {/*                readOnly={!permissions.managePortalSettings}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <InputTextArea
                            label="Inschrijving afgerond tekst"
                            name={'textRegistrationFinished'}
                            sizeInput={'col-sm-8'}
                            rows={2}
                            value={textRegistrationFinished}
                            onChangeAction={handleInputChange}
                            // required={'required'}
                            // error={errors.textRegistrationFinished}
                            // errorMessage={errorMessages.textRegistrationFinished}
                        />
                    </div>
                </>
            ) : null}
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        projectStatuses: state.systemData.projectStatus,
        transactionCostsCodeRefs: state.systemData.transactionCostsCodeRefs,
        baseProjectCodeRefs: state.systemData.baseProjectCodeRefs,
        administrations: state.meDetails.administrations,
        permissions: state.meDetails.permissions,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps)(ProjectFormEditGeneral);
