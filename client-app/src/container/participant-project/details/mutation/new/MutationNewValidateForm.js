export default function(participantMutation, errors, hasErrors, statusCodeRef, typeCodeRef, projectTypeCodeRef) {
    if (!participantMutation.typeId) {
        errors.typeId = true;
        hasErrors = true;
    }

    // Buying
    if (typeCodeRef === 'first_deposit' || typeCodeRef === 'deposit') {
        if (!participantMutation.statusId) {
            errors.statusId = true;
            hasErrors = true;
        } else {
            // Extra check dependable on statusCodeRef
            if (statusCodeRef === 'option') {
                if (projectTypeCodeRef === 'loan') {
                    if (!participantMutation.amountOption) {
                        errors.amountOption = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participantMutation.quantityOption) {
                        errors.quantityOption = true;
                        hasErrors = true;
                    }
                }
                if (!participantMutation.dateOption) {
                    errors.dateOption = true;
                    hasErrors = true;
                }
            }

            if (statusCodeRef === 'granted') {
                if (projectTypeCodeRef === 'loan') {
                    if (!participantMutation.amountGranted) {
                        errors.amountGranted = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participantMutation.quantityGranted) {
                        errors.quantityGranted = true;
                        hasErrors = true;
                    }
                }
                if (!participantMutation.dateGranted) {
                    errors.dateGranted = true;
                    hasErrors = true;
                }
            }

            if (statusCodeRef === 'final') {
                if (projectTypeCodeRef === 'loan') {
                    if (!participantMutation.amountFinal) {
                        errors.amountFinal = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participantMutation.quantityFinal) {
                        errors.quantityFinal = true;
                        hasErrors = true;
                    }
                }
                if (!participantMutation.dateEntry) {
                    errors.dateEntry = true;
                    hasErrors = true;
                }
            }
        }
    }

    // Selling
    if (typeCodeRef === 'withDrawal') {
        if (projectTypeCodeRef === 'loan') {
            if (!participantMutation.amount || participantMutation.amount <= 0) {
                errors.amount = true;
                hasErrors = true;
            }
        } else {
            if (!participantMutation.quantity || participantMutation.quantity <= 0) {
                errors.quantity = true;
                hasErrors = true;
            }
        }

        if (!participantMutation.dateEntry) {
            errors.dateEntry = true;
            hasErrors = true;
        }
    }

    return { hasErrors, errors };
}
