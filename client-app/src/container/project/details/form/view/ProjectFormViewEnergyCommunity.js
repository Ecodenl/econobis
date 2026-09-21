import React from 'react';
import ViewText from '../../../../../components/form/ViewText';

const ProjectFormViewEnergyCommunity = ({
    monitorProviderWithName,
    energyCommunityExternalCode,
    energySharing,
    energySupplierRegistrationRequired,
    totalParticipationsPowerKwAvailable,
    totalParticipationsPowerKwhConsumption,
}) => {
    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Extra info</h4>

            <div className="row">
                <ViewText
                    label={'Monitor provider'}
                    value={monitorProviderWithName ? monitorProviderWithName.name : ''}
                />
                <ViewText label={'Externe EG-code'} value={energyCommunityExternalCode} />
            </div>

            <div className="row">
                <ViewText label={'Energie delen'} value={energySharing ? 'Ja' : 'Nee'} />
                <ViewText
                    label={'Registratie energieleverancier verplicht'}
                    value={energySupplierRegistrationRequired ? 'Ja' : 'Nee'}
                />
            </div>

            <div className="row">
                <ViewText label={'Totaal opgesteld vermogen deelnemers'} value={totalParticipationsPowerKwAvailable} />
                <ViewText label={'Totaal verbruik deelnemers'} value={totalParticipationsPowerKwhConsumption} />
            </div>
        </React.Fragment>
    );
};

export default ProjectFormViewEnergyCommunity;
