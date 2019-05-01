export default function(participation, statusCodeRef) {
    const values = {
        contactId: participation.contactId,
        statusId: participation.statusId,
        projectId: participation.projectId,
    };

    if (statusCodeRef === 'option') {
        values.amountOption = participation.amountOption;
        values.dateOption = participation.dateOption;
    }

    if (statusCodeRef === 'granted') {
        values.amountGranted = participation.amountGranted;
        values.dateGranted = participation.dateGranted;
    }

    if (statusCodeRef === 'final') {
        values.amountFinal = participation.amountFinal;
        values.dateGranted = participation.dateGranted;
        values.dateContractRetour = participation.dateContractRetour;
        values.datePayment = participation.datePayment;
        values.dateEntry = participation.dateEntry;
    }

    return values;
}
