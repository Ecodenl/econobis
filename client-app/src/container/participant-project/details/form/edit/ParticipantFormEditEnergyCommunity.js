import React from 'react';
import InputText from '../../../../../components/form/InputText';

const ParticipantFormEditEnergyCommunity = ({ powerKwhConsumption, powerKwAvailable, handleInputChange }) => {
    return (
        <div className="row">
            <InputText
                type={'number'}
                label={'Verbruik kWh'}
                name={'powerKwhConsumption'}
                id={'powerKwhConsumption'}
                value={powerKwhConsumption}
                onChangeAction={handleInputChange}
            />
            <InputText
                type={'number'}
                label={'Opwek kWp'}
                name={'powerKwAvailable'}
                id={'powerKwAvailable'}
                value={powerKwAvailable}
                onChangeAction={handleInputChange}
            />
        </div>
    );
};

export default ParticipantFormEditEnergyCommunity;
