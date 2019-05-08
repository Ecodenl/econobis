export default function(participation, errors, hasErrors, statusCodeRef) {
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
        if (statusCodeRef === 'option') {
            if (!participation.quantityOption) {
                errors.quantityOption = true;
                hasErrors = true;
            }
            if (!participation.dateOption) {
                errors.dateOption = true;
                hasErrors = true;
            }
        }

        if (statusCodeRef === 'granted') {
            if (!participation.quantityGranted) {
                errors.quantityGranted = true;
                hasErrors = true;
            }
            if (!participation.dateGranted) {
                errors.dateGranted = true;
                hasErrors = true;
            }
        }

        if (statusCodeRef === 'final') {
            if (!participation.quantityFinal) {
                errors.quantityFinal = true;
                hasErrors = true;
            }
            if (!participation.dateEntry) {
                errors.dateEntry = true;
                hasErrors = true;
            }
        }
    }

    return { hasErrors, errors };
}
