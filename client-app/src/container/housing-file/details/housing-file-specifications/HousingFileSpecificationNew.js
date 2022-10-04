import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';
moment.locale('nl');
import HousingFileDetailsAPI from '../../../../api/housing-file/HousingFileDetailsAPI';
import { addHousingFileSpecificationToState } from '../../../../actions/housing-file/HousingFileDetailsActions';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import MeasuresOfCategory from '../../../../selectors/MeasuresOfCategory';
import InputTextArea from '../../../../components/form/InputTextArea';
import InputText from '../../../../components/form/InputText';

class HousingFileSpecificationNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            housingFileSpecification: {
                housingFileId: this.props.housingFileId,
                measureId: '',
                measureCategoryId: '',
                measureDate: '',
                answer: '',
                statusId: '',
                floorId: '',
                sideId: '',
                typeBrand: '',
            },
            errors: {
                measureId: false,
            },
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

        if (validator.isEmpty(housingFileSpecification.measureId)) {
            errors.measureId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            HousingFileDetailsAPI.addHousingFileSpecification(housingFileSpecification)
                .then(payload => {
                    this.props.addHousingFileSpecificationToState(payload.data.data);
                    this.props.toggleShowNew();
                })
                .catch(function(error) {
                    alert(error);
                });
    };

    render() {
        const {
            measureCategoryId,
            measureId,
            measureDate,
            answer,
            statusId,
            floorId,
            sideId,
            typeBrand,
        } = this.state.housingFileSpecification;
        const measuresMatchToCategory = MeasuresOfCategory(this.props.measures, measureCategoryId);
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
                                onChangeAction={this.handleInputChange}
                            />
                            <InputSelect
                                label={'Maatregel - specifiek'}
                                name={'measureId'}
                                options={measuresMatchToCategory}
                                value={measureId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.measureId}
                            />
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

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNew}
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
        housingFileId: state.housingFileDetails.id,
        measures: state.systemData.measures,
        measureCategories: state.systemData.measureCategories,
        statuses: state.systemData.housingFileSpecificationStatuses,
        floors: state.systemData.housingFileSpecificationFloors,
        sides: state.systemData.housingFileSpecificationSides,
    };
};

const mapDispatchToProps = dispatch => ({
    addHousingFileSpecificationToState: housingFileSpecification => {
        dispatch(addHousingFileSpecificationToState(housingFileSpecification));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileSpecificationNew);
