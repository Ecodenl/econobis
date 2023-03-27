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
        hoomBuildingId,
        wallSurface,
        totalWindowSurface,
        frameType,
        floorSurface,
        pitchedRoofSurface,
        flatRoofSurface,
        cookRype,
        heatSource,
        waterComfort,
    } = props.housingFileDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={'Contact'}
                    value={address && address.contact.fullName}
                    link={address ? 'contact/' + address.contact.id : ''}
                />
                <ViewText label={'Adres'} value={fullAddress && fullAddress} />
            </div>
            <div className="row">
                <ViewText label="Woningtype" value={buildingType && buildingType.name} />
                <ViewText label="Bouwjaar" value={buildYear && buildYear} />
            </div>
            <div className="row">
                <ViewText label="Gebruiksoppervlakte" value={surface && surface} />
                <ViewText label="Daktype" value={roofType && roofType.name} />
            </div>
            <div className="row">
                <ViewText label="Energielabel" value={energyLabel && energyLabel.name} />
                <ViewText label="Aantal bouwlagen" value={floors && floors} />
            </div>
            <div className="row">
                <ViewText label="Status energielabel" value={energyLabelStatus && energyLabelStatus.name} />
                <ViewText label="Monument" value={isMonument ? 'Ja' : 'Nee'} />
            </div>
            <div className="row">
                <ViewText label="Hoom building Id" value={hoomBuildingId && hoomBuildingId} />
                <ViewText label="Koophuis" value={isHouseForSale ? 'Ja' : 'Nee'} />
            </div>
            <div className="row">
                <ViewText label="Geveloppervlakte" value={wallSurface && wallSurface} />
                <ViewText label="Raamoppervlakte" value={totalWindowSurface && totalWindowSurface} />
            </div>
            <div className="row">
                <ViewText label="Kozijntype" value={frameType && frameType} />
                <ViewText label="Vloeroppervlakte" value={floorSurface && floorSurface} />
            </div>
            <div className="row">
                <ViewText label="Hellend dakoppervlakte" value={pitchedRoofSurface && pitchedRoofSurface} />
                <ViewText label="Platte dakoppervlakte" value={flatRoofSurface && flatRoofSurface} />
            </div>
            <div className="row">
                <ViewText label="Manier koken" value={cookRype && cookRype} />
                <ViewText label="Verwarming" value={heatSource && heatSource} />
            </div>
            <div className="row">
                <ViewText label="Water comfort" value={waterComfort && waterComfort} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        housingFileDetails: state.housingFileDetails,
    };
};

export default connect(mapStateToProps)(HousingFileDetailsFormGeneralView);
