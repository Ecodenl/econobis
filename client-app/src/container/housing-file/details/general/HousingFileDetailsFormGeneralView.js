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
        numberOfResidents,
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
                <ViewText label="Aantal bewoners" value={numberOfResidents && numberOfResidents} />
                <ViewText label="Koophuis" value={isHouseForSale ? 'Ja' : 'Nee'} />
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
