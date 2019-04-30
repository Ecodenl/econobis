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
            if (!participation.amountOption) {
                errors.amountOption = true;
                hasErrors = true;
            }
            if (!participation.dateOption) {
                errors.dateOption = true;
                hasErrors = true;
            }
        }

        if (statusCodeRef === 'granted') {
            if (!participation.amountGranted) {
                errors.amountGranted = true;
                hasErrors = true;
            }
            if (!participation.dateGranted) {
                errors.dateGranted = true;
                hasErrors = true;
            }
        }

        if (statusCodeRef === 'final') {
            if (!participation.amountFinal) {
                errors.amountFinal = true;
                hasErrors = true;
            }
            if (!participation.dateGranted) {
                errors.dateGranted = true;
                hasErrors = true;
            }
            if (!participation.dateContractRetour) {
                errors.dateContractRetour = true;
                hasErrors = true;
            }
            if (!participation.datePayment) {
                errors.datePayment = true;
                hasErrors = true;
            }
            if (!participation.startingDate) {
                errors.startingDate = true;
                hasErrors = true;
            }
        }
    }

    return { hasErrors, errors };
}
