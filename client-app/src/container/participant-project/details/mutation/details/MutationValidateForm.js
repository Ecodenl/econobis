export default function(participantMutation, errors, hasErrors) {
    if (!participantMutation.statusId) {
        errors.statusId = true;
        hasErrors = true;
    } else {
        // Extra check dependable on orginalStatusCodeRef
        const orginalStatusCodeRef = participantMutation.status.codeRef;
        const orginalStatusId = participantMutation.status.id;

        if (orginalStatusCodeRef === 'interest' && orginalStatusId !== Number(participantMutation.statusId)) {
            if (!participantMutation.quantityOption) {
                errors.quantityOption = true;
                hasErrors = true;
            }
            if (!participantMutation.dateOption) {
                errors.dateOption = true;
                hasErrors = true;
            }
        }

        if (orginalStatusCodeRef === 'option') {
            if (orginalStatusId !== Number(participantMutation.statusId)) {
                if (!participantMutation.quantityGranted) {
                    errors.quantityGranted = true;
                    hasErrors = true;
                }
                if (!participantMutation.dateGranted) {
                    errors.dateGranted = true;
                    hasErrors = true;
                }
            } else {
                if (!participantMutation.quantityOption) {
                    errors.quantityOption = true;
                    hasErrors = true;
                }
                if (!participantMutation.dateOption) {
                    errors.dateOption = true;
                    hasErrors = true;
                }
            }
        }

        if (orginalStatusCodeRef === 'granted') {
            if (orginalStatusId !== Number(participantMutation.statusId)) {
                if (!participantMutation.quantityFinal) {
                    errors.quantityFinal = true;
                    hasErrors = true;
                }
                if (!participantMutation.dateEntry) {
                    errors.dateEntry = true;
                    hasErrors = true;
                }
            } else {
                if (!participantMutation.quantityGranted) {
                    errors.quantityGranted = true;
                    hasErrors = true;
                }
                if (!participantMutation.dateGranted) {
                    errors.dateGranted = true;
                    hasErrors = true;
                }
            }
        }
    }

    return { hasErrors, errors };
}
