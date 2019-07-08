export default function(participantMutation, errors, hasErrors, projectTypeCodeRef) {
    if (!participantMutation.statusId) {
        errors.statusId = true;
        hasErrors = true;
    } else {
        // Extra check dependable on orginalStatusCodeRef
        const orginalStatusCodeRef = participantMutation.status.codeRef;
        const orginalStatusId = participantMutation.status.id;
        const typeCodeRef = participantMutation.type.codeRef;

        if (orginalStatusCodeRef === 'interest') {
            if (orginalStatusId === Number(participantMutation.statusId)) {
                if (projectTypeCodeRef === 'loan') {
                    // selling specifiek todo later hier ook nog sell toevoegen? en hier dus wellicht betaaldatum dus?
                    if (typeCodeRef === 'withDrawal') {
                        if (!participantMutation.amountInterest || participantMutation.amountInterest > 0) {
                            errors.amountInterest = true;
                            hasErrors = true;
                        }
                    } else {
                        if (!participantMutation.amountInterest || participantMutation.amountInterest < 0) {
                            errors.amountInterest = true;
                            hasErrors = true;
                        }
                    }
                } else {
                    if (typeCodeRef === 'withDrawal') {
                        if (!participantMutation.quantityInterest || participantMutation.quantityInterest > 0) {
                            errors.quantityInterest = true;
                            hasErrors = true;
                        }
                    } else {
                        if (!participantMutation.quantityInterest || participantMutation.quantityInterest < 0) {
                            errors.quantityInterest = true;
                            hasErrors = true;
                        }
                    }
                }
            } else {
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
        }

        if (orginalStatusCodeRef === 'option') {
            if (orginalStatusId !== Number(participantMutation.statusId)) {
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
            } else {
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
        }

        if (orginalStatusCodeRef === 'granted') {
            if (orginalStatusId !== Number(participantMutation.statusId)) {
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
            } else {
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
        }

        if (orginalStatusCodeRef === 'final') {
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
    }

    return { hasErrors, errors };
}
