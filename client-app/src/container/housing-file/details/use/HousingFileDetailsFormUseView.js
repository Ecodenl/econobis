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

    const showFields = props.housingFileHoomLinksToShowInEconobis;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                {showFields.some(showField => showField.econobisFieldName === 'pitched_roof_heating') ? (
                    <ViewText
                        label="Hellend dak ruimtes verwarming"
                        value={pitchedRoofHeating && pitchedRoofHeating.hoomStatusName}
                    />
                ) : null}
                {showFields.some(showField => showField.econobisFieldName === 'flat_roof_heating') ? (
                    <ViewText
                        label="Platte dak ruimtes verwarming"
                        value={flatRoofHeating && flatRoofHeating.hoomStatusName}
                    />
                ) : null}
            </div>
            <div className="row">
                {showFields.some(showField => showField.econobisFieldName === 'hr3p_glass_frame_current_glass') ? (
                    <ViewText
                        label="hr3p glaslijst (huidig)"
                        value={hr3pGlassFrameCurrentGlass && hr3pGlassFrameCurrentGlass.hoomStatusName}
                    />
                ) : null}
                {showFields.some(showField => showField.econobisFieldName === 'glass_in_lead_replace_rooms_heated') ? (
                    <ViewText
                        label="Kamers verwarmd (met Glas-in-lood ramen)"
                        value={glassInLeadReplaceRoomsHeated && glassInLeadReplaceRoomsHeated.hoomStatusName}
                    />
                ) : null}
            </div>
            <div className="row">
                {showFields.some(showField => showField.econobisFieldName === 'number_of_residents') ? (
                    <ViewText label="Aantal bewoners" value={numberOfResidents && numberOfResidents} />
                ) : null}
                {showFields.some(showField => showField.econobisFieldName === 'boiler_setting_comfort_heat') ? (
                    <ViewText
                        label="Stooktemperatuur"
                        value={boilerSettingComfortHeat && boilerSettingComfortHeat.hoomStatusName}
                    />
                ) : null}
            </div>
            <div className="row">
                {showFields.some(showField => showField.econobisFieldName === 'amount_gas') ? (
                    <ViewText label="Verbruik gas" value={amountGas && amountGas} />
                ) : null}
                {showFields.some(showField => showField.econobisFieldName === 'amount_electricity') ? (
                    <ViewText label="Verbruik elektriciteit" value={amountElectricity && amountElectricity} />
                ) : null}
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

export default connect(mapStateToProps)(HousingFileDetailsFormUseView);
