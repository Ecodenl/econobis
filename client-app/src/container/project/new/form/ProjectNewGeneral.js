import React from 'react';
import { connect } from 'react-redux';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import InputToggle from '../../../../components/form/InputToggle';
import InputMultiSelect from '../../../../components/form/InputMultiSelect';
import ViewText from '../../../../components/form/ViewText';

const ProjectFormNewGeneral = ({
    name,
    code,
    description,
    projectStatusId,
    projectTypeId,
    useSceProject,
    isSceProject,
    postalcodeLink,
    checkPostalcodeLink,
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
    administration,
    dateStart,
    dateEnd,
    dateEntry,
    contactGroupIds,
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
    hasPaymentInvoices,
    users,
    contactGroups,
    disableBeforeEntryDate,
    errors,
}) => (
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
            <InputSelect
                label={'Type project'}
                name={'projectTypeId'}
                options={projectTypesActive}
                value={projectTypeId}
                onChangeAction={handleInputChangeProjectType}
                required={'required'}
                error={errors.projectTypeId}
            />
            <InputSelect
                label={'Status'}
                name={'projectStatusId'}
                options={projectStatus}
                value={projectStatusId}
                onChangeAction={handleInputChange}
                required={'required'}
                error={errors.projectStatusId}
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
            {isSceProject == true && (
                <InputSelect
                    label={'Basis project'}
                    name={'baseProjectCodeRef'}
                    options={baseProjectCodeRefs}
                    value={baseProjectCodeRef}
                    onChangeAction={handleInputChange}
                    required={isSceProject ? 'required' : ''}
                    error={errors.baseProjectCodeRef}
                />
            )}
        </div>

        <div className="row">
            <InputText
                type={'number'}
                label={'Opgesteld vermogen kWp'}
                name={'powerKwAvailable'}
                value={powerKwAvailable}
                onChangeAction={handleInputChange}
            />
            {isSceProject == true && (
                <ViewText
                    className={'form-group col-sm-6'}
                    label={'Benodigd aantal deelnemende leden'}
                    value={requiredParticipants}
                />
            )}
        </div>

        {isSceProject == true && (
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
                    <InputText
                        label={'Postcoderoosgebied'}
                        name={'postalcodeLink'}
                        value={postalcodeLink}
                        onChangeAction={handleInputChange}
                    />
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
        )}

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

            <InputSelect
                label={'Administratie'}
                name={'administrationId'}
                options={administrations}
                value={administrationId}
                onChangeAction={handleInputChangeAdministration}
                required={'required'}
                error={errors.administrationId}
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
                        value={contactGroupIds}
                        onChangeAction={handleContactGroupIds}
                        error={errors.contactGroupIds}
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
            />
        </div>
    </React.Fragment>
);

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
