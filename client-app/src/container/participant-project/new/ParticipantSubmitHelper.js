export default function(participation, statusCodeRef, projectTypeCodeRef) {
    const values = {
        contactId: participation.contactId,
        statusId: participation.statusId,
        projectId: participation.projectId,
    };

    switch (statusCodeRef) {
        case 'interest':
            values.dateInterest = participation.dateInterest;
            if (projectTypeCodeRef === 'loan') {
                values.amountInterest = participation.amountInterest;
            } else {
                values.quantityInterest = participation.quantityInterest;
            }
            break;
        case 'option':
            values.dateOption = participation.dateOption;
            if (projectTypeCodeRef === 'loan') {
                values.amountOption = participation.amountOption;
            } else {
                values.quantityOption = participation.quantityOption;
            }
            break;
        case 'granted':
            values.dateGranted = participation.dateGranted;
            if (projectTypeCodeRef === 'loan') {
                values.amountGranted = participation.amountGranted;
            } else {
                values.quantityGranted = participation.quantityGranted;
            }
            break;
        case 'final':
            values.dateGranted = participation.dateGranted;
            values.dateContractRetour = participation.dateContractRetour;
            values.datePayment = participation.datePayment;
            values.dateEntry = participation.dateEntry;
            if (projectTypeCodeRef === 'loan') {
                values.amountFinal = participation.amountFinal;
            } else {
                values.quantityFinal = participation.quantityFinal;
            }
            break;
        default:
            break;
    }

    return values;
}
