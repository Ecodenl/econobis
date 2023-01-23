import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import InputMultiSelect from '../../../components/form/InputMultiSelect';
import InputText from '../../../components/form/InputText';

const CampaignNew = props => {
    const {
        name,
        description,
        startDate,
        endDate,
        statusId,
        measureCategoryIdsSelected,
        opportunityActionIdsSelected,
        typeId,
    } = props.campaign;
    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <InputText
                    label={'Naam'}
                    size={'col-sm-6'}
                    name={'name'}
                    value={name}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.name}
                />
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
                                value={description}
                                onChange={props.handleInputChange}
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
                    value={startDate}
                    onChangeAction={props.handleInputChangeDate}
                />
                <InputDate
                    label={'Einddatum'}
                    size={'col-sm-6'}
                    name={'endDate'}
                    value={endDate}
                    onChangeAction={props.handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={'Status'}
                    size={'col-sm-6'}
                    name={'statusId'}
                    options={props.status}
                    value={statusId}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputMultiSelect
                    label="Aangeboden maatregelen"
                    name="measureCategoryIds"
                    value={measureCategoryIdsSelected}
                    options={props.measureCategories}
                    onChangeAction={props.handleMeasureCategoryIds}
                />
            </div>
            <div className="row">
                <InputMultiSelect
                    label="Aangeboden kansacties"
                    name="opportunityActionIds"
                    value={opportunityActionIdsSelected}
                    options={props.opportunityActions}
                    onChangeAction={props.handleOpportunityActionIds}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={'Type'}
                    size={'col-sm-6'}
                    name={'typeId'}
                    options={props.types}
                    value={typeId}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.type}
                />
            </div>
            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText
                        buttonText={'Opslaan'}
                        onClickAction={props.handleSubmit}
                        type={'submit'}
                        value={'Submit'}
                    />
                </div>
            </PanelFooter>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        status: state.systemData.campaignStatuses,
        types: state.systemData.campaignTypes,
        measureCategories: state.systemData.measureCategories,
        opportunityActions: state.systemData.opportunityActions,
    };
};

export default connect(mapStateToProps)(CampaignNew);
