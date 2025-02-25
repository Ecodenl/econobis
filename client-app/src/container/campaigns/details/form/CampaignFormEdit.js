import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import InputMultiSelect from '../../../../components/form/InputMultiSelect';
import InputToggle from '../../../../components/form/InputToggle';

moment.locale('nl');

function CampaignFormEdit({
    campaign,
    fetchCampaignData,
    switchToView,
    status,
    types,
    measureCategories,
    opportunityActions,
}) {
    // todo WM: opschonen inspection* velden
    const [formState, setFormState] = useState({
        ...campaign,
        description: campaign.description || '',
        statusId: campaign.status?.id || '',
        typeId: campaign.type?.id || '',
        measureCategoryIds: campaign.measureCategories?.map(item => item.id).join(','),
        measureCategoryIdsSelected: campaign.measureCategories ? campaign.measureCategories : [],
        opportunityActionIds: campaign.opportunityActions?.map(item => item.id).join(','),
        opportunityActionIdsSelected: campaign.opportunityActions ? campaign.opportunityActions : [],
    });
    const [errors, setErrors] = useState({
        name: false,
        type: false,
    });

    function handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFormState({
            ...formState,
            [name]: value,
        });
    }

    function handleInputChangeDate(date, name) {
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        setFormState({
            ...formState,
            [name]: formattedDate,
        });
    }

    function handleMeasureCategoryIds(selectedOption) {
        const measureCategoryIds = selectedOption ? selectedOption.map(item => item.id).join(',') : '';
        setFormState({
            ...formState,
            measureCategoryIds: measureCategoryIds,
            measureCategoryIdsSelected: selectedOption,
        });
    }

    function handleOpportunityActionIds(selectedOption) {
        const opportunityActionIds = selectedOption ? selectedOption.map(item => item.id).join(',') : '';
        setFormState({
            ...formState,
            opportunityActionIds: opportunityActionIds,
            opportunityActionIdsSelected: selectedOption,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        let errorsObj = {};
        let hasErrors = false;

        if (validator.isEmpty(formState.name)) {
            errorsObj.name = true;
            hasErrors = true;
        }

        if (validator.isEmpty('' + formState.typeId)) {
            errorsObj.type = true;
            hasErrors = true;
        }

        // if (!validator.isInt(formState.wozLimit)) {
        //     errorsObj.wozLimit = true;
        //     hasErrors = true;
        // }

        setErrors(errorsObj);

        if (!hasErrors) {
            try {
                await CampaignDetailsAPI.updateCampaign(formState.id, formState);

                fetchCampaignData();
                switchToView();
            } catch (error) {
                alert('Er is iets misgegaan met het opslaan van de gegevens!');
            }
        }
    }

    return (
        <form className="form-horizontal col-md-12" onSubmit={handleSubmit}>
            <div className="row">
                <InputText
                    label={'Naam'}
                    size={'col-sm-6'}
                    name={'name'}
                    value={formState.name}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.name}
                />
                <InputText label={'Campagnenummer'} name={'number'} value={formState.number} readOnly={true} />
            </div>

            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="description" className="col-sm-12">
                                Beschrijving
                            </label>
                        </div>
                        <div className="col-sm-8">
                            <textarea
                                name="description"
                                value={formState.description}
                                onChange={handleInputChange}
                                className="form-control input-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <InputDate
                    label={'Begindatum'}
                    size={'col-sm-6'}
                    name={'startDate'}
                    value={formState.startDate || ''}
                    onChangeAction={handleInputChangeDate}
                />
                <InputDate
                    label={'Einddatum'}
                    size={'col-sm-6'}
                    name={'endDate'}
                    value={formState.endDate || ''}
                    onChangeAction={handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={'Status'}
                    size={'col-sm-6'}
                    name={'statusId'}
                    options={status}
                    value={formState.statusId}
                    onChangeAction={handleInputChange}
                />
            </div>

            <div className="row">
                <InputMultiSelect
                    label="Aangeboden maatregelen"
                    name="measureCategoryIds"
                    value={formState.measureCategoryIdsSelected}
                    options={measureCategories}
                    onChangeAction={handleMeasureCategoryIds}
                />
            </div>

            <div className="row">
                <InputMultiSelect
                    label="Aangeboden kansacties"
                    name="opportunityActionIds"
                    value={formState.opportunityActionIdsSelected}
                    options={opportunityActions}
                    onChangeAction={handleOpportunityActionIds}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={'Type'}
                    size={'col-sm-6'}
                    name={'typeId'}
                    options={types}
                    value={formState.typeId}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.type}
                />
            </div>

            <div className="row">
                <InputToggle
                    label="Subsidie mogelijk"
                    divSize={'col-sm-6'}
                    name="subsidyPossible"
                    value={formState.subsidyPossible}
                    required={'required'}
                    onChangeAction={handleInputChange}
                />
            </div>
            {formState.subsidyPossible != false ? (
                <div className="row">
                    <InputText
                        label={'WOZ grens'}
                        size={'col-sm-6'}
                        name={'wozLimit'}
                        value={formState.wozLimit}
                        onChangeAction={handleInputChange}
                        error={errors.wozLimit}
                    />
                </div>
            ) : null}

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonClassName={'btn-default'} buttonText={'Annuleren'} onClickAction={switchToView} />
                    <ButtonText buttonText={'Opslaan'} onClickAction={handleSubmit} type={'submit'} value={'Submit'} />
                </div>
            </PanelFooter>
        </form>
    );
}

const mapStateToProps = state => {
    return {
        status: state.systemData.campaignStatuses,
        types: state.systemData.campaignTypes,
        measureCategories: state.systemData.measureCategories,
        opportunityActions: state.systemData.opportunityActions,
    };
};

export default connect(mapStateToProps)(CampaignFormEdit);
