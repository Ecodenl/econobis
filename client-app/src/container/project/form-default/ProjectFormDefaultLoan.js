import React from 'react';
import InputText from '../../../components/form/InputText';
import ViewText from '../../../components/form/ViewText';
import MoneyPresenter from '../../../helpers/MoneyPresenter';
import InputSelect from '../../../components/form/InputSelect';

const ProjectFormEditLoan = ({
    loanTypeId,
    projectLoanTypes,
    hasConfirmedLoanRedemptionRevenue,
    amountOfLoanNeeded,
    minAmountLoan,
    maxAmountLoan,
    amountDefinitive,
    amountGranted,
    amountOptioned,
    amountInteressed,
    handleInputChange,
    errors,
    errorMessages,
}) => {
    const amountAvailable = amountOfLoanNeeded - amountDefinitive;

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Lening</h4>
            <div className="row">
                <InputSelect
                    label={'Type lening'}
                    name={'loanTypeId'}
                    options={projectLoanTypes}
                    value={loanTypeId}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    // emptyOption={false}
                    readOnly={hasConfirmedLoanRedemptionRevenue}
                    error={errors.loanTypeId}
                    errorMessage={errorMessages.loanTypeId}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Lening nodig'}
                    name={'amountOfLoanNeeded'}
                    value={amountOfLoanNeeded}
                    onChangeAction={handleInputChange}
                />
                <ViewText
                    label={'Lening interesse'}
                    value={MoneyPresenter(amountInteressed)}
                    className={'form-group col-sm-6'}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Min. bedrag lening'}
                    name={'minAmountLoan'}
                    value={minAmountLoan}
                    onChangeAction={handleInputChange}
                />
                <ViewText
                    label={'Lening ingeschreven'}
                    value={MoneyPresenter(amountOptioned)}
                    className={'form-group col-sm-6'}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Max. bedrag lening'}
                    name={'maxAmountLoan'}
                    value={maxAmountLoan}
                    onChangeAction={handleInputChange}
                />
                <ViewText
                    label={'Lening toegekend'}
                    value={MoneyPresenter(amountGranted)}
                    className={'form-group col-sm-6'}
                />
            </div>

            <div className="row">
                <div className={'form-group col-md-6'} />
                <ViewText
                    label={'Lening opgehaald'}
                    value={MoneyPresenter(amountDefinitive)}
                    className={'form-group col-sm-6'}
                />
            </div>

            <div className="row">
                <div className={'form-group col-md-6'} />
                <ViewText
                    label={'Lening uit te geven'}
                    value={MoneyPresenter(amountAvailable)}
                    className={'form-group col-sm-6'}
                />
            </div>
        </React.Fragment>
    );
};

export default ProjectFormEditLoan;
