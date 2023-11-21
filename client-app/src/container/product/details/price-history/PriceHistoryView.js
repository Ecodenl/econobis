import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';

const PriceHistoryView = props => {
    const { id, dateStart, priceNumberOfDecimals, price, vatPercentage, priceInclVat } = props.price;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div className="col-sm-3"> {dateStart ? moment(dateStart).format('L') : ''}</div>
            {props.productHasVariablePrice === 'variable' ? (
                <div className="col-sm-3">Variabel</div>
            ) : (
                <div className="col-sm-3">
                    {price
                        ? '€ ' +
                          price.toLocaleString('nl', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: priceNumberOfDecimals,
                          })
                        : ''}
                </div>
            )}
            <div className="col-sm-2">{vatPercentage !== null ? vatPercentage : 'Geen'}</div>
            {props.productHasVariablePrice === 'variable' ? (
                <div className="col-sm-2">Variabel</div>
            ) : (
                <div className="col-sm-2">
                    {priceInclVat
                        ? '€ ' +
                          priceInclVat.toLocaleString('nl', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: priceNumberOfDecimals,
                          })
                        : ''}
                </div>
            )}
            <div className="col-sm-2">{props.currentPrice && id === props.currentPrice.id ? 'Ja' : ''}</div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        currentPrice: state.productDetails.currentPrice,
        productHasVariablePrice: state.productDetails.hasVariablePrice,
    };
};

export default connect(mapStateToProps)(PriceHistoryView);
