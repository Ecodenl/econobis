export default function(participation, statusCodeRef) {
    const values = {
        contactId: participation.contactId,
        statusId: participation.statusId,
        projectId: participation.projectId,
    };

    if (statusCodeRef === 'interest') {
        values.quantityInterest = participation.quantityInterest;
        values.dateInterest = participation.dateInterest;
    }

    if (statusCodeRef === 'option') {
        values.quantityOption = participation.quantityOption;
        values.dateOption = participation.dateOption;
    }

    if (statusCodeRef === 'granted') {
        values.quantityGranted = participation.quantityGranted;
        values.dateGranted = participation.dateGranted;
    }

    if (statusCodeRef === 'final') {
        values.quantityFinal = participation.quantityFinal;
        values.dateGranted = participation.dateGranted;
        values.dateContractRetour = participation.dateContractRetour;
        values.datePayment = participation.datePayment;
        values.dateEntry = participation.dateEntry;
    }

    return values;
}
