export default function(participation, statusCodeRef, projectTypeCodeRef) {
    const values = {
        contactId: participation.contactId,
        addressId: participation.addressId,
        statusId: participation.statusId,
        projectId: participation.projectId,
    };

    switch (statusCodeRef) {
        case 'interest':
            values.dateInterest = participation.dateInterest;
            if (projectTypeCodeRef === 'loan') {
                values.amountInterest = participation.amountInterest;
            } else if (projectTypeCodeRef !== 'energy_community') {
                values.quantityInterest = participation.quantityInterest;
            }
            break;
        case 'option':
            values.dateOption = participation.dateOption;
            if (projectTypeCodeRef === 'loan') {
                values.amountOption = participation.amountOption;
            } else if (projectTypeCodeRef !== 'energy_community') {
                values.quantityOption = participation.quantityOption;
            }
            break;
        case 'granted':
            values.dateGranted = participation.dateGranted;
            if (projectTypeCodeRef === 'loan') {
                values.amountGranted = participation.amountGranted;
            } else if (projectTypeCodeRef !== 'energy_community') {
                values.quantityGranted = participation.quantityGranted;
            }
            break;
        case 'final':
            values.dateGranted = participation.dateGranted;
            values.dateEntry = participation.dateEntry;

            if (projectTypeCodeRef === 'loan') {
                values.amountFinal = participation.amountFinal;
            } else if (projectTypeCodeRef !== 'energy_community') {
                values.quantityFinal = participation.quantityFinal;
            }

            if (projectTypeCodeRef !== 'energy_community') {
                values.dateContractRetour = participation.dateContractRetour;
                values.datePayment = participation.datePayment;
                values.paymentReference = participation.paymentReference;
            }
            break;
        default:
            break;
    }

    return values;
}
