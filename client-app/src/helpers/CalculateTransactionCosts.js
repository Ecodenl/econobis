export default function(project, amountMutation, participationsMutation) {
    let transactionCosts = 0;
    let varAmount = amountMutation ? parseFloat(amountMutation.toString().replace(',', '.')) : 0;
    let varParticipationsMutation = participationsMutation ? parseFloat(participationsMutation).toFixed(0) : 0;

    // todo WM: opschonen doLog !
    const doLog = false;

    if (doLog) console.log('test calculateTransactionCosts client-app');
    if (doLog) console.log('project transactionCostsCodeRef: ' + project.transactionCostsCodeRef);
    if (project.projectType.codeRef === 'loan') {
        if (doLog) console.log('varAmount: ' + varAmount);
    } else {
        if (doLog) console.log('varParticipationsMutation: ' + varParticipationsMutation);
    }

    switch (project.transactionCostsCodeRef) {
        case 'amount-once':
            transactionCosts = project.transactionCostsAmount;
            if (doLog) console.log('1-malig bedrag: ' + transactionCosts);
            break;
        case 'amount':
            if (project.projectType.codeRef === 'loan') {
                transactionCosts = project.transactionCostsAmount;
                if (doLog) console.log('transactionCosts lening: ' + transactionCosts);
            } else {
                transactionCosts = project.transactionCostsAmount * varParticipationsMutation;
                if (doLog) console.log('transactionCosts geen lening: ' + transactionCosts);
            }
            break;
        case 'percentage':
            let amount = 0;
            if (project.projectType.codeRef === 'loan') {
                amount = varAmount;
                if (doLog) console.log('bedrag bij percentage lening: ' + amount);
            } else {
                amount = varParticipationsMutation * project.currentBookWorth;
                if (doLog) console.log('bedrag bij percentage geeen lening: ' + amount);
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
            if (doLog) console.log('transactionCosts bij percentage: ' + transactionCosts);
            break;
        default:
            transactionCosts = 0;
    }
    if (project.transactionCostsCodeRef !== 'none') {
        if (project.transactionCostsAmountMin !== null && transactionCosts < project.transactionCostsAmountMin) {
            transactionCosts = project.transactionCostsAmountMin;
            if (doLog) console.log('transactionCostsAmountMin: ' + transactionCosts);
        }
        if (project.transactionCostsAmountMax !== null && transactionCosts > project.transactionCostsAmountMax) {
            transactionCosts = project.transactionCostsAmountMax;
            if (doLog) console.log('transactionCostsAmountMax: ' + transactionCosts);
        }
    }

    return transactionCosts;
}
