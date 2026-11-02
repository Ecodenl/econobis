export default function(participantMutation, statusCodeRef, typeCodeRef, projectTypeCodeRef) {
    const values = {
        participationId: participantMutation.participationId,
        statusId: participantMutation.statusId,
        typeId: participantMutation.typeId,
        differentTransactionCostsAmount: participantMutation.differentTransactionCostsAmount,
    };

    // Form values based on current status
    if (statusCodeRef === 'interest') {
        values.dateInterest = participantMutation.dateInterest;
        if (projectTypeCodeRef === 'loan') {
            values.amountInterest = participantMutation.amountInterest;
            values.amount = participantMutation.amountInterest;
        } else if (projectTypeCodeRef !== 'energy_community') {
            values.quantityInterest = participantMutation.quantityInterest;
            values.quantity = participantMutation.quantityInterest;
        }
    }

    if (statusCodeRef === 'option') {
        values.dateOption = participantMutation.dateOption;
        if (projectTypeCodeRef === 'loan') {
            values.amountOption = participantMutation.amountOption;
            values.amount = participantMutation.amountOption;
        } else if (projectTypeCodeRef !== 'energy_community') {
            values.quantityOption = participantMutation.quantityOption;
            values.quantity = participantMutation.quantityOption;
        }
    }

    if (statusCodeRef === 'granted') {
        values.dateGranted = participantMutation.dateGranted;
        if (projectTypeCodeRef === 'loan') {
            values.amountGranted = participantMutation.amountGranted;
            values.amount = participantMutation.amountGranted;
        } else if (projectTypeCodeRef !== 'energy_community') {
            values.quantityGranted = participantMutation.quantityGranted;
            values.quantity = participantMutation.quantityGranted;
        }
    }

    if (statusCodeRef === 'final') {
        values.dateGranted = participantMutation.dateGranted;
        values.dateEntry = participantMutation.dateEntry;

        if (projectTypeCodeRef === 'loan') {
            values.amountFinal = participantMutation.amountFinal;
            values.amount = participantMutation.amountFinal;
        } else if (projectTypeCodeRef !== 'energy_community') {
            values.quantityFinal = participantMutation.quantityFinal;
            values.quantity = participantMutation.quantityFinal;
        }

        if (projectTypeCodeRef !== 'energy_community') {
            values.datePayment = participantMutation.datePayment;
            values.paymentReference = participantMutation.paymentReference;
            values.dateContractRetour = participantMutation.dateContractRetour;
        }
    }

    return values;
}
