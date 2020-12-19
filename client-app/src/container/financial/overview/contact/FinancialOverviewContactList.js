import React from 'react';
import FinancialOverviewContactItem from './FinancialOverviewContactItem';

const FinancialOverviewContactList = props => {
    return (
        <div>
            <div className="row header">
                <div className="col-sm-4">Contact</div>
                <div className="col-sm-2">Status</div>
                <div className="col-sm-2">Datum verzonden</div>
                <div className="col-sm-3">Gemaild aan</div>
                <div className="col-sm-1" />
            </div>
            {props.financialOverview &&
            props.financialOverview.financialOverviewContacts &&
            props.financialOverview.financialOverviewContacts.length > 0 ? (
                props.financialOverview.financialOverviewContacts.map(financialOverviewContact => {
                    return (
                        <FinancialOverviewContactItem
                            key={financialOverviewContact.id}
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
