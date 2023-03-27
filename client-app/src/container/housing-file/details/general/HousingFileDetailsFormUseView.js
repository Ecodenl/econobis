import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';

const HousingFileDetailsFormUseView = props => {
    const {
        pitchedRoofHeating,
        flatRoofHeating,
        hr3pGlassFrameCurrentGlass,
        glassInLeadReplaceRoomsHeated,
        numberOfResidents,
        boilerSettingComfortHeat,
        amountGas,
        amountElectricity,
    } = props.housingFileDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText label="Hellend dak ruimtes verwarming" value={pitchedRoofHeating && pitchedRoofHeating} />
                <ViewText label="Platte dak ruimtes verwarming" value={flatRoofHeating && flatRoofHeating} />
            </div>
            <div className="row">
                <ViewText
                    label="hr3p glaslijst (huidig)"
                    value={hr3pGlassFrameCurrentGlass && hr3pGlassFrameCurrentGlass}
                />
                <ViewText
                    label="Kamers verwarmd (met Glas-in-lood ramen)"
                    value={glassInLeadReplaceRoomsHeated && glassInLeadReplaceRoomsHeated}
                />
            </div>
            <div className="row">
                <ViewText label="Aantal bewoners" value={numberOfResidents && numberOfResidents} />
                <ViewText label="Stooktemperatuur" value={boilerSettingComfortHeat && boilerSettingComfortHeat} />
            </div>
            <div className="row">
                <ViewText label="Verbruik gas" value={amountGas && amountGas} />
                <ViewText label="Verbruik electriciteit" value={amountElectricity && amountElectricity} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        housingFileDetails: state.housingFileDetails,
    };
};

export default connect(mapStateToProps)(HousingFileDetailsFormUseView);
