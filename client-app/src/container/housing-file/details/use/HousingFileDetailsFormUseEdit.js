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

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputSelect
                        label={'Hellend dak ruimtes verwarming'}
                        size={'col-sm-6'}
                        name="pitchedRoofHeating"
                        value={pitchedRoofHeating}
                        options={this.props.pitchedRoofHeatingSelection}
                        optionValue={'key'}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                    <InputSelect
                        label={'Platte dak ruimtes verwarming'}
                        size={'col-sm-6'}
                        name="flatRoofHeating"
                        value={flatRoofHeating}
                        options={this.props.flatRoofHeatingSelection}
                        optionValue={'key'}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                </div>
                <div className="row">
                    <InputSelect
                        label={'hr3p glaslijst (huidig)'}
                        size={'col-sm-6'}
                        name="hr3pGlassFrameCurrentGlass"
                        value={hr3pGlassFrameCurrentGlass}
                        options={this.props.hr3pGlassFrameCurrentGlassSelection}
                        optionValue={'key'}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                    <InputSelect
                        label={'Kamers verwarmd (met Glas-in-lood ramen)'}
                        size={'col-sm-6'}
                        name="glassInLeadReplaceRoomsHeated"
                        value={glassInLeadReplaceRoomsHeated}
                        options={this.props.glassInLeadReplaceRoomsHeatedSelection}
                        optionValue={'key'}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                </div>
                <div className="row">
                    <InputText
                        label={'Aantal bewoners'}
                        name={'numberOfResidents'}
                        value={numberOfResidents}
                        min={0}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                    <InputSelect
                        label={'Stooktemperatuur)'}
                        size={'col-sm-6'}
                        name="boilerSettingComfortHeat"
                        value={boilerSettingComfortHeat}
                        options={this.props.boilerSettingComfortHeatSelection}
                        optionValue={'key'}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                </div>
                <div className="row">
                    <InputText
                        label={'Verbruik gas'}
                        name={'amountGas'}
                        value={amountGas}
                        min={0}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                    <InputText
                        label={'Verbruik electriciteit'}
                        name={'amountElectricity'}
                        value={amountElectricity}
                        min={0}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
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
        pitchedRoofHeatingSelection: state.systemData.pitchedRoofHeatingSelection,
        flatRoofHeatingSelection: state.systemData.flatRoofHeatingSelection,
        hr3pGlassFrameCurrentGlassSelection: state.systemData.hr3pGlassFrameCurrentGlassSelection,
        glassInLeadReplaceRoomsHeatedSelection: state.systemData.glassInLeadReplaceRoomsHeatedSelection,
        boilerSettingComfortHeatSelection: state.systemData.boilerSettingComfortHeatSelection,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchHousingFileDetails: id => {
        dispatch(fetchHousingFileDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileDetailsFormUseEdit);
