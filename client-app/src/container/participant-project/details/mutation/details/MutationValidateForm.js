export default function(
    participantMutation,
    errors,
    errorMessage,
    hasErrors,
    projectTypeCodeRef,
    participationsDefinitive,
    amountDefinitive
) {
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
                    if (typeCodeRef === 'withDrawal') {
                        if (participantMutation.amountInterest && participantMutation.amountInterest > 0) {
                            errors.amountInterest = true;
                            errorMessage.amountInterest = 'Voer een negatief bedrag of 0 in.';
                            hasErrors = true;
                        }
                    } else {
                        if (participantMutation.amountInterest && participantMutation.amountInterest < 0) {
                            errors.amountInterest = true;
                            errorMessage.amountInterest = 'Voer een positief bedrag of 0 in.';
                            hasErrors = true;
                        }
                    }
                } else {
                    if (typeCodeRef === 'withDrawal') {
                        if (participantMutation.quantityInterest && participantMutation.quantityInterest > 0) {
                            errors.quantityInterest = true;
                            errorMessage.quantityInterest = 'Voer een negatief getal of 0 in.';
                            hasErrors = true;
                        }
                    } else {
                        if (participantMutation.quantityInterest && participantMutation.quantityInterest < 0) {
                            errors.quantityInterest = true;
                            errorMessage.quantityInterest = 'Voer een positief getal of 0 in.';
                            hasErrors = true;
                        }
                    }
                }
            } else {
                if (projectTypeCodeRef === 'loan') {
                    if (typeCodeRef === 'withDrawal') {
                        if (!participantMutation.amountOption || participantMutation.amountOption >= 0) {
                            errors.amountOption = true;
                            errorMessage.amountOption = 'Voer een negatief bedrag in.';
                            hasErrors = true;
                        }
                    } else {
                        if (!participantMutation.amountOption || participantMutation.amountOption <= 0) {
                            errors.amountOption = true;
                            errorMessage.amountOption = 'Voer een positief bedrag in.';
                            hasErrors = true;
                        }
                    }
                } else {
                    if (typeCodeRef === 'withDrawal') {
                        if (!participantMutation.quantityOption || participantMutation.quantityOption >= 0) {
                            errors.quantityOption = true;
                            errorMessage.quantityOption = 'Voer een negatief aantal in.';
                            hasErrors = true;
                        }
                    } else {
                        if (!participantMutation.quantityOption || participantMutation.quantityOption <= 0) {
                            errors.quantityOption = true;
                            errorMessage.quantityOption = 'Voer een positief aantal in.';
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
                        if (!participantMutation.amountGranted || participantMutation.amountGranted >= 0) {
                            errors.amountGranted = true;
                            errorMessage.amountGranted = 'Voer een negatief bedrag in.';
                            hasErrors = true;
                        }
                    } else {
                        if (!participantMutation.amountGranted || participantMutation.amountGranted <= 0) {
                            errors.amountGranted = true;
                            errorMessage.amountGranted = 'Voer een positief bedrag in.';
                            hasErrors = true;
                        }
                    }
                } else {
                    if (typeCodeRef === 'withDrawal') {
                        if (!participantMutation.quantityGranted || participantMutation.quantityGranted >= 0) {
                            errors.quantityGranted = true;
                            errorMessage.quantityGranted = 'Voer een negatief aantal in.';
                            hasErrors = true;
                        }
                    } else {
                        if (!participantMutation.quantityGranted || participantMutation.quantityGranted <= 0) {
                            errors.quantityGranted = true;
                            errorMessage.quantityGranted = 'Voer een positief aantal in.';
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
                        if (!participantMutation.amountOption || participantMutation.amountOption >= 0) {
                            errors.amountOption = true;
                            errorMessage.amountOption = 'Voer een negatief bedrag in.';
                            hasErrors = true;
                        }
                    } else {
                        if (!participantMutation.amountOption || participantMutation.amountOption <= 0) {
                            errors.amountOption = true;
                            errorMessage.amountOption = 'Voer een positief bedrag in.';
                            hasErrors = true;
                        }
                    }
                } else {
                    if (typeCodeRef === 'withDrawal') {
                        if (!participantMutation.quantityOption || participantMutation.quantityOption >= 0) {
                            errors.quantityOption = true;
                            errorMessage.quantityOption = 'Voer een negatief aantal in.';
                            hasErrors = true;
                        }
                    } else {
                        if (!participantMutation.quantityOption || participantMutation.quantityOption <= 0) {
                            errors.quantityOption = true;
                            errorMessage.quantityOption = 'Voer een positief aantal in.';
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
                        if (!participantMutation.amountFinal || participantMutation.amountFinal >= 0) {
                            errors.amountFinal = true;
                            errorMessage.amountFinal = 'Voer een negatief bedrag in.';
                            hasErrors = true;
                        }
                        if (participantMutation.amountFinal < amountDefinitive * -1) {
                            errors.amountFinal = true;
                            errorMessage.amountFinal =
                                'Negatief bedrag mag niet lager dan Huidig saldo lening rekening zijn.';
                            hasErrors = true;
                        }
                    } else {
                        if (!participantMutation.amountFinal || participantMutation.amountFinal <= 0) {
                            errors.amountFinal = true;
                            errorMessage.amountFinal = 'Voer een positief bedrag in.';
                            hasErrors = true;
                        }
                    }
                } else {
                    if (typeCodeRef === 'withDrawal') {
                        if (!participantMutation.quantityFinal || participantMutation.quantityFinal >= 0) {
                            errors.quantityFinal = true;
                            errorMessage.quantityFinal = 'Voer een negatief aantal in.';
                            hasErrors = true;
                        }
                        if (participantMutation.quantityFinal < participationsDefinitive * -1) {
                            errors.quantityFinal = true;
                            errorMessage.quantityFinal =
                                'Negatief aantal mag niet lager dan Huidige aantal ' +
                                (projectTypeCodeRef === 'obligation' ? 'obligaties' : 'participaties') +
                                '.';
                            hasErrors = true;
                        }
                    } else {
                        if (!participantMutation.quantityFinal || participantMutation.quantityFinal <= 0) {
                            errors.quantityFinal = true;
                            errorMessage.quantityFinal = 'Voer een positief aantal in.';
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
                        if (!participantMutation.amountGranted || participantMutation.amountGranted >= 0) {
                            errors.amountGranted = true;
                            errorMessage.amountGranted = 'Voer een negatief bedrag in.';
                            hasErrors = true;
                        }
                    } else {
                        if (!participantMutation.amountGranted || participantMutation.amountGranted <= 0) {
                            errors.amountGranted = true;
                            errorMessage.amountGranted = 'Voer een positief bedrag in.';
                            hasErrors = true;
                        }
                    }
                } else {
                    if (typeCodeRef === 'withDrawal') {
                        if (!participantMutation.quantityGranted || participantMutation.quantityGranted >= 0) {
                            errors.quantityGranted = true;
                            errorMessage.quantityGranted = 'Voer een negatief aantal in.';
                            hasErrors = true;
                        }
                    } else {
                        if (!participantMutation.quantityGranted || participantMutation.quantityGranted <= 0) {
                            errors.quantityGranted = true;
                            errorMessage.quantityGranted = 'Voer een positief aantal in.';
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
                    if (!participantMutation.amountFinal || participantMutation.amountFinal >= 0) {
                        errors.amountFinal = true;
                        errorMessage.amountFinal = 'Voer een negatief bedrag in.';
                        hasErrors = true;
                    }
                    if (participantMutation.amountFinal < amountDefinitive * -1) {
                        errors.amountFinal = true;
                        errorMessage.amountFinal =
                            'Negatief bedrag mag niet lager dan Huidig saldo lening rekening zijn.';
                        hasErrors = true;
                    }
                } else {
                    if (!participantMutation.amountFinal || participantMutation.amountFinal <= 0) {
                        errors.amountFinal = true;
                        errorMessage.amountFinal = 'Voer een positief bedrag in.';
                        hasErrors = true;
                    }
                }
            } else {
                if (typeCodeRef === 'withDrawal') {
                    if (!participantMutation.quantityFinal || participantMutation.quantityFinal >= 0) {
                        errors.quantityFinal = true;
                        errorMessage.quantityFinal = 'Voer een negatief aantal in.';
                        hasErrors = true;
                    }
                    if (participantMutation.quantityFinal < participationsDefinitive * -1) {
                        errors.quantityFinal = true;
                        errorMessage.quantityFinal =
                            'Negatief aantal mag niet lager dan Huidige aantal ' +
                            (projectTypeCodeRef === 'obligation' ? 'obligaties' : 'participaties') +
                            '.';
                        hasErrors = true;
                    }
                } else {
                    if (!participantMutation.quantityFinal || participantMutation.quantityFinal <= 0) {
                        errors.quantityFinal = true;
                        errorMessage.quantityFinal = 'Voer een positief aantal in.';
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

    return { hasErrors, errors, errorMessage };
}
