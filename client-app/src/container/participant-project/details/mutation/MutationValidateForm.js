export default function(participantMutation, errors, hasErrors) {
    if (!participantMutation.statusId) {
        errors.statusId = true;
        hasErrors = true;
    } else {
        // Extra check dependable on statusCodeRef
        const statusCodeRef = participantMutation.status.codeRef;

        if (statusCodeRef === 'interest') {
            if (!participantMutation.quantityOption) {
                errors.quantityOption = true;
                hasErrors = true;
            }
            if (!participantMutation.dateOption) {
                errors.dateOption = true;
                hasErrors = true;
            }
        }

        if (statusCodeRef === 'option') {
            if (!participantMutation.quantityGranted) {
                errors.quantityGranted = true;
                hasErrors = true;
            }
            if (!participantMutation.dateGranted) {
                errors.dateGranted = true;
                hasErrors = true;
            }
        }

        if (statusCodeRef === 'granted') {
            if (!participantMutation.quantityFinal) {
                errors.quantityFinal = true;
                hasErrors = true;
            }
            if (!participantMutation.dateGranted) {
                errors.dateGranted = true;
                hasErrors = true;
            }
            if (!participantMutation.dateEntry) {
                errors.dateEntry = true;
                hasErrors = true;
            }
        }
    }

    return { hasErrors, errors };
}
