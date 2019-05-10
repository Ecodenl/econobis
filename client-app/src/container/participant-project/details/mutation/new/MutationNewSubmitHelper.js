export default function(participantMutation, statusCodeRef) {
    const values = {
        participationId: participantMutation.participationId,
        statusId: participantMutation.statusId,
        typeId: participantMutation.typeId,
    };

    // Form values based on current status
    if (statusCodeRef === 'interest') {
        values.quantityInterest = participantMutation.quantityInterest;
        values.dateInterest = participantMutation.dateInterest;
        values.quantity = participantMutation.quantityInterest;
    }

    if (statusCodeRef === 'option') {
        values.quantityInterest = participantMutation.quantityInterest;
        values.dateInterest = participantMutation.dateInterest;
        values.quantityOption = participantMutation.quantityOption;
        values.dateOption = participantMutation.dateOption;
        values.quantity = participantMutation.quantityOption;
    }

    if (statusCodeRef === 'granted') {
        values.quantityInterest = participantMutation.quantityInterest;
        values.dateInterest = participantMutation.dateInterest;
        values.quantityOption = participantMutation.quantityOption;
        values.dateOption = participantMutation.dateOption;
        values.quantityGranted = participantMutation.quantityGranted;
        values.dateGranted = participantMutation.dateGranted;
        values.quantity = participantMutation.quantityGranted;
    }

    if (statusCodeRef === 'final') {
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
        values.quantity = participantMutation.quantityFinal;
    }

    return values;
}
