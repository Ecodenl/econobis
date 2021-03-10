import React from 'react';
import { connect } from 'react-redux';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import InputToggle from '../../../../components/form/InputToggle';
import InputMultiSelect from '../../../../components/form/InputMultiSelect';

const ProjectFormNewGeneral = ({
    name,
    code,
    description,
    projectStatusId,
    projectTypeId,
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
    handleInputChange,
    handleInputChangeAdministration,
    handleInputChangeDate,
    handleContactGroupIds,
    projectTypes,
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
                options={projectTypes}
                value={projectTypeId}
                onChangeAction={handleInputChange}
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
    </React.Fragment>
);

const mapStateToProps = state => {
    return {
        projectStatus: state.systemData.projectStatus,
        projectTypes: state.systemData.projectTypes,
        administrations: state.meDetails.administrations,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps)(ProjectFormNewGeneral);
