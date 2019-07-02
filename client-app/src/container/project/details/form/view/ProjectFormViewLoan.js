import React from 'react';
import ViewText from '../../../../../components/form/ViewText';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';

const ProjectFormViewLoan = ({ amountOfLoanNeeded, amountDefinitive, amountOptioned }) => {
    const amountAvailable = amountOfLoanNeeded - amountDefinitive;

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Lening</h4>
            <div className="row">
                <ViewText label={'Lening nodig'} value={MoneyPresenter(amountOfLoanNeeded)} />
                <ViewText label={'Lening opgehaald'} value={MoneyPresenter(amountDefinitive)} />
            </div>

            <div className="row">
                <div className={'form-group col-md-6'} />
                <ViewText label={'Lening opgehaald in inschrijving'} value={MoneyPresenter(amountOptioned)} />
            </div>

            <div className="row">
                <div className={'form-group col-md-6'} />
                <ViewText label={'Lening uit te geven'} value={MoneyPresenter(amountAvailable)} />
            </div>
        </React.Fragment>
    );
};

export default ProjectFormViewLoan;
