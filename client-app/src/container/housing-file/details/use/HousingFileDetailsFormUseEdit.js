import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import HousingFileDetailsAPI from '../../../../api/housing-file/HousingFileDetailsAPI';
import { fetchHousingFileDetails } from '../../../../actions/housing-file/HousingFileDetailsActions';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';

class HousingFileDetailsFormUseEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            hoomBuildingId,
            pitchedRoofHeating,
            flatRoofHeating,
            hr3pGlassFrameCurrentGlass,
            glassInLeadReplaceRoomsHeated,
            numberOfResidents,
            boilerSettingComfortHeat,
            amountGas,
            amountElectricity,
        } = props.housingFileDetails;

        this.state = {
            pitchedRoofHeatingSelection: [],
            flatRoofHeatingSelection: [],
            hr3pGlassFrameCurrentGlassSelection: [],
            glassInLeadReplaceRoomsHeatedSelection: [],
            boilerSettingComfortHeatSelection: [],
            housingFile: {
                id,
                hasHoomDossierLink: hoomBuildingId != null ? true : false,
                pitchedRoofHeating: pitchedRoofHeating ? pitchedRoofHeating.hoomStatusValue : '',
                flatRoofHeating: flatRoofHeating ? flatRoofHeating.hoomStatusValue : '',
                hr3pGlassFrameCurrentGlass: hr3pGlassFrameCurrentGlass
                    ? hr3pGlassFrameCurrentGlass.hoomStatusValue
                    : '',
                glassInLeadReplaceRoomsHeated: glassInLeadReplaceRoomsHeated
                    ? glassInLeadReplaceRoomsHeated.hoomStatusValue
                    : '',
                numberOfResidents: numberOfResidents ? numberOfResidents : '',
                boilerSettingComfortHeat: boilerSettingComfortHeat ? boilerSettingComfortHeat.hoomStatusValue : '',
                amountGas: amountGas ? amountGas : '',
                amountElectricity: amountElectricity ? amountElectricity : '',
            },
        };
    }

    componentDidMount() {
        HousingFileDetailsAPI.fetchHousingFileSelectionPerType('pitched-roof-heating-selection')
            .then(payload => {
                this.setState({ ...this.state, pitchedRoofHeatingSelection: payload });
            })
            .catch(error => {
                this.setState({ ...this.state, hasError: true });
            });
        HousingFileDetailsAPI.fetchHousingFileSelectionPerType('flat-roof-heating-selection')
            .then(payload => {
                this.setState({ ...this.state, flatRoofHeatingSelection: payload });
            })
            .catch(error => {
                this.setState({ ...this.state, hasError: true });
            });
        HousingFileDetailsAPI.fetchHousingFileSelectionPerType('hr3p-glass-frame-cCurrent-glass-selection')
            .then(payload => {
                this.setState({ ...this.state, hr3pGlassFrameCurrentGlassSelection: payload });
            })
            .catch(error => {
                this.setState({ ...this.state, hasError: true });
            });
        HousingFileDetailsAPI.fetchHousingFileSelectionPerType('glass-in-lead-replace-rooms-heated-selection')
            .then(payload => {
                this.setState({ ...this.state, glassInLeadReplaceRoomsHeatedSelection: payload });
            })
            .catch(error => {
                this.setState({ ...this.state, hasError: true });
            });
        HousingFileDetailsAPI.fetchHousingFileSelectionPerType('boiler-setting-comfort-heat-selection')
            .then(payload => {
                this.setState({ ...this.state, boilerSettingComfortHeatSelection: payload });
            })
            .catch(error => {
                this.setState({ ...this.state, hasError: true });
            });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            housingFile: {
                ...this.state.housingFile,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { housingFile } = this.state;

        HousingFileDetailsAPI.updateHousingFileUse(housingFile).then(() => {
            this.props.fetchHousingFileDetails(housingFile.id);
            this.props.switchToView();
        });
    };

    render() {
        const {
            hasHoomDossierLink,
            pitchedRoofHeating,
            flatRoofHeating,
            hr3pGlassFrameCurrentGlass,
            glassInLeadReplaceRoomsHeated,
            numberOfResidents,
            boilerSettingComfortHeat,
            amountGas,
            amountElectricity,
        } = this.state.housingFile;
        const showFields = this.props.housingFileHoomLinksToShowInEconobis;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    {showFields.some(showField => showField.econobisFieldName === 'pitched_roof_heating') ? (
                        <InputSelect
                            label={'Hellend dak ruimtes verwarming'}
                            size={'col-sm-6'}
                            name="pitchedRoofHeating"
                            value={pitchedRoofHeating}
                            options={this.state.pitchedRoofHeatingSelection}
                            optionValue={'key'}
                            onChangeAction={this.handleInputChange}
                            readOnly={hasHoomDossierLink}
                        />
                    ) : null}
                    {showFields.some(showField => showField.econobisFieldName === 'flat_roof_heating') ? (
                        <InputSelect
                            label={'Platte dak ruimtes verwarming'}
                            size={'col-sm-6'}
                            name="flatRoofHeating"
                            value={flatRoofHeating}
                            options={this.state.flatRoofHeatingSelection}
                            optionValue={'key'}
                            onChangeAction={this.handleInputChange}
                            readOnly={hasHoomDossierLink}
                        />
                    ) : null}
                </div>
                <div className="row">
                    {showFields.some(showField => showField.econobisFieldName === 'hr3p_glass_frame_current_glass') ? (
                        <InputSelect
                            label={'hr3p glaslijst (huidig)'}
                            size={'col-sm-6'}
                            name="hr3pGlassFrameCurrentGlass"
                            value={hr3pGlassFrameCurrentGlass}
                            options={this.state.hr3pGlassFrameCurrentGlassSelection}
                            optionValue={'key'}
                            onChangeAction={this.handleInputChange}
                            readOnly={hasHoomDossierLink}
                        />
                    ) : null}
                    {showFields.some(
                        showField => showField.econobisFieldName === 'glass_in_lead_replace_rooms_heated'
                    ) ? (
                        <InputSelect
                            label={'Kamers verwarmd (met Glas-in-lood ramen)'}
                            size={'col-sm-6'}
                            name="glassInLeadReplaceRoomsHeated"
                            value={glassInLeadReplaceRoomsHeated}
                            options={this.state.glassInLeadReplaceRoomsHeatedSelection}
                            optionValue={'key'}
                            onChangeAction={this.handleInputChange}
                            readOnly={hasHoomDossierLink}
                        />
                    ) : null}
                </div>
                <div className="row">
                    {showFields.some(showField => showField.econobisFieldName === 'number_of_residents') ? (
                        <InputText
                            label={'Aantal bewoners'}
                            name={'numberOfResidents'}
                            value={numberOfResidents}
                            min={0}
                            onChangeAction={this.handleInputChange}
                            readOnly={hasHoomDossierLink}
                        />
                    ) : null}
                    {showFields.some(showField => showField.econobisFieldName === 'boiler_setting_comfort_heat') ? (
                        <InputSelect
                            label={'Stooktemperatuur'}
                            size={'col-sm-6'}
                            name="boilerSettingComfortHeat"
                            value={boilerSettingComfortHeat}
                            options={this.state.boilerSettingComfortHeatSelection}
                            optionValue={'key'}
                            onChangeAction={this.handleInputChange}
                            readOnly={hasHoomDossierLink}
                        />
                    ) : null}
                </div>
                <div className="row">
                    {showFields.some(showField => showField.econobisFieldName === 'amount_gas') ? (
                        <InputText
                            label={'Verbruik gas'}
                            name={'amountGas'}
                            value={amountGas}
                            min={0}
                            onChangeAction={this.handleInputChange}
                            readOnly={hasHoomDossierLink}
                        />
                    ) : null}
                    {showFields.some(showField => showField.econobisFieldName === 'amount_electricity') ? (
                        <InputText
                            label={'Verbruik elektriciteit'}
                            name={'amountElectricity'}
                            value={amountElectricity}
                            min={0}
                            onChangeAction={this.handleInputChange}
                            readOnly={hasHoomDossierLink}
                        />
                    ) : null}
                </div>

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Sluiten'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText buttonText={'Opslaan'} onClickAction={this.handleSubmit} />
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        housingFileDetails: state.housingFileDetails,
        housingFileHoomLinksToShowInEconobis: state.systemData.housingFileHoomLinksToShowInEconobis,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchHousingFileDetails: id => {
        dispatch(fetchHousingFileDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileDetailsFormUseEdit);
