import React from 'react';
import FinancialOverviewContactItem from './FinancialOverviewContactItem';

const FinancialOverviewContactList = props => {
    //todo WM: opschonen log
    // console.log('FinancialOverviewContactList');
    // console.log(props);

    return (
        <div>
            <div className="row header">
                <div className="col-sm-3">Contact</div>
                {/*<div className="col-sm-1 text-right">Aantal 1-1</div>*/}
                {/*<div className="col-sm-1 text-right">Waarde 1-1</div>*/}
                {/*<div className="col-sm-2 text-right">Tot.waarde 1-1</div>*/}
                {/*<div className="col-sm-1 text-right">Aantal 31-12</div>*/}
                {/*<div className="col-sm-1 text-right">Waarde 31-12</div>*/}
                {/*<div className="col-sm-2 text-right">Tot.waarde 31-12</div>*/}
                <div className="col-sm-1" />
            </div>
            {props.financialOverview &&
            props.financialOverview.financialOverviewContacts &&
            props.financialOverview.financialOverviewContacts.length > 0 ? (
                props.financialOverview.financialOverviewContacts.map(financialOverviewContact => {
                    return (
                        <FinancialOverviewContactItem
                            financialOverview={props.financialOverview}
                            financialOverviewContact={financialOverviewContact}
                        />
                    );
                })
            ) : (
                <div>Geen contacten bekend.</div>
            )}
        </div>
    );
};

export default FinancialOverviewContactList;
