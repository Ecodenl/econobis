import React from 'react';
import { connect } from 'react-redux';
import InputText from '../../../../../components/form/InputText';
import InputSelect from '../../../../../components/form/InputSelect';
import InputDate from '../../../../../components/form/InputDate';
import InputToggle from '../../../../../components/form/InputToggle';
import InputMultiSelect from '../../../../../components/form/InputMultiSelect';
import ViewText from '../../../../../components/form/ViewText';
import InputReactSelect from '../../../../../components/form/InputReactSelect';
import InputTextLong from '../../../../../components/form/InputTextLong';
import InputReactSelectLong from '../../../../../components/form/InputReactSelectLong';

const ProjectFormEditGeneral = ({
    permissions,
    name,
    code,
    description,
    projectStatusId,
    projectType,
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
    lastYearFinancialOverviewDefinitive,
    contactGroupIds,
    dateProduction,
    isMembershipRequired,
    handleInputChange,
    handleInputChangeAdministration,
    handleInputChangeDate,
    handleContactGroupIds,
    handleReactSelectChange,
    projectStatuses,
    administrations,
    hasPaymentInvoices,
    users,
    contactGroups,
    staticContactGroups,
    errors,
    amountOfParticipants,
    documentTemplateAgreementId,
    documentTemplates,
    emailTemplateAgreementId,
    emailTemplates,
    linkAgreeTerms,
    linkUnderstandInfo,
    linkProjectInfo,
    showQuestionAboutMembership,
    questionAboutMembershipGroupId,
    textIsMember,
    textIsNoMember,
    textBecomeMember,
    memberGroupId,
    textBecomeNoMember,
    noMemberGroupId,
    textAgreeTerms,
    textLinkAgreeTerms,
    textLinkUnderstandInfo,
    textAcceptAgreement,
    textAcceptAgreementQuestion,
    textRegistrationFinished,
}) => {
    let projectStatusCustomOptions = projectStatuses;

    if (amountOfParticipants) {
        projectStatusCustomOptions = projectStatuses.filter(projectStatus => projectStatus.codeRef !== 'concept');
    }

    const helpTextLinkAgreeTerms = 'Gebruik {voorwaarden_link} in tekst voor plaatsing van de voorwaarden link';
    const helpTextLinkUnderstandInfo =
        'Gebruik {project_informatie_link} in tekst voor plaatsing van de project informatie link';

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
                />
                <InputText
                    label={'Projectcode'}
                    name={'code'}
                    value={code}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.code}
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
                />
            </div>

            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="description" className="col-sm-12">
                                Omschrijving
                            </label>
                        </div>
                        <div className="col-sm-8">
                            <textarea
                                name="description"
                                value={description}
                                onChange={handleInputChange}
                                className="form-control input-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <InputText
                    label={'Postcode'}
                    name={'postalCode'}
                    value={postalCode}
                    onChangeAction={handleInputChange}
                    error={errors.postalCode}
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
                {hasPaymentInvoices || lastYearFinancialOverviewDefinitive != null ? (
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
                    />
                )}
            </div>

            {
                administrations.find(a => a.id == administrationId) && administrations.find(a => a.id == administrationId).usesMollie && (
                    <div className="row">
                        <div className="form-group col-sm-6"/>
                        <InputToggle
                            label={'Gebruikt Mollie'}
                            name={'usesMollie'}
                            value={usesMollie}
                            onChangeAction={handleInputChange}
                        />
                    </div>
                )
            }

            <div className="row">
                <InputDate
                    label={'Start project'}
                    name={'dateStart'}
                    value={dateStart}
                    onChangeAction={handleInputChangeDate}
                />
                <InputToggle
                    label={'Deelname aan groep verplicht'}
                    name={'isMembershipRequired'}
                    value={isMembershipRequired}
                    onChangeAction={handleInputChange}
                />
            </div>

            <div className="row">
                <InputDate
                    label={'Einde project'}
                    name={'dateEnd'}
                    value={dateEnd}
                    onChangeAction={handleInputChangeDate}
                />
                {isMembershipRequired == true && (
                    <div className={'row'}>
                        <InputMultiSelect
                            label={'Onderdeel van groep'}
                            name={'contactGroupsIds'}
                            options={contactGroups}
                            value={contactGroupIds}
                            onChangeAction={handleContactGroupIds}
                            error={errors.contactGroupIds}
                            required={'required'}
                        />
                    </div>
                )}
            </div>

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
                />
            </div>

            <hr />
            <h4>Contacten portal instellingen</h4>

            <div className="row">
                <label htmlFor="projectInfo" className="col-sm-12">
                    <strong>Project informatie</strong>
                </label>
            </div>
            <div className="row">
                <InputTextLong
                    label="Informatie link"
                    name={'linkProjectInfo'}
                    value={linkProjectInfo}
                    onChangeAction={handleInputChange}
                    error={errors.linkProjectInfo}
                    readOnly={!permissions.managePortalSettings}
                />
            </div>

            <hr />
            <div className="row">
                <label htmlFor="registerProject" className="col-sm-12">
                    <strong>Inschrijven</strong>
                </label>
            </div>
            <div className="row">
                <InputToggle
                    label={'Vragen over lid worden aan of uit?'}
                    name={'showQuestionAboutMembership'}
                    value={showQuestionAboutMembership}
                    onChangeAction={handleInputChange}
                    disabled={!permissions.managePortalSettings}
                />
            </div>
            {showQuestionAboutMembership == true && (
                <>
                    <div className={'row'}>
                        <InputReactSelectLong
                            label="Leden groep"
                            name={'questionAboutMembershipGroupId'}
                            options={contactGroups}
                            value={questionAboutMembershipGroupId}
                            onChangeAction={handleReactSelectChange}
                            multi={false}
                            required={'required'}
                            error={errors.questionAboutMembershipGroupId}
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
                            multi={false}
                            required={'required'}
                            error={errors.memberGroupId}
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
                            multi={false}
                            required={'required'}
                            error={errors.noMemberGroupId}
                            disabled={!permissions.managePortalSettings}
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
            <div className={'row'}>
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="textAgreeTerms" className="col-sm-12">
                                Voorwaarden tekst
                            </label>
                        </div>
                        <div className="col-sm-8">
                            <textarea
                                name="textAgreeTerms"
                                value={textAgreeTerms}
                                onChange={handleInputChange}
                                className="form-control input-sm"
                                required={'required'}
                                error={errors.textAgreeTerms}
                                readOnly={!permissions.managePortalSettings}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <InputTextLong
                    label="Voorwaarden link"
                    name={'linkAgreeTerms'}
                    value={linkAgreeTerms}
                    onChangeAction={handleInputChange}
                    error={errors.linkAgreeTerms}
                    readOnly={!permissions.managePortalSettings}
                />
            </div>
            <div className={'row'}>
                <InputTextLong
                    label={
                        <span>
                            Voorwaarden link tekst
                            <br />
                            <small style={{ color: '#ccc', fontWeight: 'normal' }}>{helpTextLinkAgreeTerms} </small>
                        </span>
                    }
                    name={'textLinkAgreeTerms'}
                    value={textLinkAgreeTerms}
                    maxLength="191"
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.textLinkAgreeTerms}
                    readOnly={!permissions.managePortalSettings}
                />
            </div>

            <hr />
            <div className="row">
                <InputTextLong
                    label="Project informatie link"
                    name={'linkUnderstandInfo'}
                    value={linkUnderstandInfo}
                    onChangeAction={handleInputChange}
                    error={errors.linkUnderstandInfo}
                    readOnly={!permissions.managePortalSettings}
                />
            </div>
            <div className={'row'}>
                <InputTextLong
                    label={
                        <span>
                            Project informatie link tekst
                            <br />
                            <small style={{ color: '#ccc', fontWeight: 'normal' }}>{helpTextLinkUnderstandInfo} </small>
                        </span>
                    }
                    name={'textLinkUnderstandInfo'}
                    value={textLinkUnderstandInfo}
                    maxLength="191"
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.textLinkUnderstandInfo}
                    readOnly={!permissions.managePortalSettings}
                />
            </div>

            <hr />
            <div className="row">
                <label htmlFor="confirmAgreement" className="col-sm-12">
                    <strong>Bevestigen</strong>
                </label>
            </div>
            <div className={'row'}>
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="textAcceptAgreement" className="col-sm-12">
                                Bevestigen tekst
                            </label>
                        </div>
                        <div className="col-sm-8">
                            <textarea
                                name="textAcceptAgreement"
                                value={textAcceptAgreement}
                                onChange={handleInputChange}
                                className="form-control input-sm"
                                required={'required'}
                                error={errors.textAcceptAgreement}
                                readOnly={!permissions.managePortalSettings}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <InputTextLong
                    label="Bevestigen knop tekst"
                    name={'textAcceptAgreementQuestion'}
                    value={textAcceptAgreementQuestion}
                    onChangeAction={handleInputChange}
                    error={errors.textAcceptAgreementQuestion}
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
                    multi={false}
                    error={errors.documentTemplateAgreementId}
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
                    multi={false}
                    error={errors.emailTemplateAgreementId}
                    disabled={!permissions.managePortalSettings}
                />
            </div>
            <div className="row">
                <label className="col-sm-12">
                    <strong>Afronden</strong>
                </label>
            </div>
            <div className={'row'}>
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="textRegistrationFinished" className="col-sm-12">
                                Inschrijving afgerond tekst
                            </label>
                        </div>
                        <div className="col-sm-8">
                            <textarea
                                name="textRegistrationFinished"
                                value={textRegistrationFinished}
                                onChange={handleInputChange}
                                className="form-control input-sm"
                                required={'required'}
                                error={errors.textRegistrationFinished}
                                readOnly={!permissions.managePortalSettings}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        projectStatuses: state.systemData.projectStatus,
        administrations: state.meDetails.administrations,
        permissions: state.meDetails.permissions,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps)(ProjectFormEditGeneral);
