import React from 'react';
import { connect } from 'react-redux';
import InputText from '../../../../../components/form/InputText';
import InputSelect from '../../../../../components/form/InputSelect';
import InputDate from '../../../../../components/form/InputDate';
import InputToggle from '../../../../../components/form/InputToggle';
import InputMultiSelect from '../../../../../components/form/InputMultiSelect';
import ViewText from '../../../../../components/form/ViewText';
import InputReactSelect from '../../../../../components/form/InputReactSelect';

const ProjectFormEditGeneral = ({
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
    dateStart,
    dateEnd,
    dateEntry,
    contactGroupIds,
    dateProduction,
    isMembershipRequired,
    handleInputChange,
    handleInputChangeDate,
    handleContactGroupIds,
    handleReactSelectChange,
    projectStatuses,
    administrations,
    hasPaymentInvoices,
    users,
    contactGroups,
    errors,
    amountOfParticipants,
    documentTemplateAgreementId,
    documentTemplates,
    emailTemplateAgreementId,
    emailTemplates,
    linkAgreeTerms,
    linkUnderstandInfo,
    showQuestionAboutMembership,
    questionAboutMembershipGroupId,
    textIsMember,
    textIsNoMember,
    textBecomeMember,
    memberGroupId,
    textBecomeNoMember,
    noMemberGroupId,
}) => {
    let projectStatusCustomOptions = projectStatuses;

    if (amountOfParticipants) {
        projectStatusCustomOptions = projectStatuses.filter(projectStatus => projectStatus.codeRef !== 'concept');
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

                {/*Als er al nota's zijn gemaakt mag de administratie niet meer gewijzigd worden*/}
                {hasPaymentInvoices ? (
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
                        onChangeAction={handleInputChange}
                        required={'required'}
                        error={errors.administrationId}
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
                />
            </div>

            <h4>Contacten portal instellingen</h4>

            <div className="row">
                <InputText
                    label="Voorwaarden link"
                    name={'linkAgreeTerms'}
                    value={linkAgreeTerms}
                    onChangeAction={handleInputChange}
                    error={errors.linkAgreeTerms}
                />
            </div>
            <div className="row">
                <InputText
                    label="Projectinformatie link"
                    name={'linkUnderstandInfo'}
                    value={linkUnderstandInfo}
                    onChangeAction={handleInputChange}
                    error={errors.linkUnderstandInfo}
                />
            </div>
            <div className="row">
                <InputReactSelect
                    label="Document template inschrijfformulier"
                    name={'documentTemplateAgreementId'}
                    options={documentTemplates}
                    value={documentTemplateAgreementId}
                    onChangeAction={handleReactSelectChange}
                    // isLoading={peekLoading.documentTemplates}
                    multi={false}
                    error={errors.documentTemplateAgreementId}
                />
            </div>
            <div className="row">
                <InputReactSelect
                    label="E-mail template inschrijfbevestiging"
                    name={'emailTemplateAgreementId'}
                    options={emailTemplates}
                    value={emailTemplateAgreementId}
                    onChangeAction={handleReactSelectChange}
                    // isLoading={peekLoading.emailTemplates}
                    multi={false}
                    error={errors.emailTemplateAgreementId}
                />
            </div>

            <hr />
            <div className="row">
                <InputToggle
                    label={'Vragen over lid worden aan of uit?'}
                    name={'showQuestionAboutMembership'}
                    value={showQuestionAboutMembership}
                    onChangeAction={handleInputChange}
                />
            </div>
            {showQuestionAboutMembership == true && (
                <>
                    <div className={'row'}>
                        <InputReactSelect
                            label="Leden groep"
                            name={'questionAboutMembershipGroupId'}
                            options={contactGroups}
                            value={questionAboutMembershipGroupId}
                            onChangeAction={handleReactSelectChange}
                            multi={false}
                            required={'required'}
                            error={errors.questionAboutMembershipGroupId}
                        />
                    </div>
                    <hr />
                    <div className={'row'}>
                        <InputText
                            label="Regel tekst bij leden"
                            name={'textIsMember'}
                            value={textIsMember}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textIsMember}
                        />
                    </div>
                    <hr />
                    <div className={'row'}>
                        <InputText
                            label="Regel tekst bij niet leden"
                            name={'textIsNoMember'}
                            value={textIsNoMember}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textIsNoMember}
                        />
                    </div>
                    <div className={'row'}>
                        <InputText
                            label="Keuzetekst (1) bij niet leden"
                            name={'textBecomeMember'}
                            value={textBecomeMember}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textBecomeMember}
                        />
                    </div>
                    <div className={'row'}>
                        <InputReactSelect
                            label="Contacten die keuze 1 maken toevoegen aan"
                            name={'memberGroupId'}
                            options={contactGroups}
                            value={memberGroupId}
                            onChangeAction={handleReactSelectChange}
                            multi={false}
                            required={'required'}
                            error={errors.memberGroupId}
                        />
                    </div>
                    <div className={'row'}>
                        <InputText
                            label="Keuzetekst (2) bij niet leden"
                            name={'textBecomeNoMember'}
                            value={textBecomeNoMember}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.textBecomeNoMember}
                        />
                    </div>
                    <div className={'row'}>
                        <InputReactSelect
                            label="Contacten die keuze 2 maken toevoegen aan"
                            name={'noMemberGroupId'}
                            options={contactGroups}
                            value={noMemberGroupId}
                            onChangeAction={handleReactSelectChange}
                            multi={false}
                            required={'required'}
                            error={errors.noMemberGroupId}
                        />
                    </div>
                </>
            )}
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        projectStatuses: state.systemData.projectStatus,
        administrations: state.meDetails.administrations,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps)(ProjectFormEditGeneral);
