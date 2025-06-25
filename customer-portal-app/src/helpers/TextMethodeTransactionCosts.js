import MoneyPresenter from './MoneyPresenter';
import { lowerCaseFirstLetter } from './ModifyText';

export default function(project, transactionCosts) {
    let transactionCostsMethodeArray = [];

    switch (project.transactionCostsCodeRef) {
        case 'amount-once':
            transactionCostsMethodeArray.push(
                MoneyPresenter(project.transactionCostsAmount) +
                    ' ' +
                    project.textTransactionCosts +
                    ' per inschrijving'
            );
            break;
        case 'amount':
            if (project.projectType.codeRef === 'loan') {
                transactionCostsMethodeArray.push(
                    MoneyPresenter(project.transactionCostsAmount) +
                        ' ' +
                        project.textTransactionCosts +
                        ' per inschrijving'
                );
            } else {
                transactionCostsMethodeArray.push(
                    MoneyPresenter(project.transactionCostsAmount) +
                        ' ' +
                        project.textTransactionCosts +
                        ' per ' +
                        lowerCaseFirstLetter(project.textRegisterParticipationSingular)
                );
            }
            break;
        case 'percentage':
            let transactionCostsMethodeLine = '';
            transactionCostsMethodeLine =
                project.transactionCostsPercentage.toLocaleString('nl', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }) +
                '% ' +
                project.textTransactionCosts;
            if (project.transactionCostsAmount > 0) {
                transactionCostsMethodeLine =
                    transactionCostsMethodeLine +
                    ' (vanaf inleg: ' +
                    MoneyPresenter(project.transactionCostsAmount) +
                    ')';
            }
            transactionCostsMethodeArray.push(transactionCostsMethodeLine);
            if (project.transactionCostsAmount2 !== null) {
                let transactionCostsMethodeLine = '';
                transactionCostsMethodeLine =
                    transactionCostsMethodeLine +
                    project.transactionCostsPercentage2.toLocaleString('nl', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }) +
                    '% ' +
                    project.textTransactionCosts;
                if (project.transactionCostsAmount2 > 0) {
                    transactionCostsMethodeLine =
                        transactionCostsMethodeLine +
                        ' (vanaf inleg: ' +
                        MoneyPresenter(project.transactionCostsAmount2) +
                        ')';
                }
                transactionCostsMethodeArray.push(transactionCostsMethodeLine);
                if (project.transactionCostsAmount3 !== null) {
                    let transactionCostsMethodeLine = '';
                    transactionCostsMethodeLine =
                        transactionCostsMethodeLine +
                        project.transactionCostsPercentage3.toLocaleString('nl', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }) +
                        '% ' +
                        project.textTransactionCosts;
                    if (project.transactionCostsAmount3 > 0) {
                        transactionCostsMethodeLine =
                            transactionCostsMethodeLine +
                            ' (vanaf inleg: ' +
                            MoneyPresenter(project.transactionCostsAmount3) +
                            ')';
                    }
                    transactionCostsMethodeArray.push(transactionCostsMethodeLine);
                }
            }
            break;
        default:
            transactionCostsMethodeArray.push(project.textTransactionCosts);
            break;
    }
    if (project.transactionCostsCodeRef !== 'none') {
        if (project.transactionCostsAmountMin !== null && transactionCosts == project.transactionCostsAmountMin) {
            transactionCostsMethodeArray.push(
                project.textTransactionCosts + ' minimaal: ' + MoneyPresenter(project.transactionCostsAmountMin)
            );
        }
        if (project.transactionCostsAmountMax !== null && transactionCosts == project.transactionCostsAmountMax) {
            transactionCostsMethodeArray.push(
                project.textTransactionCosts + ' maximaal: ' + MoneyPresenter(project.transactionCostsAmountMax)
            );
        }
    }

    return transactionCostsMethodeArray;
}
