import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import HousingFileDetailsAPI from '../../../../api/housing-file/HousingFileDetailsAPI';
// import { updateHousingFileHousingStatusToState } from '../../../../actions/housing-file/HousingFileDetailsActions';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import MeasuresOfCategory from '../../../../selectors/MeasuresOfCategory';
import InputTextArea from '../../../../components/form/InputTextArea';
import InputText from '../../../../components/form/InputText';

class HousingFileHousingStatusEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            housingFileId,
            measure,
            measureId,
            measureDate,
            answer,
            status,
            floor,
            side,
            typeBrand,
        } = props.housingFileHousingStatus;

        this.state = {
            housingFileHousingStatus: {
                id,
                housingFileId,
                measureId,
                measureCategoryId: measure.measureCategory ? measure.measureCategory.id : null,
                measureDate,
                answer,
                statusId: status ? status.id : null,
                floorId: floor ? floor.id : null,
                sideId: side ? side.id : null,
                typeBrand,
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
            housingFileHousingStatus: {
                ...this.state.housingFileHousingStatus,
                [name]: value,
            },
        });
    };

    handleMeasureDate = date => {
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        this.setState({
            ...this.state,
            housingFileHousingStatus: {
                ...this.state.housingFileHousingStatus,
                measureDate: formattedDate,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { housingFileHousingStatus } = this.state;

        let errors = {};
        let hasErrors = false;

        this.setState({ ...this.state, errors: errors });

        // !hasErrors &&
        //     HousingFileDetailsAPI.updateHousingFileHousingStatus(housingFileHousingStatus)
        //         .then(payload => {
        //             this.props.updateHousingFileHousingStatusToState(payload.data.data);
        //             this.props.closeEdit();
        //         })
        //         .catch(function(error) {
        //             alert(error);
        //         });
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
        } = this.state.housingFileHousingStatus;
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
                                readOnly={true}
                            />
                            <InputSelect
                                label={'Maatregel - specifiek'}
                                name={'measureId'}
                                options={measuresMatchToCategory}
                                value={measureId}
                                readOnly={true}
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
        measures: state.systemData.measures,
        measureCategories: state.systemData.measureCategories,
        // housingFileHoomLinks: state.systemData.,housingFileHoomLinks
    };
};

const mapDispatchToProps = dispatch => ({
    // updateHousingFileHousingStatusToState: housingFileHousingStatus => {
    //     dispatch(updateHousingFileHousingStatusToState(housingFileHousingStatus));
    // },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileHousingStatusEdit);
