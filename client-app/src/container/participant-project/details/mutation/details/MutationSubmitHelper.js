export default function(participantMutation, projectTypeCodeRef) {
    const orginalStatusCodeRef = participantMutation.status.codeRef;
    const orginalStatusId = participantMutation.status.id;
    const values = {
        id: participantMutation.id,
        statusId: participantMutation.statusId,
        typeId: participantMutation.typeId,
    };

    // If form is validated set next status
    if (orginalStatusCodeRef === 'interest') {
        if (projectTypeCodeRef === 'loan') {
            values.amountInterest = participantMutation.amountInterest;
            values.amount = participantMutation.amountInterest;
        } else if (projectTypeCodeRef !== 'energy_community') {
            values.quantityInterest = participantMutation.quantityInterest;
            values.quantity = participantMutation.quantityInterest;
        }
        values.dateInterest = participantMutation.dateInterest;
        values.statusId = participantMutation.statusId;

        if (orginalStatusId !== Number(participantMutation.statusId)) {
            if (projectTypeCodeRef === 'loan') {
                values.amountOption = participantMutation.amountOption;
                values.amount = participantMutation.amountOption;
            } else if (projectTypeCodeRef !== 'energy_community') {
                values.quantityOption = participantMutation.quantityOption;
                values.quantity = participantMutation.quantityOption;
            }
            values.dateOption = participantMutation.dateOption;
        }
        values.differentTransactionCostsAmount = participantMutation.differentTransactionCostsAmount;
    }

    if (orginalStatusCodeRef === 'option') {
        if (projectTypeCodeRef === 'loan') {
            values.amountOption = participantMutation.amountOption;
            values.amount = participantMutation.amountOption;
        } else if (projectTypeCodeRef !== 'energy_community') {
            values.quantityOption = participantMutation.quantityOption;
            values.quantity = participantMutation.quantityOption;
        }
        values.dateOption = participantMutation.dateOption;
        values.statusId = participantMutation.statusId;

        if (orginalStatusId !== Number(participantMutation.statusId)) {
            if (projectTypeCodeRef === 'loan') {
                values.amountGranted = participantMutation.amountGranted;
                values.amount = participantMutation.amountGranted;
            } else if (projectTypeCodeRef !== 'energy_community') {
                values.quantityGranted = participantMutation.quantityGranted;
                values.quantity = participantMutation.quantityGranted;
            }
            values.dateGranted = participantMutation.dateGranted;
        }
        values.differentTransactionCostsAmount = participantMutation.differentTransactionCostsAmount;
    }

    if (orginalStatusCodeRef === 'granted') {
        if (projectTypeCodeRef === 'loan') {
            values.amountGranted = participantMutation.amountGranted;
            values.amount = participantMutation.amountGranted;
        } else if (projectTypeCodeRef !== 'energy_community') {
            values.quantityGranted = participantMutation.quantityGranted;
            values.quantity = participantMutation.quantityGranted;
        }
        values.dateGranted = participantMutation.dateGranted;
        values.statusId = participantMutation.statusId;

        if (orginalStatusId !== Number(participantMutation.statusId)) {
            if (projectTypeCodeRef === 'loan') {
                values.amountFinal = participantMutation.amountFinal;
                values.amount = participantMutation.amountFinal;
            } else if (projectTypeCodeRef !== 'energy_community') {
                values.quantityFinal = participantMutation.quantityFinal;
                values.quantity = participantMutation.quantityFinal;
            }

            if (projectTypeCodeRef !== 'energy_community') {
                values.dateContractRetour = participantMutation.dateContractRetour;
                values.datePayment = participantMutation.datePayment;
                values.paymentReference = participantMutation.paymentReference;
            }

            values.dateEntry = participantMutation.dateEntry;
        }

        values.differentTransactionCostsAmount = participantMutation.differentTransactionCostsAmount;
    }

    if (orginalStatusCodeRef === 'final') {
        if (projectTypeCodeRef === 'loan') {
            values.amountFinal = participantMutation.amountFinal;
            values.amount = participantMutation.amountFinal;
        } else if (projectTypeCodeRef !== 'energy_community') {
            values.quantityFinal = participantMutation.quantityFinal;
            values.quantity = participantMutation.quantityFinal;
        }

        if (projectTypeCodeRef !== 'energy_community') {
            values.dateContractRetour = participantMutation.dateContractRetour;
            values.datePayment = participantMutation.datePayment;
            values.paymentReference = participantMutation.paymentReference;
        }

        values.dateEntry = participantMutation.dateEntry;
        values.statusId = participantMutation.statusId;
        values.differentTransactionCostsAmount = null;
    }

    if (projectTypeCodeRef === 'loan') {
        if (values.amount != participantMutation.amount) {
            values.differentTransactionCostsAmount = null;
        }
    } else if (projectTypeCodeRef !== 'energy_community') {
        if (values.quantity != participantMutation.quantity) {
            values.differentTransactionCostsAmount = null;
        }
    }

    return values;
}
