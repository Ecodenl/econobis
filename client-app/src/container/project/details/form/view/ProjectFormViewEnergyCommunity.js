import React from 'react';
import { useSelector } from 'react-redux';
import ViewText from '../../../../../components/form/ViewText';

const ProjectFormViewEnergyCommunity = ({
    monitorProviderWithName,
    energyCommunityExternalCode,
    energySharing,
    energySupplierRegistrationRequired,
    leadingHousingFileApplication,
    totalParticipationsPowerKwAvailable,
    totalParticipationsPowerKwhConsumption,
}) => {
    const housingFileApplications = useSelector(state => state.systemData.housingFileApplications);

    const leadingHousingFileApplicationName =
        housingFileApplications?.find(application => application.id === leadingHousingFileApplication)?.name || '';

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
                <ViewText label={'Leidend woningdossier'} value={leadingHousingFileApplicationName} />
            </div>

            <div className="row">
                <ViewText label={'Totaal opgesteld vermogen deelnemers'} value={totalParticipationsPowerKwAvailable} />
                <ViewText label={'Totaal verbruik deelnemers'} value={totalParticipationsPowerKwhConsumption} />
            </div>
        </React.Fragment>
    );
};

export default ProjectFormViewEnergyCommunity;
