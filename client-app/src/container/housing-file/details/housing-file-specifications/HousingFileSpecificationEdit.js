import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import HousingFileDetailsAPI from '../../../../api/housing-file/HousingFileDetailsAPI';
import { updateHousingFileSpecificationToState } from '../../../../actions/housing-file/HousingFileDetailsActions';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import MeasuresOfCategory from '../../../../selectors/MeasuresOfCategory';
import InputTextArea from '../../../../components/form/InputTextArea';
import InputText from '../../../../components/form/InputText';
import { hashHistory } from 'react-router';

class HousingFileSpecificationEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            housingFileId,
            measure,
            measureId,
            isDefaultEconobisMeasure,
            measureDate,
            answer,
            status,
            floor,
            side,
            typeBrand,
            externalHoomName,
            typeOfExecution,
            savingsGas,
            savingsElectricity,
            co2Savings,
        } = props.housingFileSpecification;

        this.state = {
            housingFileSpecification: {
                id,
                housingFileId,
                measureId,
                isDefaultEconobisMeasure: isDefaultEconobisMeasure,
                measureCategoryId: measure.measureCategory ? measure.measureCategory.id : null,
                measureDate,
                answer,
                statusId: status ? status.id : null,
                floorId: floor ? floor.id : null,
                sideId: side ? side.id : null,
                typeBrand,
                externalHoomName,
                typeOfExecution,
                savingsGas,
                savingsElectricity,
                co2Savings,
            },
            errors: {},
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            housingFileSpecification: {
                ...this.state.housingFileSpecification,
                [name]: value,
            },
        });
    };

    handleMeasureDate = date => {
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        this.setState({
            ...this.state,
            housingFileSpecification: {
                ...this.state.housingFileSpecification,
                measureDate: formattedDate,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { housingFileSpecification } = this.state;

        let errors = {};
        let hasErrors = false;

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            HousingFileDetailsAPI.updateHousingFileSpecification(housingFileSpecification)
                .then(payload => {
                    this.props.updateHousingFileSpecificationToState(payload.data.data);
                    this.props.closeEdit();
                })
                .catch(function(error) {
                    alert(error);
                });
    };

    render() {
        const {
            housingFileId,
            measureCategoryId,
            measureId,
            isDefaultEconobisMeasure,
            measureDate,
            answer,
            statusId,
            floorId,
            sideId,
            typeBrand,
            externalHoomName,
            typeOfExecution,
            savingsGas,
            savingsElectricity,
            co2Savings,
        } = this.state.housingFileSpecification;
        const hasHoomDossierLink = this.props.hasHoomDossierLink;
        const measuresMatchToCategory = MeasuresOfCategory(this.props.measures, measureCategoryId);

        const typeOfExecutionOptions = [
            { id: '', name: 'Onbekend' },
            { id: 'Z', name: 'Zelf doen' },
            { id: 'L', name: 'Laten doen' },
        ];

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={'Maatregel - categorie'}
                                name={'measureCategoryId'}
                                options={this.props.measureCategories}
                                value={measureCategoryId}
                                readOnly={true}
                            />
                            {isDefaultEconobisMeasure ? (
                                <InputText
                                    label={'Maatregel - specifiek'}
                                    name={'externalHoomName'}
                                    value={externalHoomName}
                                    readOnly={true}
                                />
                            ) : (
                                <InputSelect
                                    label={'Maatregel - specifiek'}
                                    name={'measureId'}
                                    options={measuresMatchToCategory}
                                    value={measureId}
                                    readOnly={true}
                                />
                            )}
                        </div>

                        <div className="row">
                            <InputSelect
                                label={'Status'}
                                name={'statusId'}
                                options={this.props.statuses}
                                value={statusId}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputDate
                                label={'Datum realisatie'}
                                name="measureDate"
                                value={measureDate}
                                onChangeAction={this.handleMeasureDate}
                            />
                        </div>

                        <div className="row">
                            <InputTextArea
                                label={'Waarde'}
                                name={'answer'}
                                value={answer}
                                onChangeAction={this.handleInputChange}
                                readOnly={hasHoomDossierLink}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={'Verdieping'}
                                name={'floorId'}
                                options={this.props.floors}
                                value={floorId}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputSelect
                                label={'Zijde'}
                                name={'sideId'}
                                options={this.props.sides}
                                value={sideId}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'Type/merk'}
                                name={'typeBrand'}
                                value={typeBrand}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'Besparing gas'}
                                name={'savingsGas'}
                                value={savingsGas}
                                onChangeAction={this.handleInputChange}
                                readOnly={hasHoomDossierLink}
                            />
                            <InputSelect
                                label={'Uitvoering'}
                                name={'typeOfExecution'}
                                options={typeOfExecutionOptions}
                                value={typeOfExecution}
                                onChangeAction={this.handleInputChange}
                                emptyOption={false}
                                readOnly={hasHoomDossierLink}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'Besparing elektriciteit'}
                                name={'savingsElectricity'}
                                value={savingsElectricity}
                                onChangeAction={this.handleInputChange}
                                readOnly={hasHoomDossierLink}
                            />
                            <InputText
                                label={'CO2 besparing'}
                                name={'co2Savings'}
                                value={co2Savings}
                                onChangeAction={this.handleInputChange}
                                readOnly={hasHoomDossierLink}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            {/*<ButtonText*/}
                            {/*    buttonText={'Maak kans'}*/}
                            {/*    onClickAction={() =>*/}
                            {/*        hashHistory.push(`/kans/nieuw/woningdossier/${housingFileId}/campagne/0`)*/}
                            {/*    }*/}
                            {/*/>*/}
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.cancelEdit}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        hasHoomDossierLink: state.housingFileDetails.hoomBuildingId != null ? true : false,
        measures: state.systemData.measures,
        measureCategories: state.systemData.measureCategories,
        statuses: state.systemData.housingFileSpecificationStatuses,
        floors: state.systemData.housingFileSpecificationFloors,
        sides: state.systemData.housingFileSpecificationSides,
    };
};

const mapDispatchToProps = dispatch => ({
    updateHousingFileSpecificationToState: housingFileSpecification => {
        dispatch(updateHousingFileSpecificationToState(housingFileSpecification));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileSpecificationEdit);
