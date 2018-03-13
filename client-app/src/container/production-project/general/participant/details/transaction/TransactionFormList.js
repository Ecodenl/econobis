import React from 'react';
import {connect} from 'react-redux';

import TransactionFormListItem from "./TransactionFormListItem";

const TransactionFormList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">Soort</div>
                <div className="col-sm-2">Transactie datum</div>
                <div className="col-sm-2">Bedrag</div>
                <div className="col-sm-2">IBAN</div>
                <div className="col-sm-2">Kenmerk</div>
                <div className="col-sm-1">Boekstuk</div>
                <div className="col-sm-1">Boek datum</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.participantTransactions.length > 0 ?
                    props.participantTransactions.map(participantTransaction => {
                        return <TransactionFormListItem
                            key={participantTransaction.id}
                            participantTransaction={participantTransaction}
                        />;
                    })
                    :
                    <div>Geen transacties bekend.</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        participantTransactions: state.participantProductionProjectDetails.participantTransactions,
    };
};

export default connect(mapStateToProps)(TransactionFormList);
