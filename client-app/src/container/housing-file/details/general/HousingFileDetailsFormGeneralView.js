import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';

const HousingFileDetailsFormGeneralView = props => {
    const {
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

    const showFields = props.housingFileHoomLinksToShowInEconobis;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={'Contact'}
                    value={address && address.contact.fullName}
                    link={address ? '/contact/' + address.contact.id : ''}
                />
                <ViewText label={'Adres'} value={fullAddress && fullAddress} />
            </div>
            <div className="row">
                {showFields.some(showField => showField.econobisFieldName === 'building_type_id') ? (
                    <ViewText label="Woningtype" value={buildingType && buildingType.name} />
                ) : null}
                {showFields.some(showField => showField.econobisFieldName === 'build_year') ? (
                    <ViewText label="Bouwjaar" value={buildYear && buildYear} />
                ) : null}
            </div>
            <div className="row">
                {showFields.some(showField => showField.econobisFieldName === 'surface') ? (
                    <ViewText label="Gebruiksoppervlakte" value={surface && surface} />
                ) : null}
                {showFields.some(showField => showField.econobisFieldName === 'roof_type_id') ? (
                    <ViewText label="Daktype" value={roofType && roofType.name} />
                ) : null}
            </div>
            <div className="row">
                {showFields.some(showField => showField.econobisFieldName === 'energy_label_id') ? (
                    <ViewText label="Energielabel" value={energyLabel && energyLabel.name} />
                ) : null}
                {showFields.some(showField => showField.econobisFieldName === 'floors') ? (
                    <ViewText label="Aantal bouwlagen" value={floors && floors} />
                ) : null}
            </div>
            <div className="row">
                {showFields.some(showField => showField.econobisFieldName === 'energy_label_status_id') ? (
                    <ViewText label="Status energielabel" value={energyLabelStatus && energyLabelStatus.name} />
                ) : null}
                {showFields.some(showField => showField.econobisFieldName === 'is_monument') ? (
                    <ViewText
                        label="Monument"
                        value={isMonument === '0' ? 'Nee' : isMonument === '1' ? 'Ja' : 'Onbekend'}
                    />
                ) : null}
            </div>
            <div className="row">
                <ViewText label="Hoom building Id" value={hoomBuildingId && hoomBuildingId} />
                {showFields.some(showField => showField.econobisFieldName === 'is_house_for_sale') ? (
                    <ViewText
                        label="Koophuis"
                        value={isHouseForSale === '0' ? 'Nee' : isHouseForSale === '1' ? 'Ja' : 'Onbekend'}
                    />
                ) : null}
            </div>
            <div className="row">
                {showFields.some(showField => showField.econobisFieldName === 'wall_surface') ? (
                    <ViewText label="Geveloppervlakte" value={wallSurface && wallSurface} />
                ) : null}
                {showFields.some(showField => showField.econobisFieldName === 'total_window_surface') ? (
                    <ViewText label="Raamoppervlakte" value={totalWindowSurface && totalWindowSurface} />
                ) : null}
            </div>
            <div className="row">
                {showFields.some(showField => showField.econobisFieldName === 'floor_surface') ? (
                    <ViewText label="Vloeroppervlakte" value={floorSurface && floorSurface} />
                ) : null}
                {showFields.some(showField => showField.econobisFieldName === 'revenue_solar_panels') ? (
                    <ViewText label="Opbrengst zonnepanelen" value={revenueSolarPanels && revenueSolarPanels} />
                ) : null}
            </div>
            <div className="row">
                {showFields.some(showField => showField.econobisFieldName === 'cook_type') ? (
                    <ViewText label="Manier koken" value={cookType && cookType.hoomStatusName} />
                ) : null}
                {showFields.some(showField => showField.econobisFieldName === 'heat_source') ? (
                    <ViewText label="Verwarming" value={heatSource && heatSource.hoomStatusName} />
                ) : null}
            </div>
            <div className="row">
                {showFields.some(showField => showField.econobisFieldName === 'water_comfort') ? (
                    <ViewText label="Water comfort" value={waterComfort && waterComfort.hoomStatusName} />
                ) : null}
                {showFields.some(showField => showField.econobisFieldName === 'frame_type') ? (
                    <ViewText label="Kozijntype" value={frameType && frameType.hoomStatusName} />
                ) : null}
            </div>
            <div className="row">
                {showFields.some(showField => showField.econobisFieldName === 'pitched_roof_surface') ? (
                    <ViewText label="Hellend dakoppervlakte" value={pitchedRoofSurface && pitchedRoofSurface} />
                ) : null}
                {showFields.some(showField => showField.econobisFieldName === 'flat_roof_surface') ? (
                    <ViewText label="Platte dakoppervlakte" value={flatRoofSurface && flatRoofSurface} />
                ) : null}
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <label htmlFor="remark" className="col-sm-12">
                        Opmerkingen bewoner
                    </label>
                </div>
                <div className="col-sm-9" id="remark">
                    {remark}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <label htmlFor="remarkCoach" className="col-sm-12">
                        Opmerkingen coach
                    </label>
                </div>
                <div className="col-sm-9" id="remarkCoach">
                    {remarkCoach}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        housingFileDetails: state.housingFileDetails,
        housingFileHoomLinksToShowInEconobis: state.systemData.housingFileHoomLinksToShowInEconobis,
    };
};

export default connect(mapStateToProps)(HousingFileDetailsFormGeneralView);
