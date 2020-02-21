export default function(participantMutation, projectTypeCodeRef, changeDateRegister) {
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
        } else {
            values.quantityInterest = participantMutation.quantityInterest;
            values.quantity = participantMutation.quantityInterest;
        }
        values.dateInterest = participantMutation.dateInterest;
        values.statusId = participantMutation.statusId;

        if (orginalStatusId !== Number(participantMutation.statusId)) {
            if (projectTypeCodeRef === 'loan') {
                values.amountOption = participantMutation.amountOption;
                values.amount = participantMutation.amountOption;
            } else {
                values.quantityOption = participantMutation.quantityOption;
                values.quantity = participantMutation.quantityOption;
            }
            values.dateOption = participantMutation.dateOption;
        }
    }

    if (orginalStatusCodeRef === 'option') {
        if (projectTypeCodeRef === 'loan') {
            values.amountOption = participantMutation.amountOption;
            values.amount = participantMutation.amountOption;
        } else {
            values.quantityOption = participantMutation.quantityOption;
            values.quantity = participantMutation.quantityOption;
        }
        values.dateOption = participantMutation.dateOption;
        values.statusId = participantMutation.statusId;

        if (orginalStatusId !== Number(participantMutation.statusId)) {
            if (projectTypeCodeRef === 'loan') {
                values.amountGranted = participantMutation.amountGranted;
                values.amount = participantMutation.amountGranted;
            } else {
                values.quantityGranted = participantMutation.quantityGranted;
                values.quantity = participantMutation.quantityGranted;
            }
            values.dateGranted = participantMutation.dateGranted;
        }
    }

    if (orginalStatusCodeRef === 'granted') {
        if (projectTypeCodeRef === 'loan') {
            values.amountGranted = participantMutation.amountGranted;
            values.amount = participantMutation.amountGranted;
        } else {
            values.quantityGranted = participantMutation.quantityGranted;
            values.quantity = participantMutation.quantityGranted;
        }
        values.dateGranted = participantMutation.dateGranted;
        values.statusId = participantMutation.statusId;

        if (orginalStatusId !== Number(participantMutation.statusId)) {
            if (projectTypeCodeRef === 'loan') {
                values.amountFinal = participantMutation.amountFinal;
                values.amount = participantMutation.amountFinal;
            } else {
                values.quantityFinal = participantMutation.quantityFinal;
                values.quantity = participantMutation.quantityFinal;
            }
            values.dateContractRetour = participantMutation.dateContractRetour;
            values.datePayment = participantMutation.datePayment;
            values.dateEntry = participantMutation.dateEntry;
        }
    }

    if (orginalStatusCodeRef === 'final') {
        if (projectTypeCodeRef === 'loan') {
            values.amountFinal = participantMutation.amountFinal;
            values.amount = participantMutation.amountFinal;
        } else {
            values.quantityFinal = participantMutation.quantityFinal;
            values.quantity = participantMutation.quantityFinal;
        }
        values.dateContractRetour = participantMutation.dateContractRetour;
        values.datePayment = participantMutation.datePayment;
        values.dateEntry = participantMutation.dateEntry;
        values.statusId = participantMutation.statusId;
    }
    return values;
}
