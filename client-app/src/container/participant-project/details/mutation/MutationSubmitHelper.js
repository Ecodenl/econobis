export default function(participantMutation, participantMutationStatuses) {
    const statusCodeRef = participantMutation.status.codeRef;

    const values = {
        id: participantMutation.id,
        statusId: participantMutation.statusId,
        typeId: participantMutation.typeId,
    };

    // If form is validated set next status
    if (statusCodeRef === 'interest') {
        values.quantityInterest = participantMutation.quantityInterest;
        values.dateInterest = participantMutation.dateInterest;
        values.quantityOption = participantMutation.quantityOption;
        values.dateOption = participantMutation.dateOption;
        values.statusId = participantMutationStatuses.find(
            participantMutationStatus => participantMutationStatus.codeRef === 'option'
        ).id;
        values.quantity = participantMutation.quantityOption;
    }

    if (statusCodeRef === 'option') {
        values.quantityInterest = participantMutation.quantityInterest;
        values.dateInterest = participantMutation.dateInterest;
        values.quantityOption = participantMutation.quantityOption;
        values.dateOption = participantMutation.dateOption;
        values.quantityGranted = participantMutation.quantityGranted;
        values.dateGranted = participantMutation.dateGranted;
        values.statusId = participantMutationStatuses.find(
            participantMutationStatus => participantMutationStatus.codeRef === 'granted'
        ).id;
        values.quantity = participantMutation.quantityGranted;
    }

    if (statusCodeRef === 'granted') {
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
        values.statusId = participantMutationStatuses.find(
            participantMutationStatus => participantMutationStatus.codeRef === 'final'
        ).id;
        values.quantity = participantMutation.quantityFinal;
    }

    return values;
}
