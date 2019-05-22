export default function(participantMutation, errors, hasErrors, statusCodeRef, projectTypeCodeRef) {
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

    return { hasErrors, errors };
}
