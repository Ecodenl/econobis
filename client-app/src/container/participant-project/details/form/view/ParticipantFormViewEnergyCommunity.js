import React from 'react';
import ViewText from '../../../../../components/form/ViewText';

const ParticipantFormViewEnergyCommunity = ({ powerKwhConsumption, powerKwAvailable }) => {
    return (
        <div className="row">
            <ViewText label={'Verbruik kWh'} value={powerKwhConsumption} />
            <ViewText label={'Opwek kWp'} value={powerKwAvailable} />
        </div>
    );
};

export default ParticipantFormViewEnergyCommunity;
