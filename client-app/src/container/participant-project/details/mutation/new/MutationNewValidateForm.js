export default function(participantMutation, errors, hasErrors, statusCodeRef, typeCodeRef, projectTypeCodeRef) {
    if (!participantMutation.typeId) {
        errors.typeId = true;
        hasErrors = true;
    }

    // Buying en nu ook with drawal, todo later hier ook nog sell toevoegen?
    // if (typeCodeRef === 'first_deposit' || typeCodeRef === 'deposit' || typeCodeRef === 'withDrawal'){
    if (!participantMutation.statusId) {
        errors.statusId = true;
        hasErrors = true;
    } else {
        // Extra check dependable on statusCodeRef
        if (statusCodeRef === 'interest') {
            if (projectTypeCodeRef === 'loan') {
                // selling specifiek todo later hier ook nog sell toevoegen? en hier dus wellicht betaaldatum dus?
                if (typeCodeRef === 'withDrawal') {
                    if (participantMutation.amountInterest && participantMutation.amountInterest > 0) {
                        errors.amountInterest = true;
                        hasErrors = true;
                    }
                } else {
                    if (participantMutation.amountInterest && participantMutation.amountInterest < 0) {
                        errors.amountInterest = true;
                        hasErrors = true;
                    }
                }
            } else {
                if (typeCodeRef === 'withDrawal') {
                    if (participantMutation.quantityInterest && participantMutation.quantityInterest > 0) {
                        errors.quantityInterest = true;
                        hasErrors = true;
                    }
                } else {
                    if (participantMutation.quantityInterest && participantMutation.quantityInterest < 0) {
                        errors.quantityInterest = true;
                        hasErrors = true;
                    }
                }
            }
        }

        if (statusCodeRef === 'option') {
            if (projectTypeCodeRef === 'loan') {
                if (typeCodeRef === 'withDrawal') {
                    if (!participantMutation.amountOption || participantMutation.amountOption > 0) {
                        errors.amountOption = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participantMutation.amountOption || participantMutation.amountOption <= 0) {
                        errors.amountOption = true;
                        hasErrors = true;
                    }
                }
            } else {
                if (typeCodeRef === 'withDrawal') {
                    if (!participantMutation.quantityOption || participantMutation.quantityOption > 0) {
                        errors.quantityOption = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participantMutation.quantityOption || participantMutation.quantityOption <= 0) {
                        errors.quantityOption = true;
                        hasErrors = true;
                    }
                }
            }
            if (!participantMutation.dateOption) {
                errors.dateOption = true;
                hasErrors = true;
            }
        }

        if (statusCodeRef === 'granted') {
            if (projectTypeCodeRef === 'loan') {
                if (typeCodeRef === 'withDrawal') {
                    if (!participantMutation.amountGranted || participantMutation.amountGranted > 0) {
                        errors.amountGranted = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participantMutation.amountGranted || participantMutation.amountGranted <= 0) {
                        errors.amountGranted = true;
                        hasErrors = true;
                    }
                }
            } else {
                if (typeCodeRef === 'withDrawal') {
                    if (!participantMutation.quantityGranted || participantMutation.quantityGranted > 0) {
                        errors.quantityGranted = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participantMutation.quantityGranted || participantMutation.quantityGranted <= 0) {
                        errors.quantityGranted = true;
                        hasErrors = true;
                    }
                }
            }
            if (!participantMutation.dateGranted) {
                errors.dateGranted = true;
                hasErrors = true;
            }
        }

        if (statusCodeRef === 'final') {
            if (projectTypeCodeRef === 'loan') {
                if (typeCodeRef === 'withDrawal') {
                    if (!participantMutation.amountFinal || participantMutation.amountFinal > 0) {
                        errors.amountFinal = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participantMutation.amountFinal || participantMutation.amountFinal <= 0) {
                        errors.amountFinal = true;
                        hasErrors = true;
                    }
                }
            } else {
                if (typeCodeRef === 'withDrawal') {
                    if (!participantMutation.quantityFinal || participantMutation.quantityFinal > 0) {
                        errors.quantityFinal = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participantMutation.quantityFinal || participantMutation.quantityFinal <= 0) {
                        errors.quantityFinal = true;
                        hasErrors = true;
                    }
                }
            }
            if (!participantMutation.dateEntry) {
                errors.dateEntry = true;
                hasErrors = true;
            }
        }
        //}
    }

    return { hasErrors, errors };
}
