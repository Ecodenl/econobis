import React from 'react';
import { connect } from 'react-redux';

import PriceHistoryItem from './PriceHistoryItem';

const PriceHistoryList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-3">Startdatum</div>
                <div className="col-sm-3">Prijs ex. BTW</div>
                <div className="col-sm-2">BTW percentage</div>
                <div className="col-sm-2">Prijs incl. BTW</div>
                <div className="col-sm-2">Actief</div>
            </div>
            {props.priceHistory.length > 0 ? (
                props.priceHistory.map(price => {
                    return <PriceHistoryItem key={price.id} price={price} />;
                })
            ) : (
                <div>Geen prijshistorie bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        priceHistory: state.productDetails.priceHistory,
    };
};
export default connect(mapStateToProps)(PriceHistoryList);
