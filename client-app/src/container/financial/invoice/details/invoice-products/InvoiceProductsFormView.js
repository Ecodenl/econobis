import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';
moment.locale('nl');

const InvoiceProductsFormView = props => {
    const { period, productCode, productName, description, amount, amountInclVatInclReduction } = props.invoiceProduct;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div className="col-sm-1">{productCode ? productCode : ''}</div>
                <div className="col-sm-3">{productName ? productName : ''}</div>
                <div className="col-sm-3">{description ? description : ''}</div>
                <div className="col-sm-2">{amount ? amount : ''}</div>
                <div className="col-sm-2">
                    {amountInclVatInclReduction
                        ? '€ ' +
                          amountInclVatInclReduction.toLocaleString('nl', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          })
                        : '€ 0,00'}
                </div>
                <div className="col-sm-1">
                    {/*{props.showActionButtons &&*/}
                    {/*props.permissions.manageFinancial &&*/}
                    {/*props.invoiceDetails.statusId === 'to-send' ? (*/}
                    {/*    <a className="btn btn-success btn-sm" role="button" onClick={props.openEdit}>*/}
                    {/*        <Icon size={14} icon={pencil} />{' '}/}
                    {/*    </a>*/}
                    {/*) : (*/}
                    {/*    ''*/}
                    {/*)}*/}
                    {/*{props.showActionButtons &&*/}
                    {/*props.permissions.manageFinancial &&*/}
                    {/*props.invoiceDetails.statusId === 'to-send' ? (*/}
                    {/*    <a className="btn btn-success btn-sm" role="button" onClick={props.toggleDelete}>*/}
                    {/*        <Icon size={14} icon={trash} />{' '}/}
                    {/*    </a>*/}
                    {/*) : (*/}
                    {/*    ''*/}
                    {/*)}*/}
                </div>
                {period && <div className="col-sm-12">Periode {period}</div>}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(InvoiceProductsFormView);
