import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';
moment.locale('nl');
import HousingFileDetailsAPI from '../../../../api/housing-file/HousingFileDetailsAPI';
import { newHousingFileMeasureTaken } from '../../../../actions/housing-file/HousingFileDetailsActions';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import MeasuresOfCategory from '../../../../selectors/MeasuresOfCategory';

class HousingFileMeasuresTakenNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            measureTaken: {
                addressId: this.props.addressId,
                measureId: '',
                measureCategoryId: '',
                measureDate: '',
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
            measureTaken: {
                ...this.state.measureTaken,
                [name]: value,
            },
        });
    };

    handleMeasureDate = date => {
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        this.setState({
            ...this.state,
            measureTaken: {
                ...this.state.measureTaken,
                measureDate: formattedDate,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { measureTaken } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(measureTaken.measureId)) {
            errors.measureId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            HousingFileDetailsAPI.attachMeasureTaken(measureTaken)
                .then(payload => {
                    this.props.newHousingFileMeasureTaken(payload.data.data);
                    this.props.toggleShowNew();
                })
                .catch(function(error) {
                    alert(error);
                });
    };

    render() {
        const { measureCategoryId, measureId, measureDate } = this.state.measureTaken;
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
                                size={'col-sm-6'}
                                name={'measureId'}
                                options={measuresMatchToCategory}
                                value={measureId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.measureId}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label={'Datum realisatie'}
                                name="measureDate"
                                value={measureDate}
                                onChangeAction={this.handleMeasureDate}
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
        measures: state.systemData.measures,
        measureCategories: state.systemData.measureCategories,
        addressId: state.housingFileDetails.address.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newHousingFileMeasureTaken: address => {
        dispatch(newHousingFileMeasureTaken(address));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HousingFileMeasuresTakenNew);
