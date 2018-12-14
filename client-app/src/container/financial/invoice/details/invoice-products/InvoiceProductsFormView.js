import React from 'react';
import moment from "moment/moment";
import {connect} from "react-redux";
moment.locale('nl');

const InvoiceProductsFormView = props => {
    const {period, productCode, productName, description, amount, priceInclVatAndReduction } = props.invoiceProduct;

    return (
        <div className={`row border ${props.highlightLine}`}  onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div>
                <div className="col-sm-1">
                    { productCode ? productCode : '' }
                </div>
                <div className="col-sm-3">
                    { productName ? productName : '' }
                </div>
                <div className="col-sm-3">
                    {description ? description : ''}
                </div>
                <div className="col-sm-2">
                    { amount ? amount : ''}
                </div>
                <div className="col-sm-2">
                    { priceInclVatAndReduction ? '€' + priceInclVatAndReduction.toLocaleString('nl',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '€0,00'}
                </div>
                <div className="col-sm-1">
                    {(props.showActionButtons && props.permissions.manageFinancial && (props.invoiceDetails.statusId === 'to-send') ? <a role="button" onClick={props.openEdit}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                    {(props.showActionButtons && props.permissions.manageFinancial && (props.invoiceDetails.statusId === 'to-send') ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
                </div>
                {period &&
                    <div className="col-sm-12">
                        Periode { period }
                    </div>
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(InvoiceProductsFormView);
