import React from 'react';
import { connect } from 'react-redux';

import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import InputText from '../../../components/form/InputText';
import InputTextArea from '../../../components/form/InputTextArea';
import MeasuresOfCategory from '../../../selectors/MeasuresOfCategory';
import InputMultiSelect from '../../../components/form/InputMultiSelect';

const OpportunityNew = props => {
    const {
        statusId,
        quotationText,
        evaluationAgreedDate,
        desiredDate,
        measureCategoryId,
        measureIds,
        measureIdsSelected,
        amount,
    } = props.opportunity;

    const measuresMatchToCategory = MeasuresOfCategory(props.measures, measureCategoryId);
    const measureCategory = props.measureCategories.find(measureCategory => measureCategory.id == measureCategoryId);

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <InputText
                    label={'Contact'}
                    name={'contact'}
                    value={props.intake.contact ? props.intake.contact.fullName : ''}
                    readOnly={true}
                />
                <InputText
                    label={'Adres'}
                    name={'address'}
                    value={props.intake ? props.intake.fullAddress : ''}
                    readOnly={true}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Maatregel - categorie'}
                    name={'measureCategory'}
                    value={measureCategory ? measureCategory.name : ''}
                    readOnly={true}
                />
                <InputText
                    label={'Campagne'}
                    name={'campaign'}
                    value={props.intake.campaign ? props.intake.campaign.name : ''}
                    readOnly={true}
                />
            </div>

            <div className="row">
                <InputMultiSelect
                    label={'Maatregel - specifiek'}
                    name={'measureIds'}
                    options={measuresMatchToCategory}
                    value={measureIdsSelected}
                    onChangeAction={props.handleMeasureIds}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={'Status'}
                    size={'col-sm-6'}
                    name={'statusId'}
                    options={props.status.filter(item => item.active == 1)}
                    value={statusId}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.statusId}
                />
            </div>

            <div className="row">
                <InputText
                    label="Aantal"
                    size={'col-sm-5'}
                    name={'amount'}
                    type={'number'}
                    min={'0'}
                    value={amount}
                    onChangeAction={props.handleInputChange}
                    error={props.errors.amount}
                    allowZero={true}
                    textToolTip={`aantal, m2 of Wattpiek`}
                />
            </div>

            <div className="row">
                <InputTextArea
                    label={'Toelichting op maatregel'}
                    name={'quotationText'}
                    value={quotationText}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputDate
                    label="Datum uitvoering"
                    name="desiredDate"
                    value={desiredDate}
                    onChangeAction={props.handleInputChangeDate}
                    error={props.errors.desiredDate}
                />
                <InputDate
                    label="Datum evaluatie"
                    name="evaluationAgreedDate"
                    value={evaluationAgreedDate}
                    onChangeAction={props.handleInputChangeDate}
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
        status: state.systemData.opportunityStatus,
        measures: state.systemData.measures,
        measureCategories: state.systemData.measureCategories,
    };
};

export default connect(mapStateToProps)(OpportunityNew);
