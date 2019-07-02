import React from 'react';
import InputText from '../../../components/form/InputText';
import ViewText from '../../../components/form/ViewText';
import MoneyPresenter from '../../../helpers/MoneyPresenter';

const ProjectFormEditLoan = ({ amountOfLoanNeeded, amountDefinitive, amountOptioned, handleInputChange }) => {
    const amountAvailable = amountOfLoanNeeded - amountDefinitive;

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Lening</h4>
            <div className="row">
                <InputText
                    label={'Lening nodig'}
                    name={'amountOfLoanNeeded'}
                    value={amountOfLoanNeeded}
                    onChangeAction={handleInputChange}
                />
                <ViewText
                    label={'Lening opgehaald'}
                    value={MoneyPresenter(amountDefinitive)}
                    className={'form-group col-sm-6'}
                />
            </div>

            <div className="row">
                <div className={'form-group col-md-6'} />
                <ViewText
                    label={'Lening opgehaald in inschrijving'}
                    value={MoneyPresenter(amountOptioned)}
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
