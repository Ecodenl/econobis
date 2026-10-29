import React from 'react';
import { useSelector } from 'react-redux';

import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputToggle from '../../../components/form/InputToggle';
import ViewText from '../../../components/form/ViewText';

const ProjectFormDefaultEnergyCommunity = ({
    monitorProvider,
    monitorProviders,
    energyCommunityExternalCode,
    energySharing,
    energySupplierRegistrationRequired,
    hasParticipantsWithoutEnergySupplier = false,
    leadingHousingFileApplication,
    totalParticipationsPowerKwAvailable,
    totalParticipationsPowerKwhConsumption,
    totalParticipationsPowerKwAvailableOther,
    totalParticipationsPowerKwhConsumptionOther,
    showTotals = false,
    handleInputChange,
}) => {
    const housingFileApplications = useSelector(state => state.systemData.housingFileApplications);

    return (
        <React.Fragment>
            <h4>Extra info</h4>

            <div className="row">
                <InputSelect
                    label={'Monitor provider'}
                    name={'monitorProvider'}
                    options={monitorProviders}
                    value={monitorProvider}
                    onChangeAction={handleInputChange}
                />
                <InputText
                    label={'EG code extern'}
                    name={'energyCommunityExternalCode'}
                    value={energyCommunityExternalCode}
                    onChangeAction={handleInputChange}
                />
            </div>

            <div className="row">
                <InputToggle
                    label={'Energiedelen'}
                    name={'energySharing'}
                    value={energySharing}
                    onChangeAction={handleInputChange}
                />
                <InputToggle
                    label={'Registratie energieleverancier verplicht'}
                    name={'energySupplierRegistrationRequired'}
                    value={energySupplierRegistrationRequired}
                    onChangeAction={handleInputChange}
                    disabled={hasParticipantsWithoutEnergySupplier && !energySupplierRegistrationRequired}
                    size={
                        hasParticipantsWithoutEnergySupplier && !energySupplierRegistrationRequired
                            ? 'col-sm-5'
                            : 'col-sm-6'
                    }
                    textToolTip={
                        hasParticipantsWithoutEnergySupplier && !energySupplierRegistrationRequired
                            ? 'Deze instelling kan niet worden ingeschakeld omdat één of meer actieve deelnemers geen actuele elektriciteitsleverancier hebben.'
                            : ''
                    }
                />
            </div>
            <div className="row">
                <InputSelect
                    label={'Leidend woningdossier'}
                    name={'leadingHousingFileApplication'}
                    options={housingFileApplications}
                    placeholder="Geen selectie"
                    value={leadingHousingFileApplication ?? ''}
                    onChangeAction={handleInputChange}
                />
            </div>
            {showTotals ? (
                <>
                    <div className="row">
                        <ViewText
                            label={'Totaal opgesteld vermogen deelnemers'}
                            value={totalParticipationsPowerKwAvailable}
                            className={'form-group col-sm-6'}
                        />
                        <ViewText
                            label={'Totaal verbruik deelnemers'}
                            value={totalParticipationsPowerKwhConsumption}
                            className={'form-group col-sm-6'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Totaal opgesteld vermogen overige statussen'}
                            value={totalParticipationsPowerKwAvailableOther}
                            className={'form-group col-sm-6'}
                        />
                        <ViewText
                            label={'Totaal verbruik overige statussen'}
                            value={totalParticipationsPowerKwhConsumptionOther}
                            className={'form-group col-sm-6'}
                        />
                    </div>
                </>
            ) : null}
        </React.Fragment>
    );
};

export default ProjectFormDefaultEnergyCommunity;
