import React from 'react';
import MoneyPresenter from '../../../../../../customer-portal-app/src/helpers/MoneyPresenter';

const FinancialOverviewContactView = props => {
    //todo WM: opschonen log
    // console.log('FinancialOverviewContactView');
    // console.log(props);

    const {
        contact,
        // quantityStartValue,
        // quantityEndValue,
        // bookworthStartValue,
        // bookworthEndValue,
        // amountStartValue,
        // amountEndValue,
    } = props.financialOverviewContact;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div className="col-sm-3">{contact.fullName}</div>
                {/*<div className="col-sm-1 text-right">{quantityStartValue}</div>*/}
                {/*<div className="col-sm-1 text-right">{MoneyPresenter(bookworthStartValue)}</div>*/}
                {/*<div className="col-sm-2 text-right">{MoneyPresenter(amountStartValue)}</div>*/}
                {/*<div className="col-sm-1 text-right">{quantityEndValue}</div>*/}
                {/*<div className="col-sm-1 text-right">{MoneyPresenter(bookworthEndValue)}</div>*/}
                {/*<div className="col-sm-2 text-right">{MoneyPresenter(amountEndValue)}</div>*/}
                <div className="col-sm-1">
                    <a
                        role="button"
                        onClick={() =>
                            props.getFinancialOverviewPDF(
                                props.financialOverview.id,
                                props.financialOverviewContact.contactId
                            )
                        }
                    >
                        <span className="glyphicon glyphicon-list-alt mybtn-success" />{' '}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FinancialOverviewContactView;
