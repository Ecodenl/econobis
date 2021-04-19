export default (baseProjectCodeRef, powerKwAvailable) => {
    /* Benodigd aantal deelnemers: is opgesteld vermogen delen door Deelnemers per kWp van soort project
        zonne-energieprojecten: Minimaal één deelnemer per 5 kWp vermogen;
        windprojecten: minimaal één deelnemer per 2 kWp vermogen;
        waterkracht: mimimaal één deelnemer per 1 kWp vermogen; */

    let requiredParticipations = 0;

    switch (baseProjectCodeRef) {
        case 'solar-energy':
            requiredParticipations = Math.ceil(powerKwAvailable / 5);
            break;
        case 'wind':
            requiredParticipations = Math.ceil(powerKwAvailable / 2);
            break;
        case 'hydropower':
            requiredParticipations = Math.ceil(powerKwAvailable);
            break;
    }

    return requiredParticipations;
};
