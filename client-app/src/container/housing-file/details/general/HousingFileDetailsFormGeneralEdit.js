import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import HousingFileDetailsAPI from '../../../../api/housing-file/HousingFileDetailsAPI';
import { fetchHousingFileDetails } from '../../../../actions/housing-file/HousingFileDetailsActions';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import InputToggle from '../../../../components/form/InputToggle';
import ViewText from '../../../../components/form/ViewText';

class HousingFileDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            address,
            fullAddress,
            buildingType,
            buildYear,
            isHouseForSale,
            surface,
            roofType,
            energyLabel,
            floors,
            energyLabelStatus,
            isMonument,
            hoomBuildingId,
            wallSurface,
            totalWindowSurface,
            frameType,
            floorSurface,
            pitchedRoofSurface,
            flatRoofSurface,
            cookType,
            heatSource,
            waterComfort,
        } = props.housingFileDetails;
        console.log(hoomBuildingId);

        this.state = {
            housingFile: {
                id,
                fullName: address.contact.fullName,
                addressId: address.id,
                fullAddress,
                buildingTypeId: buildingType ? buildingType.id : '',
                buildYear: buildYear ? buildYear : '',
                isHouseForSale: isHouseForSale ? isHouseForSale : true,
                surface: surface ? surface : '',
                roofTypeId: roofType ? roofType.id : '',
                energyLabelId: energyLabel ? energyLabel.id : '',
                floors: floors ? floors : '',
                energyLabelStatusId: energyLabelStatus ? energyLabelStatus.id : '',
                isMonument: isMonument ? isMonument : false,
                hoomBuildingId: hoomBuildingId ? hoomBuildingId : null,
                hasHoomDossierLink: hoomBuildingId != null ? true : false,
                wallSurface: wallSurface ? wallSurface : '',
                totalWindowSurface: totalWindowSurface ? totalWindowSurface : '',
                frameType: frameType ? frameType.hoomStatusValue : '',
                floorSurface: floorSurface ? floorSurface : '',
                pitchedRoofSurface: pitchedRoofSurface ? pitchedRoofSurface : '',
                flatRoofSurface: flatRoofSurface ? flatRoofSurface : '',
                cookType: cookType ? cookType.hoomStatusValue : '',
                heatSource: heatSource ? heatSource.hoomStatusValue : '',
                waterComfort: waterComfort ? waterComfort.hoomStatusValue : '',
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

        HousingFileDetailsAPI.updateHousingFile(housingFile).then(() => {
            this.props.fetchHousingFileDetails(housingFile.id);
            this.props.switchToView();
        });
    };

    render() {
        const {
            fullAddress,
            fullName,
            hasHoomDossierLink,
            buildingTypeId,
            buildYear,
            isHouseForSale,
            surface,
            roofTypeId,
            energyLabelId,
            floors,
            energyLabelStatusId,
            isMonument,
            hoomBuildingId,
            wallSurface,
            totalWindowSurface,
            frameType,
            floorSurface,
            pitchedRoofSurface,
            flatRoofSurface,
            cookType,
            heatSource,
            waterComfort,
        } = this.state.housingFile;
        const { addresses = [] } = this.props.contactDetails;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={'Contact'}
                        name={'fullName'}
                        value={fullName}
                        onChangeAction={() => {}}
                        readOnly={true}
                    />

                    <InputText
                        label={'Adres'}
                        name={'fullAddress'}
                        value={fullAddress}
                        onChangeAction={() => {}}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Woningtype'}
                        size={'col-sm-6'}
                        name="buildingTypeId"
                        value={buildingTypeId}
                        options={this.props.buildingTypes}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                    <InputText
                        label={'Bouwjaar'}
                        name={'buildYear'}
                        value={buildYear}
                        min={1500}
                        max={3000}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Gebruiksoppervlakte'}
                        name="surface"
                        value={surface}
                        min={0}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                    <InputSelect
                        label={'Daktype'}
                        size={'col-sm-6'}
                        name="roofTypeId"
                        value={roofTypeId}
                        options={this.props.roofTypes}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Energielabel'}
                        size={'col-sm-6'}
                        name="energyLabelId"
                        value={energyLabelId}
                        options={this.props.energyLabels}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                    <InputText
                        label={'Aantal bouwlagen'}
                        name={'floors'}
                        value={floors}
                        min={0}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Status energielabel'}
                        size={'col-sm-6'}
                        name="energyLabelStatusId"
                        value={energyLabelStatusId}
                        options={this.props.energyLabelStatus}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputToggle
                        label={'Monument'}
                        name={'isMonument'}
                        value={isMonument}
                        onChangeAction={this.handleInputChange}
                        disabled={hasHoomDossierLink}
                    />
                </div>

                <div className="row">
                    <ViewText
                        className={'form-group col-md-6'}
                        label="Hoom building Id"
                        value={hoomBuildingId && hoomBuildingId}
                    />
                    <InputToggle
                        label={'Koophuis'}
                        name={'isHouseForSale'}
                        value={isHouseForSale}
                        onChangeAction={this.handleInputChange}
                        disabled={hasHoomDossierLink}
                    />
                </div>
                <div className="row">
                    <InputText
                        label={'Geveloppervlakte'}
                        name="wallSurface"
                        value={wallSurface}
                        min={0}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                    <InputText
                        label={'Raamoppervlakte'}
                        name="totalWindowSurface"
                        value={totalWindowSurface}
                        min={0}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                </div>
                <div className="row">
                    <InputSelect
                        label={'Kozijntype'}
                        size={'col-sm-6'}
                        name="frameType"
                        value={frameType}
                        options={this.props.frameTypeSelection}
                        optionValue={'key'}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                    <InputText
                        label={'Vloeroppervlakte'}
                        name="floorSurface"
                        value={floorSurface}
                        min={0}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                </div>
                <div className="row">
                    <InputText
                        label={'Hellend dakoppervlakte'}
                        name="pitchedRoofSurface"
                        value={pitchedRoofSurface}
                        min={0}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                    <InputText
                        label={'Platte dakoppervlakte'}
                        name="flatRoofSurface"
                        value={flatRoofSurface}
                        min={0}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                </div>
                <div className="row">
                    <InputSelect
                        label={'Manier koken'}
                        size={'col-sm-6'}
                        name="cookType"
                        value={cookType}
                        options={this.props.cookTypeSelection}
                        optionValue={'key'}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                    <InputSelect
                        label={'Verwarming'}
                        size={'col-sm-6'}
                        name="heatSource"
                        value={heatSource}
                        options={this.props.heatSourceSelection}
                        optionValue={'key'}
                        onChangeAction={this.handleInputChange}
                        readOnly={hasHoomDossierLink}
                    />
                </div>
                <div className="row">
                    <InputSelect
                        label={'Water comfort'}
                        size={'col-sm-6'}
                        name="waterComfort"
                        value={waterComfort}
                        options={this.props.waterComfortSelection}
                        optionValue={'key'}
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
        buildingTypes: state.systemData.buildingTypes,
        roofTypes: state.systemData.roofTypes,
        energyLabels: state.systemData.energyLabels,
        energyLabelStatus: state.systemData.energyLabelStatus,
        frameTypeSelection: state.systemData.frameTypeSelection,
        cookTypeSelection: state.systemData.cookTypeSelection,
        heatSourceSelection: state.systemData.heatSourceSelection,
        waterComfortSelection: state.systemData.waterComfortSelection,
        contactDetails: state.contactDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchHousingFileDetails: id => {
        dispatch(fetchHousingFileDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileDetailsFormGeneralEdit);
