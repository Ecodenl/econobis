export default function(project, amountMutation, participationsMutation) {
    let transactionCosts = 0;
    let varAmount = amountMutation ? parseFloat(amountMutation.toString().replace(',', '.')) : 0;
    let varParticipationsMutation = participationsMutation ? parseFloat(participationsMutation).toFixed(0) : 0;

    switch (project.transactionCostsCodeRef) {
        case 'amount-once':
            transactionCosts = project.transactionCostsAmount;
            break;
        case 'amount':
            if (project.typeCodeRef === 'loan') {
                transactionCosts = project.transactionCostsAmount;
            } else {
                transactionCosts = project.transactionCostsAmount * varParticipationsMutation;
            }
            break;
        case 'percentage':
            let amount = 0;
            if (project.typeCodeRef === 'loan') {
                amount = varAmount;
            } else {
                amount = varParticipationsMutation * project.currentBookWorth;
            }
            if (amount != 0) {
                if (project.transactionCostsAmount3 !== null && amount >= project.transactionCostsAmount3) {
                    transactionCosts = parseFloat(((amount * project.transactionCostsPercentage3) / 100).toFixed(2));
                } else if (project.transactionCostsAmount2 !== null && amount >= project.transactionCostsAmount2) {
                    transactionCosts = parseFloat(((amount * project.transactionCostsPercentage2) / 100).toFixed(2));
                } else if (project.transactionCostsAmount !== null && amount >= project.transactionCostsAmount) {
                    transactionCosts = parseFloat(((amount * project.transactionCostsPercentage) / 100).toFixed(2));
                } else {
                    transactionCosts = 0;
                }
            }
            break;
        default:
            transactionCosts = 0;
    }
    if (project.transactionCostsCodeRef !== 'none') {
        if (project.transactionCostsAmountMin !== null && transactionCosts < project.transactionCostsAmountMin) {
            transactionCosts = project.transactionCostsAmountMin;
        }
        if (project.transactionCostsAmountMax !== null && transactionCosts > project.transactionCostsAmountMax) {
            transactionCosts = project.transactionCostsAmountMax;
        }
    }

    return transactionCosts;
}
