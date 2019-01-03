import React from 'react';
import {connect} from 'react-redux';

import AdministrationLedgerFormListItem from "./AdministrationLedgerFormListItem";

const AdministrationLedgerFormList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-5">Code</div>
                <div className="col-sm-6">Naam</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.ledgers.length > 0 ?
                    props.ledgers.map(ledger => {
                        return <AdministrationLedgerFormListItem
                            key={ledger.id}
                            ledger={ledger}
                        />;
                    })
                    :
                    <div>Geen grootboeknummers bekend.</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ledgers: state.administrationDetails.ledgers,
    };
};

export default connect(mapStateToProps)(AdministrationLedgerFormList);
