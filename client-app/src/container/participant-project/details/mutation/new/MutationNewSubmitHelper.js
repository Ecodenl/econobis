export default function(participantMutation, statusCodeRef, typeCodeRef, projectTypeCodeRef) {
    const values = {
        participationId: participantMutation.participationId,
        statusId: participantMutation.statusId,
        typeId: participantMutation.typeId,
    };

    // Buying en nu ook with drawal, todo later hier ook nog sell toevoegen?
    // if (typeCodeRef === 'first_deposit' || typeCodeRef === 'deposit' || typeCodeRef === 'withDrawal') {
    // Form values based on current status
    if (statusCodeRef === 'interest') {
        values.dateInterest = participantMutation.dateInterest;
        if (projectTypeCodeRef === 'loan') {
            values.amountInterest = participantMutation.amountInterest;
            values.amount = participantMutation.amountInterest;
        } else {
            values.quantityInterest = participantMutation.quantityInterest;
            values.quantity = participantMutation.quantityInterest;
        }
    }

    if (statusCodeRef === 'option') {
        values.dateOption = participantMutation.dateOption;
        if (projectTypeCodeRef === 'loan') {
            values.amountOption = participantMutation.amountOption;
            values.amount = participantMutation.amountOption;
        } else {
            values.quantityOption = participantMutation.quantityOption;
            values.quantity = participantMutation.quantityOption;
        }
    }

    if (statusCodeRef === 'granted') {
        values.dateGranted = participantMutation.dateGranted;
        if (projectTypeCodeRef === 'loan') {
            values.amountGranted = participantMutation.amountGranted;
            values.amount = participantMutation.amountGranted;
        } else {
            values.quantityGranted = participantMutation.quantityGranted;
            values.quantity = participantMutation.quantityGranted;
        }
    }

    if (statusCodeRef === 'final') {
        values.dateGranted = participantMutation.dateGranted;
        // todo is betaaldatum niet selling specifiek?
        values.datePayment = participantMutation.datePayment;
        values.dateEntry = participantMutation.dateEntry;
        if (projectTypeCodeRef === 'loan') {
            values.amountFinal = participantMutation.amountFinal;
            values.amount = participantMutation.amountFinal;
        } else {
            values.quantityFinal = participantMutation.quantityFinal;
            values.quantity = participantMutation.quantityFinal;
        }

        // buying specifiek
        if (typeCodeRef === 'first_deposit' || typeCodeRef === 'deposit' || typeCodeRef === 'withDrawal') {
            values.dateContractRetour = participantMutation.dateContractRetour;
        }
        // }
    }

    return values;
}
