export default function(participantMutation, participantMutationStatuses) {
    const orginalStatusCodeRef = participantMutation.status.codeRef;
    const orginalStatusId = participantMutation.status.id;

    const values = {
        id: participantMutation.id,
        statusId: participantMutation.statusId,
        typeId: participantMutation.typeId,
    };

    // If form is validated set next status
    if (orginalStatusCodeRef === 'interest') {
        values.quantityInterest = participantMutation.quantityInterest;
        values.dateInterest = participantMutation.dateInterest;
        values.statusId = participantMutation.statusId;
        values.quantity = participantMutation.quantityInterest;

        if (orginalStatusId !== Number(participantMutation.statusId)) {
            values.quantityOption = participantMutation.quantityOption;
            values.dateOption = participantMutation.dateOption;
            values.quantity = participantMutation.quantityOption;
        }
    }

    if (orginalStatusCodeRef === 'option') {
        values.quantityInterest = participantMutation.quantityInterest;
        values.dateInterest = participantMutation.dateInterest;
        values.quantityOption = participantMutation.quantityOption;
        values.dateOption = participantMutation.dateOption;
        values.statusId = participantMutation.statusId;
        values.quantity = participantMutation.quantityOption;

        if (orginalStatusId !== Number(participantMutation.statusId)) {
            values.quantityGranted = participantMutation.quantityGranted;
            values.dateGranted = participantMutation.dateGranted;
            values.quantity = participantMutation.quantityGranted;
        }
    }

    if (orginalStatusCodeRef === 'granted') {
        values.quantityInterest = participantMutation.quantityInterest;
        values.dateInterest = participantMutation.dateInterest;
        values.quantityOption = participantMutation.quantityOption;
        values.dateOption = participantMutation.dateOption;
        values.quantityGranted = participantMutation.quantityGranted;
        values.dateGranted = participantMutation.dateGranted;
        values.statusId = participantMutation.statusId;
        values.quantity = participantMutation.quantityGranted;

        if (orginalStatusId !== Number(participantMutation.statusId)) {
            values.quantityFinal = participantMutation.quantityFinal;
            values.dateContractRetour = participantMutation.dateContractRetour;
            values.datePayment = participantMutation.datePayment;
            values.dateEntry = participantMutation.dateEntry;
        }
    }

    if (orginalStatusCodeRef === 'final') {
        values.quantityInterest = participantMutation.quantityInterest;
        values.dateInterest = participantMutation.dateInterest;
        values.quantityOption = participantMutation.quantityOption;
        values.dateOption = participantMutation.dateOption;
        values.quantityGranted = participantMutation.quantityGranted;
        values.quantityFinal = participantMutation.quantityFinal;
        values.dateGranted = participantMutation.dateGranted;
        values.dateContractRetour = participantMutation.dateContractRetour;
        values.datePayment = participantMutation.datePayment;
        values.dateEntry = participantMutation.dateEntry;
        values.statusId = participantMutation.statusId;
        values.quantity = participantMutation.quantityFinal;
    }

    return values;
}
