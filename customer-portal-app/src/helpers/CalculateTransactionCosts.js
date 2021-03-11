export default function(project, values) {
    let transactionCosts = 0;

    switch (project.transactionCostsCodeRef) {
        case 'amount-once':
            transactionCosts = project.transactionCostsAmount;
            break;
        case 'amount':
            if (project.projectType.codeRef === 'loan') {
                transactionCosts = project.transactionCostsAmount;
            } else {
                transactionCosts = project.transactionCostsAmount * values.participationsOptioned;
            }
            break;
        case 'percentage':
            let amount = 0;
            if (project.projectType.codeRef === 'loan') {
                amount = values.amountOptioned;
            } else {
                amount = values.participationsOptioned * project.currentBookWorth;
            }
            if (amount != 0) {
                if (project.transactionCostsAmount3 !== null && amount >= project.transactionCostsAmount3) {
                    transactionCosts = parseFloat(((amount * project.transactionCostsPercentage3) / 100).toFixed(2));
                } else if (project.transactionCostsAmount2 !== null && amount >= project.transactionCostsAmount2) {
                    transactionCosts = parseFloat(((amount * project.transactionCostsPercentage2) / 100).toFixed(2));
                } else if (project.transactionCostsAmount !== null) {
                    transactionCosts = parseFloat(((amount * project.transactionCostsPercentage) / 100).toFixed(2));
                }
            }
            if (transactionCosts != 0) {
                if (
                    project.transactionCostsAmountMin !== null &&
                    transactionCosts < project.transactionCostsAmountMin
                ) {
                    transactionCosts = project.transactionCostsAmountMin;
                }
                if (
                    project.transactionCostsAmountMax !== null &&
                    transactionCosts > project.transactionCostsAmountMax
                ) {
                    transactionCosts = project.transactionCostsAmountMax;
                }
            }
            break;
        default:
            transactionCosts = 0;
    }

    return transactionCosts;
}
