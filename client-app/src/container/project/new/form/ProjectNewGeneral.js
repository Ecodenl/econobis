import React from 'react';
import { connect } from 'react-redux';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import InputToggle from '../../../../components/form/InputToggle';
import InputMultiSelect from '../../../../components/form/InputMultiSelect';
import ViewText from '../../../../components/form/ViewText';
import validator from 'validator';
import InputTextArea from '../../../../components/form/InputTextArea';

const ProjectFormNewGeneral = ({
    name,
    code,
    description,
    projectStatusId,
    projectTypeId,
    projectTypeCodeRef,
    useSceProject,
    isSceProject,
    postalcodeLink,
    addressNumberSeries,
    checkPostalcodeLink,
    hideWhenNotMatchingPostalCheck,
    baseProjectCodeRef,
    baseProjectCodeRefs,
    checkDoubleAddresses,
    powerKwAvailable,
    requiredParticipants,
    numberOfParticipantsStillNeeded,
    postalCode,
    address,
    city,
    dateStartRegistrations,
    dateEndRegistrations,
    ownedById,
    administrationId,
    usesMollie,
    dateStart,
    dateEnd,
    dateEntry,
    contactGroupIdsSelected,
    dateProduction,
    isMembershipRequired,
    visibleForAllContacts,
    textInfoProjectOnlyMembers,
    handleInputChange,
    handleInputChangeProjectType,
    handleInputChangeAdministration,
    handleInputChangeDate,
    handleContactGroupIds,
    projectTypesActive,
    projectStatus,
    administrations,
    users,
    contactGroups,
    disableBeforeEntryDate,
    errors,
    errorMessages,
}) => {
    let addressNumberSeriesFieldEnabled = postalcodeLink
        ? postalcodeLink.replace(/\D/g, '').length === 4 && postalcodeLink.replace(/[0-9]/g, '').trim().length === 2
        : false;

    // todo WM: zelfde controle postalcodeLink / addressNumberSeries zit nu ook in ProjectNewApp
    errors.postalcodeLink = false;
    errorMessages.postalcodeLink = '';
    if (null !== projectTypeCodeRef) {
        if (
            (checkPostalcodeLink || projectTypeCodeRef === 'postalcode_link_capital') &&
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
                <InputSelect
                    label={'Type project'}
                    name={'projectTypeId'}
                    options={projectTypesActive}
                    value={projectTypeId}
                    onChangeAction={handleInputChangeProjectType}
                    required={'required'}
                    error={errors.projectTypeId}
                    errorMessage={errorMessages.projectTypeId}
                />
                <InputSelect
                    label={'Status'}
                    name={'projectStatusId'}
                    options={projectStatus}
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
                                errorMessage={errorMessages.postalcodeLink}
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
                        <div className={'form-group col-sm-6'} />
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
            </div>

            {administrations.find(a => a.id == administrationId) &&
                administrations.find(a => a.id == administrationId).usesMollie && (
                    <div className="row">
                        <div className="form-group col-sm-6" />
                        <InputToggle
                            label={'Direct elektronisch betalen via Mollie'}
                            name={'usesMollie'}
                            value={usesMollie}
                            onChangeAction={handleInputChange}
                        />
                    </div>
                )}

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
                            value={contactGroupIdsSelected}
                            onChangeAction={handleContactGroupIds}
                            error={errors.contactGroupIds}
                            errorMessage={errorMessages.contactGroupIds}
                            required={'required'}
                        />
                    </div>
                )}
            </div>
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
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        projectStatus: state.systemData.projectStatus,
        projectTypesActive: state.systemData.projectTypesActive,
        baseProjectCodeRefs: state.systemData.baseProjectCodeRefs,
        administrations: state.meDetails.administrations,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps)(ProjectFormNewGeneral);
