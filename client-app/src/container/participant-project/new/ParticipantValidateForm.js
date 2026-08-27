import validator from 'validator';

export default function(participation, errors, hasErrors, statusCodeRef, projectTypeCodeRef) {
    if (!participation.contactId) {
        errors.contactId = true;
        hasErrors = true;
    }
    if (!participation.addressId) {
        errors.addressId = true;
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
            case 'interest':
                if (projectTypeCodeRef === 'loan') {
                    if (participation.amountInterest && participation.amountInterest < 0) {
                        errors.amountInterest = true;
                        hasErrors = true;
                    }
                } else {
                    if (participation.quantityInterest && participation.quantityInterest < 0) {
                        errors.quantityInterest = true;
                        hasErrors = true;
                    }
                }
                break;
            case 'option':
                if (!participation.dateOption) {
                    errors.dateOption = true;
                    hasErrors = true;
                }
                if (projectTypeCodeRef === 'loan') {
                    if (!participation.amountOption || participation.amountOption < 0) {
                        errors.amountOption = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participation.quantityOption || participation.quantityOption < 0) {
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
                    if (!participation.amountGranted || participation.amountGranted < 0) {
                        errors.amountGranted = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participation.quantityGranted || participation.quantityGranted < 0) {
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
                if (
                    !validator.isEmpty(participation.dateEntry + '') &&
                    !validator.isEmpty(participation.disableBeforeEntryDate) &&
                    participation.dateEntry < participation.disableBeforeEntryDate
                ) {
                    errors.dateEntry = true;
                    hasErrors = true;
                }

                if (projectTypeCodeRef === 'loan') {
                    if (!participation.amountFinal || participation.amountFinal < 0) {
                        errors.amountFinal = true;
                        hasErrors = true;
                    }
                } else {
                    if (!participation.quantityFinal || participation.quantityFinal < 0) {
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
