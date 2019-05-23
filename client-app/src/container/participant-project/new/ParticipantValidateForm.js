export default function(participation, errors, hasErrors, statusCodeRef, projectTypeCodeRef) {
    if (!participation.contactId) {
        errors.contactId = true;
        hasErrors = true;
    }
    if (!participation.projectId) {
        errors.projectId = true;
        hasErrors = true;
    }
    if (!participation.statusId) {
        errors.statusId = true;
        hasErrors = true;
    } else {
        // Extra check dependable on statusCodeRef
        switch (statusCodeRef) {
            case 'option':
                if (!participation.dateOption) {
                    errors.dateOption = true;
                    hasErrors = true;
                }
                if (projectTypeCodeRef === 'loan') {
                    if (!participation.amountOption) {
                        errors.amountOption = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participation.quantityOption) {
                        errors.quantityOption = true;
                        hasErrors = true;
                    }
                }
                break;
            case 'granted':
                if (!participation.dateGranted) {
                    errors.dateGranted = true;
                    hasErrors = true;
                }
                if (projectTypeCodeRef === 'loan') {
                    if (!participation.amountGranted) {
                        errors.amountGranted = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participation.quantityGranted) {
                        errors.quantityGranted = true;
                        hasErrors = true;
                    }
                }
                break;
            case 'final':
                if (!participation.dateEntry) {
                    errors.dateEntry = true;
                    hasErrors = true;
                }
                if (projectTypeCodeRef === 'loan') {
                    if (!participation.amountFinal) {
                        errors.amountFinal = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participation.quantityFinal) {
                        errors.quantityFinal = true;
                        hasErrors = true;
                    }
                }
                break;
            default:
                break;
        }
    }

    return { hasErrors, errors };
}
