export default function(project, amountOptioned, participationsOptioned) {
    let transactionCosts = 0;
    let varAmountOptioned = amountOptioned ? parseFloat(amountOptioned.toString().replace(',', '.')) : 0;
    let varParticipationsOptioned = participationsOptioned ? parseFloat(participationsOptioned).toFixed(0) : 0;
    switch (project.transactionCostsCodeRef) {
        case 'amount-once':
            transactionCosts = project.transactionCostsAmount;
            break;
        case 'amount':
            if (project.projectType.codeRef === 'loan') {
                transactionCosts = project.transactionCostsAmount;
            } else {
                transactionCosts = project.transactionCostsAmount * varParticipationsOptioned;
            }
            break;
        case 'percentage':
            let amount = 0;
            if (project.projectType.codeRef === 'loan') {
                amount = varAmountOptioned;
            } else {
                amount = varParticipationsOptioned * project.currentBookWorth;
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
