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
import InputTextArea from '../../../../components/form/InputTextArea';

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
            remark,
            remarkCoach,
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
            revenueSolarPanels,
        } = props.housingFileDetails;

        this.state = {
            buildingTypes: [],
            roofTypes: [],
            energyLabels: [],
            energyLabelStatus: [],
            frameTypeSelection: [],
            cookTypeSelection: [],
            heatSourceSelection: [],
            waterComfortSelection: [],
            housingFile: {
                id,
                fullName: address.contact.fullName,
                addressId: address.id,
                fullAddress,
                buildingTypeId: buildingType ? buildingType.id : '',
                buildYear: buildYear ? buildYear : '',
                isHouseForSale: isHouseForSale ? isHouseForSale : '2',
                surface: surface ? surface : '',
                roofTypeId: roofType ? roofType.id : '',
                energyLabelId: energyLabel ? energyLabel.id : '',
                floors: floors ? floors : '',
                energyLabelStatusId: energyLabelStatus ? energyLabelStatus.id : '',
                isMonument: isMonument ? isMonument : '2',
                remark,
                remarkCoach,
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
                revenueSolarPanels: revenueSolarPanels ? revenueSolarPanels : '',
            },
            noYesUnknownOptions: [
                {
                    id: '0',
                    name: 'Nee',
                },
                {
                    id: '1',
                    name: 'Ja',
                },
                {
                    id: '2',
                    name: 'Onbekend',
                },
            ],
        };
    }

    componentDidMount() {
        HousingFileDetailsAPI.fetchHousingFileSelectionPerType('building-types')
            .then(payload => {
                this.setState({ ...this.state, buildingTypes: payload });
            })
            .catch(error => {
                this.setState({ ...this.state, hasError: true });
            });
        HousingFileDetailsAPI.fetchHousingFileSelectionPerType('roof-types')
            .then(payload => {
                this.setState({ ...this.state, roofTypes: payload });
            })
            .catch(error => {
                this.setState({ ...this.state, hasError: true });
            });
        HousingFileDetailsAPI.fetchHousingFileSelectionPerType('energy-labels')
            .then(payload => {
                this.setState({ ...this.state, energyLabels: payload });
            })
            .catch(error => {
                this.setState({ ...this.state, hasError: true });
            });
        HousingFileDetailsAPI.fetchHousingFileSelectionPerType('energy-label-status')
            .then(payload => {
                this.setState({ ...this.state, energyLabelStatus: payload });
            })
            .catch(error => {
                this.setState({ ...this.state, hasError: true });
            });
        HousingFileDetailsAPI.fetchHousingFileSelectionPerType('frame-type-selection')
            .then(payload => {
                this.setState({ ...this.state, frameTypeSelection: payload });
            })
            .catch(error => {
                this.setState({ ...this.state, hasError: true });
            });
        HousingFileDetailsAPI.fetchHousingFileSelectionPerType('cook-type-selection')
            .then(payload => {
                this.setState({ ...this.state, cookTypeSelection: payload });
            })
            .catch(error => {
                this.setState({ ...this.state, hasError: true });
            });
        HousingFileDetailsAPI.fetchHousingFileSelectionPerType('heat-source-selection')
            .then(payload => {
                this.setState({ ...this.state, heatSourceSelection: payload });
            })
            .catch(error => {
                this.setState({ ...this.state, hasError: true });
            });
        HousingFileDetailsAPI.fetchHousingFileSelectionPerType('water-comfort-selection')
            .then(payload => {
                this.setState({ ...this.state, waterComfortSelection: payload });
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
            remark,
            remarkCoach,
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
            revenueSolarPanels,
        } = this.state.housingFile;
        const showFields = this.props.housingFileHoomLinksToShowInEconobis;
        const importsFromHoom = this.props.housingFileHoomLinksToImportFromHoom;

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
                    {showFields.some(showField => showField.econobisFieldName === 'building_type_id') ? (
                        <InputSelect
                            label={'Woningtype'}
                            size={'col-sm-6'}
                            name="buildingTypeId"
                            value={buildingTypeId}
                            options={this.state.buildingTypes}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'building_type_id'
                                )
                            }
                        />
                    ) : null}

                    {showFields.some(showField => showField.econobisFieldName === 'build_year') ? (
                        <InputText
                            label={'Bouwjaar'}
                            name={'buildYear'}
                            value={buildYear}
                            min={1000}
                            max={3000}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'build_year'
                                )
                            }
                        />
                    ) : null}
                </div>

                <div className="row">
                    {showFields.some(showField => showField.econobisFieldName === 'surface') ? (
                        <InputText
                            label={'Gebruiksoppervlakte'}
                            name="surface"
                            value={surface}
                            min={0}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(importFromHoom => importFromHoom.econobisFieldName === 'surface')
                            }
                        />
                    ) : null}
                    {showFields.some(showField => showField.econobisFieldName === 'roof_type_id') ? (
                        <InputSelect
                            label={'Daktype'}
                            size={'col-sm-6'}
                            name="roofTypeId"
                            value={roofTypeId}
                            options={this.state.roofTypes}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'roof_type_id'
                                )
                            }
                        />
                    ) : null}
                </div>

                <div className="row">
                    {showFields.some(showField => showField.econobisFieldName === 'energy_label_id') ? (
                        <InputSelect
                            label={'Energielabel'}
                            size={'col-sm-6'}
                            name="energyLabelId"
                            value={energyLabelId}
                            options={this.state.energyLabels}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'energy_label_id'
                                )
                            }
                        />
                    ) : null}
                    {showFields.some(showField => showField.econobisFieldName === 'floors') ? (
                        <InputText
                            label={'Aantal bouwlagen'}
                            name={'floors'}
                            value={floors}
                            min={0}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(importFromHoom => importFromHoom.econobisFieldName === 'floors')
                            }
                        />
                    ) : null}
                </div>

                <div className="row">
                    {showFields.some(showField => showField.econobisFieldName === 'energy_label_status_id') ? (
                        <InputSelect
                            label={'Status energielabel'}
                            size={'col-sm-6'}
                            name="energyLabelStatusId"
                            value={energyLabelStatusId}
                            options={this.state.energyLabelStatus}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'energy_label_status_id'
                                )
                            }
                        />
                    ) : null}
                    {showFields.some(showField => showField.econobisFieldName === 'is_monument') ? (
                        <InputSelect
                            label={'Monument'}
                            name={'isMonument'}
                            value={isMonument}
                            options={this.state.noYesUnknownOptions}
                            emptyOption={false}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'is_monument'
                                )
                            }
                        />
                    ) : null}
                </div>

                <div className="row">
                    <ViewText
                        className={'form-group col-md-6'}
                        label="Hoom building Id"
                        value={hoomBuildingId && hoomBuildingId}
                    />
                    {showFields.some(showField => showField.econobisFieldName === 'is_house_for_sale') ? (
                        <InputSelect
                            label={'Koophuis'}
                            name={'isHouseForSale'}
                            value={isHouseForSale}
                            options={this.state.noYesUnknownOptions}
                            emptyOption={false}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'is_house_for_sale'
                                )
                            }
                        />
                    ) : null}
                </div>
                <div className="row">
                    {showFields.some(showField => showField.econobisFieldName === 'wall_surface') ? (
                        <InputText
                            label={'Geveloppervlakte'}
                            name="wallSurface"
                            value={wallSurface}
                            min={0}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'wall_surface'
                                )
                            }
                        />
                    ) : null}
                    {showFields.some(showField => showField.econobisFieldName === 'total_window_surface') ? (
                        <InputText
                            label={'Raamoppervlakte'}
                            name="totalWindowSurface"
                            value={totalWindowSurface}
                            min={0}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'total_window_surface'
                                )
                            }
                        />
                    ) : null}
                </div>
                <div className="row">
                    {showFields.some(showField => showField.econobisFieldName === 'floor_surface') ? (
                        <InputText
                            label={'Vloeroppervlakte'}
                            name="floorSurface"
                            value={floorSurface}
                            min={0}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'floor_surface'
                                )
                            }
                        />
                    ) : null}
                    {showFields.some(showField => showField.econobisFieldName === 'revenue_solar_panels') ? (
                        <InputText
                            label={'Opbrengst zonnepanelen'}
                            name="revenueSolarPanels"
                            value={revenueSolarPanels}
                            min={0}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'revenue_solar_panels'
                                )
                            }
                        />
                    ) : null}
                </div>
                <div className="row">
                    {showFields.some(showField => showField.econobisFieldName === 'cook_type') ? (
                        <InputSelect
                            label={'Manier koken'}
                            size={'col-sm-6'}
                            name="cookType"
                            value={cookType}
                            options={this.state.cookTypeSelection}
                            optionValue={'key'}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(importFromHoom => importFromHoom.econobisFieldName === 'cook_type')
                            }
                        />
                    ) : null}
                    {showFields.some(showField => showField.econobisFieldName === 'heat_source') ? (
                        <InputSelect
                            label={'Verwarming'}
                            size={'col-sm-6'}
                            name="heatSource"
                            value={heatSource}
                            options={this.state.heatSourceSelection}
                            optionValue={'key'}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'heat_source'
                                )
                            }
                        />
                    ) : null}
                </div>
                <div className="row">
                    {showFields.some(showField => showField.econobisFieldName === 'water_comfort') ? (
                        <InputSelect
                            label={'Water comfort'}
                            size={'col-sm-6'}
                            name="waterComfort"
                            value={waterComfort}
                            options={this.state.waterComfortSelection}
                            optionValue={'key'}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'water_comfort'
                                )
                            }
                        />
                    ) : null}
                    {showFields.some(showField => showField.econobisFieldName === 'frame_type') ? (
                        <InputSelect
                            label={'Kozijntype'}
                            size={'col-sm-6'}
                            name="frameType"
                            value={frameType}
                            options={this.state.frameTypeSelection}
                            optionValue={'key'}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'frame_type'
                                )
                            }
                        />
                    ) : null}
                </div>
                <div className="row">
                    {showFields.some(showField => showField.econobisFieldName === 'pitched_roof_surface') ? (
                        <InputText
                            label={'Hellend dakoppervlakte'}
                            name="pitchedRoofSurface"
                            value={pitchedRoofSurface}
                            min={0}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'pitched_roof_surface'
                                )
                            }
                        />
                    ) : null}
                    {showFields.some(showField => showField.econobisFieldName === 'flat_roof_surface') ? (
                        <InputText
                            label={'Platte dakoppervlakte'}
                            name="flatRoofSurface"
                            value={flatRoofSurface}
                            min={0}
                            onChangeAction={this.handleInputChange}
                            readOnly={
                                hasHoomDossierLink &&
                                importsFromHoom.some(
                                    importFromHoom => importFromHoom.econobisFieldName === 'flat_roof_surface'
                                )
                            }
                        />
                    ) : null}
                </div>
                <div className="row">
                    <InputTextArea
                        label={'Opmerking bewoner'}
                        name="remark"
                        value={remark}
                        onChangeAction={this.handleInputChange}
                        disabled={hasHoomDossierLink}
                    />
                </div>
                <div className="row">
                    <InputTextArea
                        label={'Opmerking coach'}
                        name="remarkCoach"
                        value={remarkCoach}
                        onChangeAction={this.handleInputChange}
                        disabled={hasHoomDossierLink}
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
        contactDetails: state.contactDetails,
        housingFileHoomLinksToShowInEconobis: state.systemData.housingFileHoomLinksToShowInEconobis,
        housingFileHoomLinksToImportFromHoom: state.systemData.housingFileHoomLinksToImportFromHoom,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchHousingFileDetails: id => {
        dispatch(fetchHousingFileDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileDetailsFormGeneralEdit);
